import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { getUserListAll } from "../../../api/user/userAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserListButton({ isOpen, onClose }) {
  const navigate = useNavigate();
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

  const user = useSelector((state) => state.userSlice);

  const toMakeTeamSpace = () => {
    navigate("/app/setting");
  };

  return (
    <div className="UserListWrapper">
      {/* 유저 목록 */}
      {isOpen && (
        <div className="UserListDropdown">
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
              margin: "0 auto",
            }}
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                유저목록
                <Button
                  sx={{
                    width: "10px",
                  }}
                  onClick={onClose}
                >
                  <RemoveIcon />
                </Button>
              </ListSubheader>
            }
          >
            {userList.length > 0 ? (
              userList.map((value, index) => {
                if (value.userId === user.userid) {
                  return null; // 현재 유저는 건너뜀
                }

                const labelId = `checkbox-list-secondary-label-${value}`;

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar src={value.profile}>
                          {value.username.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={`${value.username}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })
            ) : (
              <div className="noneTeam">
                <Button onClick={toMakeTeamSpace}>
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
