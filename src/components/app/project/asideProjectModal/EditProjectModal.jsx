import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { getUserListAll } from "../../../../api/user/userAPI";
import { postUpdateProject } from "../../../../api/project/project/projectAPI";

import "./custom.scss";


export default function EditProjectModal({ isOpen, onClose, project, onSave, userList: initialUserList }) {
  const [projectName, setProjectName] = useState(project.name || "");
  const [startDate, setStartDate] = useState(project.startDate || "");
  const [endDate, setEndDate] = useState(project.endDate || "");
  const [selectedUsers, setSelectedUsers] = useState(project.users || []);
  const [userList, setUserList] = useState(initialUserList || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!initialUserList?.length) {
      const fetchUserList = async () => {
        try {
          const data = await getUserListAll();
          setUserList(data || []);
        } catch (err) {
          console.error("유저 목록 불러오기 실패:", err);
        }
      };

      fetchUserList();
    }
  }, [initialUserList]);

  const toggleUserSelection = (user) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.some((selected) => selected.userId === user.userId)
        ? prevSelected.filter((selected) => selected.userId !== user.userId)
        : [...prevSelected, user]
    );
  };

  const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const isUserSelected = (userId) =>
    selectedUsers.some((user) => user.userId === userId);

  const handleSave = async () => {
    const updatedProject = {
      projectId: project.projectId, // 기존 프로젝트 ID 유지
      name: projectName,
      startDate,
      endDate,
      projectUser: selectedUsers.map((user) => user.userId), // 선택된 유저 ID 배열로 변환
    };
  
    try {
      await postUpdateProject(updatedProject); // API 호출
      onSave(updatedProject); // 부모 컴포넌트에 변경된 데이터 전달
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("프로젝트 수정 실패:", error);
      alert("프로젝트 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };
  

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          프로젝트 수정
        </Typography>
        <TextField
          fullWidth
          label="프로젝트 이름"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="시작 날짜"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="종료 날짜"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
          참여 유저 선택
        </Button>
        <List dense>
          {selectedUsers.map((user) => (
            <ListItem key={user.userId}>
              <ListItemAvatar>
                <Avatar>{user.username.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            저장
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            취소
          </Button>
        </Box>

        {isDialogOpen && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" mb={2}>
              사용자 선택
            </Typography>
            <List dense className="custom-list">
              {userList.map((user) => (
                <ListItem key={user.userId} disablePadding>
                  <Checkbox
                    edge="start"
                    checked={isUserSelected(user.userId)}
                    onChange={() => toggleUserSelection(user)}
                  />
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: generateRandomColor() }}>
                      {user.username.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.username} />
                </ListItem>
              ))}
            </List>
            <Button onClick={() => setIsDialogOpen(false)}>닫기</Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
