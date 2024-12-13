import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { postSelectProject } from "../../../api/project/project/projectAPI";

export default function ProjectMainPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);

  const [modals, setModals] = useState({
    addTask: false,
    editTask: false,
    addColumn: false,
  });
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [newColumn, setNewColumn] = useState({ title: "", color: "#ffffff" });
  const [selectedColumn, setSelectedColumn] = useState(null);

  useEffect(() => {
    if (projectId) {
      console.log("Fetching data for projectId:", projectId); 
      fetchProjectData(projectId);
    }
  }, [projectId]);

  const fetchProjectData = async (id) => {
    try {
      const response = await postSelectProject(id); 
      const { project } = response; 
  
      const projectItems = project.projectItems || [];
      const newColumns = projectItems.map((item) => ({
        id: `column-${item.projectItemId}`,
        title: item.name,
        color: generateRandomColor(), 
      }));
  
      const newTasks = projectItems.flatMap((item) =>
        item.tasks.map((task) => ({
          id: `task-${task.taskId}`,
          name: task.name,
          group: `column-${item.projectItemId}`,
          assignee: task.assignee || "Unassigned",
          startDate: task.startDate,
          endDate: task.endDate,
        }))
      );
  
      setColumns(newColumns); 
      setTasks(newTasks); 
    } catch (error) {
      console.error("Failed to fetch project data:", error.message);
    }
  };
  
  const generateRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
  

  const openModal = (type) => setModals((prev) => ({ ...prev, [type]: true }));
  const closeModal = (type) => setModals((prev) => ({ ...prev, [type]: false }));

  const handleAddColumn = () => {
    if (!newColumn.title.trim()) return;

    setColumns((prevColumns) => {
      if (selectedColumn) {
        return prevColumns.map((col) =>
          col.id === selectedColumn.id
            ? { ...col, title: newColumn.title, color: newColumn.color }
            : col
        );
      } else {
        const newId = newColumn.title.replace(/\s+/g, "") + Date.now();
        return [...prevColumns, { id: newId, title: newColumn.title, color: newColumn.color }];
      }
    });

    setNewColumn({ title: "", color: "#ffffff" });
    setSelectedColumn(null);
    closeModal("addColumn");
  };

  const handleAddTask = () => {
    if (!newTaskName.trim()) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: `task-${Date.now()}`, name: newTaskName, group: currentGroupId, assignee: "", startDate: "", endDate: "" },
    ]);

    setNewTaskName("");
    closeModal("addTask");
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
  
    if (!destination) return;
  
    if (type === "COLUMN") {
      const reorderedColumns = Array.from(columns);
      const [movedColumn] = reorderedColumns.splice(source.index, 1);
      reorderedColumns.splice(destination.index, 0, movedColumn);
      setColumns(reorderedColumns);
    } else if (type === "TASK") {
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;
  
      if (sourceColumnId !== destinationColumnId || source.index !== destination.index) {
        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        movedTask.group = destinationColumnId;
        updatedTasks.splice(destination.index, 0, movedTask);
        setTasks(updatedTasks);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <Grid
            container
            spacing={2}
            wrap="nowrap"
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ overflowX: "auto", padding: 2 }}
          >
            {columns.map((column, index) => (
              <Draggable key={column.id} draggableId={column.id} index={index}>
                {(provided) => (
                  <Grid
                    item
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
                      <Box sx={{ display: "flex", alignItems: "center" }}>
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
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedColumn(column);
                            openModal("addColumn");
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setColumns((prevColumns) => prevColumns.filter((col) => col.id !== column.id))
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Droppable droppableId={column.id} type="TASK">
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
                                        onClick={() => {
                                          setCurrentTask(task);
                                          openModal("editTask");
                                        }}
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
                      onClick={() => {
                        setCurrentGroupId(column.id);
                        openModal("addTask");
                      }}
                      sx={{ marginTop: 2 }}
                    >
                      Add Task
                    </Button>
                  </Grid>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <Grid
              item
              sx={{
                width: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Fab color="primary" onClick={() => openModal("addColumn")}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        )}
      </Droppable>

      {/* Add Task Modal */}
      <Modal open={modals.addTask} onClose={() => closeModal("addTask")}>
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

      {/* Edit Task Modal */}
      <Modal open={modals.editTask} onClose={() => closeModal("editTask")}>
        <Box sx={{ width: 400, margin: "auto", padding: 4, bgcolor: "background.paper" }}>
          <Typography variant="h6">Edit Task</Typography>
          <TextField
            label="Task Name"
            value={currentTask?.name || ""}
            onChange={(e) => setCurrentTask((prev) => ({ ...prev, name: e.target.value }))}
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
            <Button variant="contained" color="primary">
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => closeModal("editTask")}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Add/Edit Column Modal */}
      <Modal open={modals.addColumn} onClose={() => closeModal("addColumn")}>
        <Box sx={{ width: 400, margin: "auto", padding: 4, bgcolor: "background.paper" }}>
          <Typography variant="h6">{selectedColumn ? "Edit Column" : "Add Column"}</Typography>
          <TextField
            label="Column Name"
            value={newColumn.title}
            onChange={(e) => setNewColumn({ ...newColumn, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Typography>Select Color</Typography>
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
    </DragDropContext>

  );
}
