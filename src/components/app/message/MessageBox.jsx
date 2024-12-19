import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Avatar,
  AvatarGroup,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ToggleButtonGroup,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";
import UploadIcon from "@mui/icons-material/Upload";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import {
  getChatList,
  getThisRoom,
  postMessageImg,
  setChatText,
} from "../../../api/message/messageAPI";
import { useSelector } from "react-redux";
import { connectStomp, publish, subscribe } from "../../../WebSocket/STOMP";
import { SERVER_HOST } from "../../../api/URI";
import MarkdownIt from "markdown-it";

export default function MessageBox({ roomId }) {
  const [newMessage, setNewMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // 선택한 메시지 인덱스
  const [EmojiStatus, setEmojiStatus] = useState(false);

  // const [imageUrl, setImageUrl] = useState(null);

  const [chatList, setChatList] = useState([]);

  const [chatRoom, setChatRoom] = useState();

  const user = useSelector((state) => state.userSlice);

  const mdParser = new MarkdownIt();

  const textareaRef = useRef(null);

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();

      // 한국 시간으로 변환 (UTC +9)
      const koreaTime = new Date(
        now.getTime() + 9 * 60 * 60 * 1000 // UTC 시간에 +9시간
      );

      const chatText = {
        senderId: user.userid,
        context: newMessage,
        chatId: roomId,
        sendTime: koreaTime,
      };
      setChatText(chatText);

      publish("/pub/chat/send", chatText);

      setNewMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // 초기 높이로 리셋
      }
    }
  };

  // 메시지 전송 핸들러
  const handleSendImgMessage = (imageUrl) => {
    let messageContent = `![image](https://hubflow.store${imageUrl})`;
    const now = new Date();

    // 한국 시간으로 변환 (UTC +9)
    const koreaTime = new Date(
      now.getTime() + 9 * 60 * 60 * 1000 // UTC 시간에 +9시간
    );

    const chatText = {
      senderId: user.userid,
      context: messageContent,
      chatId: roomId,
      sendTime: koreaTime,
    };
    setChatText(chatText);

    publish("/pub/chat/send", chatText);

    setNewMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 초기 높이로 리셋
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

  // 텍스트 입력 핸들러
  const inputHandle = (event) => {
    const value = event.target.value;
    setNewMessage(value);

    // 자동 크기 조정
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞게 높이 설정
    }
  };

  // 키다운 이벤트 핸들러
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 기본 Enter 동작 막기
      handleSendMessage();
    }
  };

  // 이모지 설정
  const emojiOpen = () => {
    setEmojiStatus(!EmojiStatus);
  };

  const handleFormat = (formatType) => {
    const textarea = document.querySelector(".chattingInput");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 기존 텍스트에서 분리
    const beforeText = newMessage.slice(0, start);
    const selectedText = newMessage.slice(start, end);
    const afterText = newMessage.slice(end);

    let formattedText = selectedText;

    // 포맷 적용
    if (formatType === "bold") {
      formattedText = `**${selectedText}**`;
    } else if (formatType === "italic") {
      formattedText = `*${selectedText}*`;
    } else if (formatType === "link") {
      formattedText = `[${selectedText}](${selectedText})`;
    } else if (formatType === "code") {
      formattedText = `\`${selectedText}\``;
    }

    // 새 메시지 업데이트
    const updatedMessage = `${beforeText}${formattedText}${afterText}`;
    setNewMessage(updatedMessage);

    // 커서 위치 업데이트
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + 2; // 포맷 문법 앞
      textarea.selectionEnd = end + 2; // 포맷 문법 뒤
    }, 0);
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

  //  소켓 스페이스

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      const dateKey = new Date(message.sendTime).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(message);
      return acc;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(chatList);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // 서버로 이미지 업로드
      const formData = new FormData();
      formData.append("file", file);

      const response = await postMessageImg(formData);
      const imageUrl = response.data; // 서버에서 반환된 URL

      console.log("imageUrl:", imageUrl);

      // 메시지 전송
      handleSendImgMessage(imageUrl); // 이미지 URL과 함께 전송
    } catch (error) {
      console.error("이미지 업로드 오류:", error.response || error);
    }
  };

  return (
    <div className="messageWrapper">
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
                              {!room.user.profile &&
                                room.user.username.charAt(0)}
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
          {Object.keys(groupedMessages).map((date) => (
            <div key={date} className="chatBlockByDay">
              <div className="message_date">{date}</div>
              <div className="message-container">
                {groupedMessages[date].map((chat, index) => (
                  <div
                    key={chat.id}
                    className={`message_box ${
                      chat.senderId.userId === user.userid
                        ? "myMessage"
                        : "otherMessage"
                    }`}
                  >
                    <Avatar
                      src={
                        chat.senderId.profile ||
                        "/static/images/default-avatar.jpg"
                      }
                      alt={chat.senderId.username}
                      className="chatAvatar"
                    />
                    <div className="chatContent">
                      <div className="message_sender">
                        {chat.senderId.userId === user.userid
                          ? `${user.username} (나)`
                          : chat.senderId.username}
                      </div>
                      <div className="message_time">
                        {new Date(chat.sendTime).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div
                        className="text_box"
                        dangerouslySetInnerHTML={{
                          __html: mdParser.render(
                            chat.context.replace(/\n/g, "  \n")
                          ),
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="imageUpload"></label>
                <ToggleButtonGroup aria-label="text formatting">
                  <IconButton value="bold" onClick={() => handleFormat("bold")}>
                    <FormatBoldIcon />
                  </IconButton>
                  <IconButton
                    value="italic"
                    onClick={() => handleFormat("italic")}
                  >
                    <FormatItalicIcon />
                  </IconButton>
                  <IconButton value="link" onClick={() => handleFormat("link")}>
                    <LinkIcon />
                  </IconButton>
                  <IconButton value="code" onClick={() => handleFormat("code")}>
                    <CodeIcon />
                  </IconButton>
                  <label htmlFor="imageUpload">
                    <IconButton component="span" color="primary">
                      <UploadIcon /> {/* 업로드 아이콘 */}
                    </IconButton>
                  </label>
                </ToggleButtonGroup>
              </div>
              <textarea
                ref={textareaRef}
                placeholder="메시지를 입력하세요..."
                value={newMessage}
                onChange={inputHandle}
                onKeyDown={handleKeyDown}
                className="messageInput chattingInput"
                rows={1} // 기본 줄 수
                style={{
                  overflow: "hidden",
                  resize: "none", // 크기 조정 비활성화
                  width: "100%",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
              />
              <div className="subInput_tools">
                <IconButton
                  aria-label="delete"
                  color="black"
                  onClick={emojiOpen}
                >
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
      <div className="R_Aside">
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
                  <div className="ChannelUsersWrapper" key={index}>
                    <h2 className="ChannelUserTitle">{value.chat.roomName}</h2>
                    {chatRoom
                      .filter((room) => room.chat.chatId === value.chat.chatId) // 동일한 chatId의 유저만 반복
                      .map((room, i) => (
                        <div key={i} className="ChannelUsers">
                          <Avatar
                            sx={{
                              bgcolor: room.user.profile
                                ? undefined
                                : user.color,
                            }}
                            src={room.user.profile || undefined} // 프로필 이미지
                            alt={room.user.username}
                            className="ChannelUsersAvatar"
                          >
                            {!room.user.profile && room.user.username.charAt(0)}
                          </Avatar>
                          <div className="ChannelUsersName">
                            {room.user.username}
                          </div>
                        </div>
                      ))}
                  </div>
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
                    <h2 className="chatUserProfileAvatar" key={index}>
                      <Avatar
                        sx={{
                          bgcolor: otherUser.profile ? undefined : user.color,
                          width: "200px",
                          height: "200px",
                          margin: "30px auto",
                          fontSize: "100px",
                        }}
                        src={otherUser.profile || undefined} // 프로필 이미지
                        alt={otherUser.username}
                      >
                        {!otherUser.profile && otherUser.username.charAt(0)}
                      </Avatar>
                      <div className="chatUserProfileName">
                        {otherUser.username}
                      </div>
                      <Divider sx={{ marginBottom: 1 }} />
                      <div className="chatUserStatusMessage">
                        <p>상태메세지</p>
                        {otherUser.statusMessage}
                      </div>
                      <Divider sx={{ marginBottom: 1 }} />
                      <div className="chatUserContact">
                        <span className="hpAndEmail">
                          <LocalPhoneIcon />
                          전화번호
                        </span>
                        <p>{otherUser.hp}</p>
                        <br />
                        <span className="hpAndEmail">
                          <EmailOutlinedIcon />
                          이메일
                        </span>
                        <p>{otherUser.email}</p>
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
    </div>
  );
}
