import React, { useEffect, useRef, useState } from "react";
import { Gantt, ViewMode } from "@wamra/gantt-task-react";
import "@wamra/gantt-task-react/dist/style.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { postSelectProject, fetchProjectParticipants } from "../../../api/project/project/projectAPI"; // API 호출 함수
import { useParams } from "react-router-dom";
import { connectStomp, subscribe, publish } from "../../../WebSocket/STOMP"; 
import { SERVER_HOST } from "../../../api/URI";

const ProjectTimelinePage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // 참여자 목록
  const subscriptionRef = useRef(null);

  // WebSocket 연결 핸들러
  const onConnected = () => {
    console.log("WebSocket 연결 성공");

    // 업데이트 이벤트 구독
    if (!subscriptionRef.current) {
      subscriptionRef.current = subscribe("/sub/tasks/update", (updatedTask) => {
        console.log("Received Task Update:", updatedTask);

        // WebSocket에서 받은 데이터를 상태에 반영
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === `${updatedTask.taskId}`
              ? {
                  ...task,
                  name: updatedTask.name,
                  start: new Date(updatedTask.startDate),
                  end: new Date(updatedTask.endDate),
                  progress: updatedTask.priority || 0,
                  assignees: updatedTask.assignee ? [updatedTask.assignee] : [],
                }
              : task
          )
        );
      });
    }
  };

  // WebSocket 및 프로젝트 데이터 초기화
  useEffect(() => {
    const initializeWebSocket = () => {
      connectStomp(SERVER_HOST + "/socket", onConnected);
    };

    if (projectId) {
      fetchProjectData(projectId);
      fetchProjectParticipantsData(projectId);
      initializeWebSocket();
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe(); // 구독 해제
        subscriptionRef.current = null;
      }
    };
  }, [projectId]);

  // 프로젝트 데이터 로드 함수
  const fetchProjectData = async (id) => {
    try {
      const response = await postSelectProject(id);
      const { project } = response;

      const projectTasks = project.projectItems.flatMap((item) =>
        item.tasks.map((task) => ({
          id: `${task.taskId}`,
          name: task.name,
          start: new Date(task.startDate),
          end: new Date(task.endDate),
          progress: task.priority || 0,
          assignees: task.assignee, 
          type: "task",
        }))
      );

      setTasks(projectTasks); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch project data:", error.message);
    }
  };

  // 프로젝트 참여자 데이터 로드
  const fetchProjectParticipantsData = async (projectId) => {
    try {
      const participants = await fetchProjectParticipants(projectId);
      console.log("Participants Data:", participants); // 구조 확인용 로그
      setAllUsers(participants); // 참여자 설정
    } catch (error) {
      console.error("Failed to fetch project participants:", error.message);
    }
  };

  // 대화 상자 열기 및 닫기
  const openDialog = (task) => {
    setSelectedTask({ ...task });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedTask(null);
  };

  // 작업 업데이트
  const handleTaskUpdate = () => {
    if (!selectedTask) return;
    const updatedTask = {
      taskId: selectedTask.id,
      name: selectedTask.name,
      startDate: selectedTask.start.toISOString().split("T")[0],
      endDate: selectedTask.end.toISOString().split("T")[0],
      priority: selectedTask.progress, // progress를 priority로 매핑
      assignee: selectedTask.assignees.length > 0 ? selectedTask.assignees[0] : null,
    };
    console.log("Publishing Task Update:", updatedTask);
    publish("/pub/tasks/update", updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTask.id ? { ...selectedTask } : task
      )
    );

    closeDialog();
  };

  // 작업 삭제
  const handleTaskDelete = () => {
    if (!selectedTask) return;
    const deletePayload = { taskId: selectedTask.id };
    console.log("Publishing Task Delete:", deletePayload);
    publish("/pub/tasks/delete", deletePayload);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
    closeDialog();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Gantt
        key={tasks.length}
        tasks={tasks}
        viewMode={ViewMode.Month}
        onDoubleClick={(task) => openDialog(task)}
        onProgressChange={(task) => {
          const updatedTask = {
            ...task,
            priority: Math.round(task.progress),
          };

          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
          );

          publish("/pub/tasks/update", {
            taskId: task.id,
            priority: updatedTask.priority,
          });
        }}
      />
      {selectedTask && (
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Name"
              fullWidth
              margin="normal"
              value={selectedTask.name}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, name: e.target.value })
              }
            />
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={selectedTask.start.toISOString().split("T")[0]}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  start: new Date(e.target.value),
                })
              }
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={selectedTask.end.toISOString().split("T")[0]}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  end: new Date(e.target.value),
                })
              }
            />
            <TextField
              label="Progress (%)"
              type="number"
              fullWidth
              margin="normal"
              value={selectedTask.progress}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  progress: Number(e.target.value),
                })
              }
            />
            <Autocomplete
              options={allUsers}
              getOptionLabel={(option) => option.username}
              value={selectedTask.assignees}
              onChange={(event, newValue) =>
                setSelectedTask({
                  ...selectedTask,
                  assignee: newValue ? newValue.id : null, // 사용자 ID 저장
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Assignees"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleTaskUpdate} color="primary">
              Save
            </Button>
            <Button onClick={handleTaskDelete} color="secondary">
              Delete
            </Button>
            <Button onClick={closeDialog} color="default">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectTimelinePage;
