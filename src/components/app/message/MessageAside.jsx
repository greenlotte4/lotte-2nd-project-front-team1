import {
  ChatBubbleOutlineOutlined,
  ExpandLess,
  ExpandMore,
  QuestionAnswer,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const MessageAside = ({ isVisible }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  // 새로운 채팅 모달
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const [createChatType, setCreateChatType] = useState("Channel");

  // 새로운 채팅 모달 열기
  const handleOpenNewChatModal = () => setIsNewChatModalOpen(true);
  // 새로운 채팅 모달 닫기
  const handleCloseNewChatModal = () => {
    //setNewTask({ name: "", group: "" });
    setIsNewChatModalOpen(false);
  };
  const handleCreateType = (event, newChatType) => {
    setCreateChatType(newChatType);
  };

  const [channelOpen, setChannelOpen] = useState(true);
  const [DMOpen, setDMOpen] = useState(true);

  const ChannelhandleClick = () => {
    setChannelOpen(!channelOpen);
  };

  const DMhandleClick = () => {
    setDMOpen(!DMOpen);
  };
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true); // 보이기 시작하면 애니메이션 추가
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500); // 애니메이션 종료 후 숨기기
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    isAnimating && (
      <div id="sidebar-container">
        <aside
          className={
            isVisible ? "aside-slide-in sidebar" : "aside-slide-out sidebar"
          }
        >
          <nav className="menu">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <Button className="newChat" onClick={handleOpenNewChatModal}>
                  새로운 채팅
                </Button>
              }
              className="chatList"
            >
              <ListItemButton onClick={ChannelhandleClick} className="chatType">
                <ListItemIcon>
                  <QuestionAnswer />
                </ListItemIcon>
                <ListItemText primary="대화방" />
                {channelOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={channelOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon className="iconGroup">
                      <AvatarGroup
                        max={3}
                        className="groupAvatarList"
                        spacing="small"
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          className="groupAvatar"
                        />
                        <Avatar
                          alt="Travis Howard"
                          src="/static/images/avatar/2.jpg"
                        />
                      </AvatarGroup>
                    </ListItemIcon>
                    <div className="chatRoom">
                      <ListItemText
                        primary="개발 팀"
                        className="chatRoomName"
                      />
                      <div className="chatDescription">
                        오늘 작업 내용입니다.가나다라마바사아자
                      </div>
                    </div>
                  </ListItemButton>

                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon className="iconGroup">
                      <AvatarGroup
                        max={3}
                        className="groupAvatarList"
                        spacing="15"
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          className="groupAvatar"
                        />
                        <Avatar
                          alt="Travis Howard"
                          src="/static/images/avatar/2.jpg"
                        />
                        <Avatar
                          alt="Cindy Baker"
                          src="/static/images/avatar/3.jpg"
                        />
                        <Avatar
                          alt="Agnes Walker"
                          src="/static/images/avatar/4.jpg"
                        />
                        <Avatar
                          alt="Trevor Henderson"
                          src="/static/images/avatar/5.jpg"
                        />
                      </AvatarGroup>
                    </ListItemIcon>
                    <div className="chatRoom">
                      <ListItemText
                        primary="디자인 팀"
                        className="chatRoomName"
                      />
                      <div className="chatDescription">
                        오늘 작업 내용입니다.가나다라마바사아자
                      </div>
                    </div>
                  </ListItemButton>
                </List>
              </Collapse>

              {/* DM구간 */}
              <ListItemButton onClick={DMhandleClick} className="chatType">
                <ListItemIcon>
                  <ChatBubbleOutlineOutlined />
                </ListItemIcon>
                <ListItemText primary="DM" />
                {DMOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={DMOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/* 반복 시작 */}
                  <ListItemButton sx={{ pl: 4 }} className="curruntChatRoom">
                    <ListItemIcon>
                      <Badge color="warning" variant="dot">
                        <Avatar>원</Avatar>
                      </Badge>
                    </ListItemIcon>
                    <div className="chatRoom">
                      <ListItemText primary="원기연" className="chatRoomName" />
                      <div className="chatDescription">
                        오늘 작업 내용입니다.가나다라마바사아자asdfjhajskdfh
                      </div>
                    </div>
                  </ListItemButton>
                  {/* 반복 끝 */}
                  {/* 반복 시작 */}
                  <ListItemButton sx={{ pl: 4 }} className="curruntChatRoom">
                    <ListItemIcon>
                      <Avatar>강</Avatar>
                    </ListItemIcon>
                    <div className="chatRoom">
                      <ListItemText primary="강중원" className="chatRoomName" />
                      <div className="chatDescription">
                        작업 빨리 끝내주세요.
                      </div>
                    </div>
                  </ListItemButton>
                  {/* 반복 끝 */}
                </List>
              </Collapse>
            </List>
          </nav>
        </aside>
        <Modal open={isNewChatModalOpen} onClose={handleCloseNewChatModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 500,
              bgcolor: "background.paper",
              boxShadow: 15,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: 1 }}
            >
              새로운 채팅 추가
            </Typography>
            <Divider sx={{ marginBottom: 1 }} />
            <ToggleButtonGroup
              value={createChatType}
              exclusive
              aria-label="text alignment"
              onChange={handleCreateType}
            >
              <ToggleButton
                value="Channel"
                aria-label="Channel"
                sx={{ width: 100 }}
              >
                대화방
              </ToggleButton>
              <ToggleButton value="DM" aria-label="DM" sx={{ width: 100 }}>
                DM
              </ToggleButton>
            </ToggleButtonGroup>

            {/* 조건부 렌더링 */}
            {createChatType === "Channel" && <NewChannelDIV />}
            {createChatType === "DM" && <NewDMDIV />}
          </Box>
        </Modal>
      </div>
    )
  );
};

export default MessageAside;

function NewChannelDIV() {
  const [makeChannelName, setMakeChannelName] = useState("");

  const [checkedMember, setCheckedMember] = useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checkedMember.indexOf(value);
    const newChecked = [...checkedMember];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedMember(newChecked);
  };

  return (
    <div>
      <TextField
        value={makeChannelName}
        id="standard-basic"
        label="대화방 이름"
        variant="standard"
        sx={{ margin: "10px 0", width: "100%" }}
        onChange={(e) => setMakeChannelName(e.target.value)}
      />
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          border: "1px solid #ddd",
          borderRadius: 5,
          height: "300px",
          overflow: "scroll",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checkedMember.includes(value)}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`멤버 ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

function NewDMDIV() {
  return (
    <div>
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          border: "1px solid #ddd",
          borderRadius: 5,
          height: "350px",
          overflow: "scroll",
          marginTop: 1,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary={`강중원`} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary={`강유정`} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary={`박수정`} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary={`박준우`} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
