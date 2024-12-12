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

export default function EditProjectModal({ isOpen, onClose, project, onSave, userList: initialUserList }) {
  const [projectName, setProjectName] = useState(project.name || "");
  const [startDate, setStartDate] = useState(project.startDate || "");
  const [endDate, setEndDate] = useState(project.endDate || "");
  const [selectedUsers, setSelectedUsers] = useState(project.users || []);
  const [userList, setUserList] = useState(initialUserList || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch user list if not provided
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

  const isUserSelected = (userId) =>
    selectedUsers.some((user) => user.userId === userId);

  const handleSave = () => {
    const updatedProject = {
      ...project,
      name: projectName,
      startDate,
      endDate,
      users: selectedUsers,
    };
    onSave(updatedProject);
    onClose();
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

        {/* 사용자 선택 다이얼로그 */}
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
            <List dense>
              {userList.map((user) => (
                <ListItem key={user.userId} disablePadding>
                  <Checkbox
                    edge="start"
                    checked={isUserSelected(user.userId)}
                    onChange={() => toggleUserSelection(user)}
                  />
                  <ListItemAvatar>
                    <Avatar>{user.username.charAt(0)}</Avatar>
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
