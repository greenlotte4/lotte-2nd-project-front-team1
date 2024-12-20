import {
  Avatar,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { getUserListAll, getUserListbyuserid } from "../../../api/user/userAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserListButton({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [teamSpaces, setTeamSpaces] = useState([]);
  const [openTeams, setOpenTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.userSlice);
  const statusColorMap = {
    online: "green",
    dnd: "red",
    away: "yellow",
    logout: "gray",
  };
  useEffect(() => {
    // 팀 스페이스와 사용자 목록 불러오기
    const fetchUserList = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserListbyuserid(user.userid);
        console.log("data : ", data);
        if (Array.isArray(data)) {
          setTeamSpaces(data);
          // 초기 상태로 모든 팀을 닫아둡니다.
          const initialOpenState = {};
          data.forEach((teamSpace) => {
            initialOpenState[teamSpace.teamSpaceId] = true;
          });
          setOpenTeams(initialOpenState);
        } else {
          console.error("예상치 못한 데이터 형식:", data);
          setError("데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        console.error("유저 목록 불러오기 실패:", err);
        setError("유저 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, [user.userid]);

  const handleToggle = (teamSpaceId) => {
    setOpenTeams((prev) => ({
      ...prev,
      [teamSpaceId]: !prev[teamSpaceId],
    }));
  };

  const toMakeTeamSpace = () => {
    navigate("/app/setting");
  };

  return (
    <div className="UserListWrapper">
      {/* 유저 목록 */}
      {isOpen && (
        <div className="UserListDropdown">
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              border: "1px solid #ddd",
              borderRadius: 5,
              maxHeight: "400px",
              overflow: "auto",
              marginTop: 1,
              margin: "0 auto",
            }}
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">유저 목록</Typography>
                <Button
                  sx={{
                    minWidth: "auto",
                    padding: "0",
                  }}
                  onClick={onClose}
                >
                  <RemoveIcon />
                </Button>
              </ListSubheader>
            }
          >
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                로딩 중...
              </div>
            ) : error ? (
              <div
                style={{ textAlign: "center", padding: "20px", color: "red" }}
              >
                {error}
              </div>
            ) : teamSpaces.length > 0 ? (
              teamSpaces.map((teamSpace) => (
                <div key={teamSpace.teamSpaceId}>
                  <ListItemButton
                    onClick={() => handleToggle(teamSpace.teamSpaceId)}
                  >
                    <ListItemText primary={teamSpace.teamSpaceName} />
                    {openTeams[teamSpace.teamSpaceId] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={openTeams[teamSpace.teamSpaceId]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {teamSpace.users.map((user) => (
                        <ListItem
                          key={`${teamSpace.teamSpaceId}-${user.userId}`}
                          sx={{ pl: 4 }}
                        >
                          <ListItemAvatar>
                            <Avatar src={user.profile}>
                              {user.username.charAt(0)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                {user.username}
                                <span
                                  style={{
                                    display: "inline-block",
                                    marginLeft: "10px",
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor:
                                      statusColorMap[user.userStatus] || "gray",
                                    borderRadius: "50%",
                                  }}
                                />
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </div>
              ))
            ) : (
              <div
                className="noneTeam"
                style={{ textAlign: "center", padding: "20px" }}
              >
                <Button variant="contained" onClick={toMakeTeamSpace}>
                  팀스페이스 참여 / 생성하기
                </Button>
              </div>
            )}
          </List>
        </div>
      )}
    </div>
  );
}
