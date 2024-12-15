import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getUserListAll } from "../../../../api/user/userAPI";
import { postCreateProject } from "../../../../api/project/project/projectAPI";

function AddProjectForm({ onClose, onAddProject }) {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useSelector((state) => state.userSlice);
  const loginId = useSelector((state) => state.userSlice.userid);

  useEffect(() => {
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

  const handleSubmit = async () => {
    const selectedUserIds = selectedUsers.map((user) => user.userId);

    const newProject = {
      name: projectName,
      startDate,
      endDate,
      projectUser: selectedUserIds, 
    };

    try {
      console.log("Submitting userId:", loginId);
      await postCreateProject(newProject, loginId); 
      onAddProject(newProject); 
      onClose(); 
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
    }
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.some((selected) => selected.userId === user.userId)
        ? prevSelected.filter((selected) => selected.userId !== user.userId)
        : [...prevSelected, user]
    );
  };

  const isUserSelected = (userId) =>
    selectedUsers.some((user) => user.userId === userId);

  return (
    <div className="add-project-form">
      <div>
        <label>프로젝트 이름</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <label>팀원</label>
        <input
          type="text"
          value={selectedUsers.map((user) => user.username).join(", ")} // 선택된 사용자 이름 표시
          readOnly
        />
        <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
          사용자 추가
        </Button>
      </div>
      <div>
        <label>프로젝트 기간</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>저장</button>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>사용자 선택</DialogTitle>
        <List
          dense
          sx={{
            width: "400px",
            maxWidth: 360,
            bgcolor: "background.paper",
            border: "1px solid #ddd",
            borderRadius: 5,
            height: "350px",
            overflow: "scroll",
            margin: "10px",
          }}
        >
          {userList.map((value, index) => {
            if (value.userId === user.userid) {
              return null; 
            }
            const labelId = `checkbox-list-secondary-label-${value.userId}`;
            return (
              <ListItem key={index} disablePadding>
                <Checkbox
                  edge="start"
                  checked={isUserSelected(value.userId)}
                  onChange={() => toggleUserSelection(value)}
                  inputProps={{ "aria-labelledby": labelId }}
                />
                <ListItemAvatar>
                  <Avatar>{value.username.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.username}`} />
              </ListItem>
            );
          })}
        </List>
        <Button onClick={() => setIsDialogOpen(false)}>닫기</Button>
      </Dialog>
    </div>
  );
}

export default AddProjectForm;
