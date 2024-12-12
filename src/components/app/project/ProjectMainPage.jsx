import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
  Fab,
  IconButton,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ChromePicker } from "react-color";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function ProjectMainPage() {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([
    { id: "Backlog", title: "Backlog", color: "#f44336" },
    { id: "Ready", title: "Ready", color: "#2196f3" },
    { id: "InProgress", title: "In Progress", color: "#ff9800" },
    { id: "InReview", title: "In Review", color: "#9c27b0" },
    { id: "Done", title: "Done", color: "#4caf50" },
  ]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [newColumn, setNewColumn] = useState({ title: "", color: "#ffffff" });
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleOpenAddColumnModal = () => setIsAddColumnModalOpen(true);
  const handleCloseAddColumnModal = () => {
    setNewColumn({ title: "", color: "#ffffff" });
    setIsAddColumnModalOpen(false);
  };

  const handleOpenAddTaskModal = (groupId) => {
    setCurrentGroupId(groupId);
    setIsAddTaskModalOpen(true);
  };

  const handleCloseAddTaskModal = () => {
    setCurrentGroupId(null);
    setNewTaskName("");
    setIsAddTaskModalOpen(false);
  };

  const handleOpenEditColumn = (column) => {
    setSelectedColumn(column);
    setNewColumn({ title: column.title, color: column.color });
    setIsAddColumnModalOpen(true);
  };

  const handleDeleteColumn = (columnId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.group !== columnId));
    setColumns((prevColumns) => prevColumns.filter((col) => col.id !== columnId));
  };

  const handleAddTask = () => {
    if (!newTaskName.trim()) return;
    const taskId = `task-${Date.now()}`;
    setTasks([
      ...tasks,
      { id: taskId, name: newTaskName, group: currentGroupId, assignee: "", startDate: "", endDate: "" },
    ]);
    handleCloseAddTaskModal();
  };

  const handleOpenEditTaskModal = (task) => {
    setCurrentTask(task);
    setTaskAssignee(task.assignee || "");
    setTaskStartDate(task.startDate || "");
    setTaskEndDate(task.endDate || "");
    setIsEditTaskModalOpen(true);
  };
  

  const handleCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
    setCurrentTask(null);
    setTaskAssignee("");
    setTaskStartDate("");
    setTaskEndDate("");
  };
  
  const handleEditTask = () => {
    if (!currentTask) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === currentTask.id
          ? { ...task, assignee: taskAssignee, startDate: taskStartDate, endDate: taskEndDate }
          : task
      )
    );
    handleCloseEditTaskModal();
  };

  const handleAddColumn = () => {
    if (!newColumn.title.trim()) return;
    if (selectedColumn) {
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === selectedColumn.id
            ? { ...col, title: newColumn.title, color: newColumn.color }
            : col
        )
      );
    } else {
      const newId = newColumn.title.replace(/\s+/g, "") + Date.now(); // Unique ID
      setColumns([...columns, { id: newId, title: newColumn.title, color: newColumn.color }]);
    }
    handleCloseAddColumnModal();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      movedTask.group = destination.droppableId;
      updatedTasks.splice(destination.index, 0, movedTask);
      setTasks(updatedTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ padding: 2, overflowX: "auto" }}>
        <Grid container spacing={2} wrap="nowrap">
          {columns.map((column) => (
            <Grid
              item
              key={column.id}
              sx={{
                width: "250px",
                minWidth: "250px",
                maxWidth: "250px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: column.color,
                      borderRadius: "50%",
                      marginRight: 1,
                    }}
                  />
                  <Typography variant="h6">
                    {column.title} ({tasks.filter((task) => task.group === column.id).length})
                  </Typography>
                </Box>

                <Box>
                  <IconButton size="small" onClick={() => handleOpenEditColumn(column)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteColumn(column.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: 400,
                      backgroundColor: column.color + "33",
                      borderRadius: 2,
                      padding: 1,
                      overflowY: "auto",
                    }}
                  >
                    {tasks
                      .filter((task) => task.group === column.id)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ marginBottom: 2 }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  <Typography variant="body1">{task.name}</Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    {task.assignee || "Unassigned"}
                                  </Typography>
                                </Box>

                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenEditTaskModal(task)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleOpenAddTaskModal(column.id)}
                sx={{ marginTop: 2 }}
              >
                Add Task
              </Button>
            </Grid>
          ))}

          <Grid
            item
            sx={{
              width: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Fab color="primary" onClick={handleOpenAddColumnModal}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>

         <Modal open={isAddTaskModalOpen} onClose={handleCloseAddTaskModal}>
          <Box sx={{ width: 400, margin: "auto", padding: 4, bgcolor: "background.paper" }}>
            <Typography variant="h6">Add Task</Typography>
            <TextField
              label="Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleAddTask}>
              Add
            </Button>
          </Box>
        </Modal>

        <Modal open={isEditTaskModalOpen} onClose={handleCloseEditTaskModal}>
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Edit Task
            </Typography>
            <TextField
              label="Task Name"
              value={currentTask?.name || ""}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, name: e.target.value }))
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Assignee"
              value={taskAssignee}
              onChange={(e) => setTaskAssignee(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Start Date"
              type="date"
              value={taskStartDate}
              onChange={(e) => setTaskStartDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={taskEndDate}
              onChange={(e) => setTaskEndDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
              <Button variant="contained" onClick={handleEditTask} color="primary">
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={handleCloseEditTaskModal}
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={isAddColumnModalOpen} onClose={handleCloseAddColumnModal}>
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              {selectedColumn ? "Edit Group" : "Add Group"}
            </Typography>
            <TextField
              label="Group Name"
              value={newColumn.title}
              onChange={(e) => setNewColumn({ ...newColumn, title: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Typography variant="body1" gutterBottom sx={{ marginTop: 2 }}>
              Select Color
            </Typography>
            <ChromePicker
              color={newColumn.color}
              onChange={(updatedColor) => setNewColumn({ ...newColumn, color: updatedColor.hex })}
            />
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
              <Button variant="contained" color="primary" onClick={handleAddColumn}>
                {selectedColumn ? "Save" : "Add"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </DragDropContext>
  );
}
