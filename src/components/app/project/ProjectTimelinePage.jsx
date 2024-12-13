import React, { useEffect, useState } from "react";
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
import { postSelectProject } from "../../../api/project/project/projectAPI"; // API 호출 함수
import { useParams } from "react-router-dom";

const ProjectTimelinePage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, [projectId]);

  const fetchProjectData = async (id) => {
    try {
      const response = await postSelectProject(id);
      const { project } = response;
      
      // 사용자 리스트 추출
      setAllUsers(project.projectUserNames || []);

      // 테스크 데이터 변환
      const projectTasks = project.projectItems.flatMap((item) =>
        item.tasks.map((task) => ({
          id: `task-${task.taskId}`,
          name: task.name,
          start: new Date(task.startDate),
          end: new Date(task.endDate),
          progress: 0, // Progress 데이터가 없다면 기본값으로 설정
          assignees: task.assignee ? [task.assignee] : [],
          type: "task",
        }))
      );

      setTasks(projectTasks);
    } catch (error) {
      console.error("Failed to fetch project data:", error.message);
    }
  };

  const openDialog = (task) => {
    setSelectedTask({ ...task });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedTask(null);
  };

  const handleTaskUpdate = () => {
    if (!selectedTask) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTask.id ? { ...selectedTask } : task
      )
    );
    closeDialog();
  };

  const handleTaskDelete = () => {
    if (!selectedTask) return;
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
    closeDialog();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>프로젝트 타임라인</h2>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Month}
        onDoubleClick={(task) => openDialog(task)}
        onDateChange={(task) => {
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.id === task.id ? { ...t, start: task.start, end: task.end } : t
            )
          );
        }}
        onProgressChange={(task) => {
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.id === task.id ? { ...t, progress: task.progress } : t
            )
          );
        }}
      />

      {/* Material-UI Dialog */}
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
              multiple
              options={allUsers}
              getOptionLabel={(option) => option}
              value={selectedTask.assignees}
              onChange={(event, newValue) =>
                setSelectedTask({ ...selectedTask, assignees: newValue })
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
