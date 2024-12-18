import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import {
  getChatList,
  getThisRoom,
  setChatText,
} from "../../../api/message/messageAPI";
import { useSelector } from "react-redux";
// import { profileUrl } from "../../../api/user/userAPI";
import { connectStomp, publish, subscribe } from "../../../WebSocket/STOMP";
import { SERVER_HOST } from "../../../api/URI";

export default function MessageBox({ roomId }) {
  const [newMessage, setNewMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // 선택한 메시지 인덱스
  const [EmojiStatus, setEmojiStatus] = useState(false);

  // const [imageUrl, setImageUrl] = useState(null);

  const [inputStatus, setinputStatus] = useState(() => ["bold", "italic"]);

  const [chatList, setChatList] = useState([]);

  const [chatRoom, setChatRoom] = useState();

  const user = useSelector((state) => state.userSlice);

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();

      const chatText = {
        senderId: user.userid,
        context: newMessage,
        chatId: roomId,
        sendTime: now,
      };
      setChatText(chatText);

      publish("/pub/chat/send", chatText);

      setNewMessage("");
    }
  };

  const emojiSelect = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  // 메시지 삭제 함수
  const deleteMessageHandle = () => {
    if (selectedIndex !== null) {
      const updatedChatList = chatList.filter((_, i) => i !== selectedIndex);
      setChatList(updatedChatList);
    }
    handleClose();
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
    event.preventDefault();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const keyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
      event.preventDefault();
    }
  };

  const inputHandle = (event) => {
    setNewMessage(event.target.value);
  };

  // 이모지 설정
  const emojiOpen = () => {
    setEmojiStatus(!EmojiStatus);
  };

  const handleFormat = (event, newFormats) => {
    setinputStatus(newFormats);
  };

  const subscriptionRef = useRef(null); // 구독을 저장할 Ref

  //useEffect
  useEffect(() => {
    // getImageUrl();
    if (roomId) {
      fetchChatList(roomId);
      fetchChatRoom(roomId);

      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null; // 구독 초기화
      }

      connectStomp(SERVER_HOST + "/socket", () => {
        console.log("연결 성공");

        // 구독 설정
        subscriptionRef.current = subscribe(
          `/sub/room/${roomId}`,
          (message) => {
            console.log("요청받음!");
            setChatList((prev) => [...prev, message]);
          }
        );
      });
    }

    return () => {
      // 컴포넌트 언마운트 시 구독 해제
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [roomId]);

  const fetchChatList = async (chatId) => {
    try {
      const data = await getChatList(chatId);

      setChatList(data);
    } catch (err) {
      console.error("채팅 목록 불러오기 실패:", err);
    }
  };

  const fetchChatRoom = async (chatId) => {
    try {
      const data = await getThisRoom(chatId);

      setChatRoom(data);
    } catch (err) {
      console.error("채팅 이름 불러오기 실패:", err);
    }
  };

  // const getImageUrl = async () => {
  //   const url = await profileUrl(); // 이미지 URL을 비동기적으로 가져옴
  //   console.log("받은 이미지 URL: ", url);
  //   setImageUrl(url); // 받아온 URL을 상태에 저장
  // };

  //  소켓 스페이스

  return (
    <div className="messageDiv">
      <div className="messageInfo">
        {chatRoom && chatRoom.length > 0 ? (
          chatRoom
            .filter(
              (value, index, self) =>
                self.findIndex((v) => v.chat.chatId === value.chat.chatId) ===
                index
            ) // 고유한 chatId만 남김
            .map((value, index) => {
              if (value.chat.dtype === "CHANNEL") {
                return (
                  <h2 className="chatRoomName" key={index}>
                    <AvatarGroup>
                      {chatRoom
                        .filter(
                          (room) => room.chat.chatId === value.chat.chatId
                        ) // 동일한 chatId의 유저만 반복
                        .map((room, i) => (
                          <Avatar
                            key={i}
                            sx={{
                              bgcolor: room.user.profile
                                ? undefined
                                : user.color,
                            }}
                            src={room.user.profile || undefined} // 프로필 이미지
                            alt={room.user.username}
                          >
                            {!room.user.profile && room.user.username.charAt(0)}
                          </Avatar>
                        ))}
                    </AvatarGroup>
                    <div className="chatRoomNameText">
                      {value.chat.roomName}
                    </div>
                  </h2>
                );
              } else if (value.chat.dtype === "DM") {
                // 다른 유저를 찾아 렌더링
                const otherUser = chatRoom.find(
                  (room) =>
                    room.chat.chatId === value.chat.chatId &&
                    room.user.userId !== user.userid
                )?.user;

                return (
                  otherUser && (
                    <h2 className="chatRoomName" key={index}>
                      <Avatar
                        sx={{
                          bgcolor: otherUser.profile ? undefined : user.color,
                        }}
                        src={otherUser.profile || undefined} // 프로필 이미지
                        alt={otherUser.username}
                      >
                        {!otherUser.profile && otherUser.username.charAt(0)}
                      </Avatar>
                      <div className="chatRoomNameText">
                        {otherUser.username}
                      </div>
                    </h2>
                  )
                );
              }
              return null; // 다른 경우를 명시적으로 처리
            })
        ) : (
          <div>채팅방이 없습니다.</div>
        )}
      </div>

      <div className="chatBox">
        <div className="chatBlockByDay">
          <div className="message_date">2024.12.12.(목)</div>

          {/* chatList가 null 또는 빈 배열인 경우 처리 */}
          {!chatList || chatList.length === 0 ? (
            <div className="empty-message">메시지가 없습니다.</div>
          ) : (
            <div className="message-container">
              {chatList.map((chat, index) => (
                <div
                  key={chat.id}
                  className={`message_box ${chat.senderId.userId === user.userid ? "myMessage" : "otherMessage"}`}
                  onContextMenu={(event) => handleClick(event, index)}
                >
                  <Avatar
                    src={
                      chat.senderId.profile ||
                      "/static/images/default-avatar.jpg"
                    }
                    alt={chat.senderId.username}
                    className="chatAvatar"
                  ></Avatar>

                  <div className="chatContent">
                    <div className="message_sender">
                      {chat.senderId.userId === user.userid
                        ? user.username + " (나)"
                        : chat.senderId.username}
                    </div>
                    <div className="message_time">
                      {new Date(chat.sendTime).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text_box">
                      <p>{chat.context}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={deleteMessageHandle}>삭제</MenuItem>
      </Menu>

      <div className="message_input-bar">
        <div className="input_container">
          <div className="input_box">
            <div className="input_tools">
              <ToggleButtonGroup
                aria-label="text formatting"
                value={inputStatus}
                onChange={handleFormat}
              >
                <ToggleButton
                  value="bold"
                  aria-label="bold"
                  style={{ border: "none" }}
                >
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton
                  value="italic"
                  aria-label="italic"
                  style={{ border: "none" }}
                >
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton
                  value="underlined"
                  aria-label="underlined"
                  style={{ border: "none" }}
                >
                  <FormatUnderlinedIcon />
                </ToggleButton>
                <ToggleButton
                  value="color"
                  aria-label="color"
                  style={{ border: "none" }}
                  disabled
                >
                  <FormatColorFillIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup exclusive aria-label="text alignment">
                <ToggleButton
                  value="left"
                  aria-label="left aligned"
                  style={{ border: "none" }}
                >
                  <FormatAlignLeftIcon />
                </ToggleButton>
                <ToggleButton
                  value="center"
                  aria-label="centered"
                  style={{ border: "none" }}
                >
                  <FormatAlignCenterIcon />
                </ToggleButton>
                <ToggleButton
                  value="right"
                  aria-label="right aligned"
                  style={{ border: "none" }}
                >
                  <FormatAlignRightIcon />
                </ToggleButton>
                <ToggleButton
                  value="justify"
                  aria-label="justified"
                  disabled
                  style={{ border: "none" }}
                >
                  <FormatAlignJustifyIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <input
              type="text"
              placeholder="메시지를 입력해주세요."
              value={newMessage}
              onChange={inputHandle}
              onKeyDown={keyDown}
              className="chattingInput"
            />
            <div className="subInput_tools">
              <IconButton aria-label="delete" color="black" onClick={emojiOpen}>
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            className="sendButton"
            disabled={!roomId}
          >
            전송
          </button>
          <EmojiPicker
            rows={4}
            perRow={8}
            emojiSize={32}
            style={{
              position: "absolute",
              bottom: "120px",
              left: "0px",
            }}
            open={EmojiStatus}
            onEmojiClick={emojiSelect}
          />
        </div>
      </div>
    </div>
  );
}
