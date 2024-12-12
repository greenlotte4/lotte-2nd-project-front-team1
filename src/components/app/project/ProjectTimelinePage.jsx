import React, { useState } from "react";
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

const App = () => {
  const today = new Date();

  const initialTasks = [
    {
      id: "1",
      name: "Define PRD & User Stories",
      start: today,
      end: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
      progress: 50,
      assignees: ["John Doe", "Jane Smith"],
      type: "task",
    },
    {
      id: "2",
      name: "Persona & Journey",
      start: today,
      end: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000),
      progress: 30,
      assignees: ["Emily Davis"],
      type: "task",
    },
  ];

  const allUsers = ["John Doe", "Jane Smith", "Emily Davis", "Michael Brown"];

  const [tasks, setTasks] = useState(initialTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openDialog = (task) => {
    setSelectedTask({ ...task }); // Clone the task to avoid direct mutation
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
      <h2>테스트 프로젝트 1</h2>
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
            <Button onClick={closeDialog} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default App;
