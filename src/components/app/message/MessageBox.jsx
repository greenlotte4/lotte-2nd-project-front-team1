import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Avatar,
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
import { getChatList, setChatText } from "../../../api/message/messageAPI";
import { useSelector } from "react-redux";

export default function MessageBox(roomId) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // 선택한 메시지 인덱스
  const [EmojiStatus, setEmojiStatus] = useState(false);

  const [inputStatus, setinputStatus] = useState(() => ["bold", "italic"]);

  const user = useSelector((state) => state.userSlice);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      setChatList([
        ...chatList,
        { context: newMessage, senderId: user.userid, sendTime: now },
      ]);

      const chatText = {
        senderId: user.userid,
        context: newMessage,
        chatId: roomId.roomId,
      };
      setChatText(chatText);

      setNewMessage("");
    }
  };

  const emojiSelect = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  // 메시지 삭제 함수
  const deleteMessageHandle = () => {
    if (selectedIndex !== null) {
      const updatedMessages = messages.filter((_, i) => i !== selectedIndex);
      setMessages(updatedMessages);
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

  const [chatList, setChatList] = useState(null);

  //useEffect
  useEffect(() => {
    if (roomId) {
      fetchChatRoomList(roomId.roomId);
    }
  }, [roomId]);

  const fetchChatRoomList = async (chatId) => {
    try {
      const data = await getChatList(chatId);

      setChatList(data);
    } catch (err) {
      console.error("채팅 목록 불러오기 실패:", err);
    }
  };

  return (
    <div className="messageDiv">
      <div className="messageInfo">
        <h2 className="chatRoomName">
          <Avatar>강</Avatar>
          <div className="chatRoomNameText">강중원</div>
        </h2>
        <span></span>
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
                    alt={
                      chat.senderId.userId === user.userid
                        ? user.username
                        : chat.senderId.username
                    }
                    src={user.avatar || user.username}
                    className="chatAvatar"
                  />
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
        {/* {messages.map((message, index) => (
          <div key={index} className="chatBlockByDay">
            {message.date && <div className="message_date">{message.date}</div>}
            <div
              className="message_box"
              onContextMenu={(event) => handleClick(event, index)}
            >
              <Avatar
                alt="사용자 아이콘"
                src="/images/user_Icon.png"
                className="chatProfile"
              />
              <div className="chatContent">
                <div className="message_sender">사용자 (나)</div>
                <div className="message_time">{message.time}</div>
                <div className="text_box">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))} */}
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
