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
  Menu,
  MenuItem,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserListAll } from "../../../api/user/userAPI";
import {
  getMyChatRoom,
  makeNewChannel,
  makeNewDM,
} from "../../../api/message/messageAPI";
import { useSelector } from "react-redux";

const MessageAside = ({ isVisible }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  // 새로운 채팅 모달
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const [createChatType, setCreateChatType] = useState("Channel");

  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(null); // 선택한 채팅 인덱스

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  //채팅 나가기 함수
  const deleteMessageHandle = () => {
    handleClose();
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
    event.preventDefault();
  };

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

  const user = useSelector((state) => state.userSlice);

  //채팅 방 가져오기
  const [chatRoomList, setChatRoomList] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true); // 보이기 시작하면 애니메이션 추가
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500); // 애니메이션 종료 후 숨기기
      return () => clearTimeout(timer);
    }
    const fetchChatRoomList = async () => {
      try {
        const data = await getMyChatRoom(user.userid);
        console.log(user.userid);
        setChatRoomList(data);
      } catch (err) {
        console.error("채팅 목록 불러오기 실패 : ", err);
      }
    };
    fetchChatRoomList();
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
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onContextMenu={(event) => handleClick(event)}
                  >
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

                  <ListItemButton
                    sx={{ pl: 4 }}
                    onContextMenu={(event) => handleClick(event)}
                  >
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
                  {chatRoomList.map((value, index) => {
                    if (
                      value.chat.dtype === "CHANNEL" ||
                      value.user.userId === user.userid
                    ) {
                      return null;
                    }
                    return (
                      <ListItemButton
                        key={index}
                        sx={{ pl: 4 }}
                        className="curruntChatRoom"
                        onContextMenu={(event) =>
                          handleClick(event, value.userId)
                        }
                      >
                        <ListItemIcon>
                          <Badge color="warning" variant="dot">
                            <Avatar>{value.user.username.charAt(0)}</Avatar>
                          </Badge>
                        </ListItemIcon>
                        <div className="chatRoom">
                          <ListItemText
                            primary={value.user.username}
                            className="chatRoomName"
                          />
                          <div className="chatDescription">가나다</div>
                        </div>
                      </ListItemButton>
                    );
                  })}
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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={deleteMessageHandle}>채팅방 나가기</MenuItem>
        </Menu>
      </div>
    )
  );
};

export default MessageAside;

function NewChannelDIV() {
  const user = useSelector((state) => state.userSlice);
  const initState = {
    roomName: "",
    dtype: "channel",
    members: [],
  };

  const [channel, setChannel] = useState({ ...initState });

  const [userList, setUserList] = useState([]);
  const [checkedMember, setCheckedMember] = useState([]);

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

  const changeHandler = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    const updatedChannel = { ...channel, [name]: updatedValue };
    setChannel(updatedChannel);
  };

  useEffect(() => {
    //유저목록 불러오기
    const fetchUserList = async () => {
      try {
        const data = await getUserListAll();
        setUserList(data);
      } catch (err) {
        console.error("유저 목록 불러오기 실패 : ", err);
      }
    };
    fetchUserList();
  }, []);

  const submitChannel = async (e) => {
    e.preventDefault();

    // user.userid를 manager에 할당
    const updatedChannel = {
      ...channel,
      members: [...checkedMember.map((member) => member.userId), user.userid],
    };

    try {
      const savedChannel = await makeNewChannel(updatedChannel);
      console.log(savedChannel);

      if (savedChannel) {
        alert("채널이 추가되었습니다.👍");
      } else {
        alert("채널 추가 실패...😭");
      }
    } catch (error) {
      console.error("채널 추가 중 오류 발생:", error);
      alert("채널 추가 중 오류 발생...😭");
    }
  };

  return (
    <div>
      <TextField
        value={channel.name}
        id="standard-basic"
        label="대화방 이름"
        name="roomName"
        variant="standard"
        sx={{ margin: "10px 0", width: "100%" }}
        onChange={changeHandler}
      />
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          border: "1px solid #ddd",
          borderRadius: 5,
          height: "260px",
          overflow: "scroll",
          marginBottom: "10px",
        }}
      >
        {userList.map((value, index) => {
          if (value.userId === user.userid) {
            return null; // 현재 유저는 건너뜀
          }

          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={index}
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
                  <Avatar>{value.username.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.username}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button
        sx={{ width: "100%", backgroundColor: "#00c473", color: "white" }}
        onClick={submitChannel}
      >
        채널 추가
      </Button>
    </div>
  );
}

function NewDMDIV() {
  const user = useSelector((state) => state.userSlice);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    //유저목록 불러오기
    const fetchUserList = async () => {
      try {
        const data = await getUserListAll();
        setUserList(data);
      } catch (err) {
        console.error("유저 목록 불러오기 실패 : ", err);
      }
    };

    fetchUserList();
  }, []);

  const initState = {
    roomName: "DM",
    dtype: "DM",
    members: [],
  };

  const [DM, setDM] = useState({ ...initState });

  const submitDM = async (targetUserId) => {
    // user.userid를 manager에 할당
    const updatedDM = {
      ...DM,
      members: [user.userid, targetUserId],
    };

    try {
      const savedDM = await makeNewDM(updatedDM);
      console.log(savedDM);
      if (savedDM) {
        alert("DM이 추가되었습니다.👍");
      } else {
        alert("DM 추가 실패...😭");
      }
    } catch (error) {
      console.error("DM 추가 중 오류 발생:", error);
      alert("DM 추가 중 오류 발생...😭");
    }
  };

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
        {userList.map((value, index) => {
          if (value.userId === user.userid) {
            return null; // 현재 유저는 건너뜀
          }
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => submitDM(value.userId)}>
                <ListItemAvatar>
                  <Avatar>{value.username.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.username}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
