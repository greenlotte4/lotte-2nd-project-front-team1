import React, { useEffect, useRef, useState } from "react";
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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ChromePicker } from "react-color";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { postSelectProject, fetchProjectParticipants } from "../../../api/project/project/projectAPI";
import { postCreateProjectItem, postUpdateProjectItem, postDeleteProjectItem } from "../../../api/project/projectItem/projectItemAPI";
import { postCreateProjectTask, postUpdateProjectTask, postDeleteProjectTask } from "../../../api/project/task/projectTaskAPI";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { connectStomp, subscribe, publish } from "../../../WebSocket/STOMP"; 
import { SERVER_HOST } from "../../../api/URI";


export default function ProjectMainPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);

  const [modals, setModals] = useState({
    addTask: false,
    editTask: false,
    addColumn: false,
    participants: false,
  });
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskStartDate, setNewTaskStartDate] = useState("");
  const [newTaskEndDate, setNewTaskEndDate] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [newColumn, setNewColumn] = useState({ title: "", color: "#ffffff" });
  const [participants, setParticipants] = useState([]); 
  const [selectedParticipant, setSelectedParticipant] = useState(""); // 한 명만 선택
  const [selectedColumn, setSelectedColumn] = useState(null);
  const subscriptionRef = useRef(null);
  const clearTaskForm = () => {
    setNewTaskName("");
    setNewTaskAssignee("");
    setNewTaskStartDate("");
    setNewTaskEndDate("");
    setTaskAssignee("");
    setTaskStartDate("");
    setTaskEndDate("");
    setCurrentTask(null);
  };
  
  useEffect(() => {
    if (projectId) {
      console.log("Fetching data for projectId:", projectId); 
      fetchProjectData(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    if (selectedColumn) {
      setNewColumn({
        title: selectedColumn.title || "",
        color: selectedColumn.color || "#ffffff",
      });
    } else {
      setNewColumn({ title: "", color: "#ffffff" });
    }
  }, [selectedColumn]);
  

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
  
  useEffect(() => {
    const loadParticipants = async () => {
      if (!projectId) return;

      try {
        const response = await fetchProjectParticipants(projectId)
        console.log("참여자 데이터: ", response); // 확인용 콘솔
        setParticipants(response); // 참여자 목록 설정
      } catch (error) {
        console.error("참여자 목록 로드 실패:", error);
      }
    };

    loadParticipants();
  }, [projectId]);

  useEffect(() => {
    console.log("참여자 상태값:", participants);
  }, [participants]);

  // 라디오 버튼 선택 핸들러
  const handleRadioChange = (userId) => {
    setSelectedParticipant(userId); // 선택된 작업자 설정
  };

  // 선택된 작업자 확인
  const confirmSelectedParticipant = () => {
    console.log("Selected Participant:", selectedParticipant); // 선택된 작업자 출력
    closeModal("participants");
  };

  // 소켓통신
  useEffect(() => {
    const onConnected = () => {
      console.log("WebSocket 연결 성공");
  
      // Task 업데이트 이벤트 구독
      subscribe("/sub/tasks/update", (updatedTask) => {
        console.log("Received Task Update:", updatedTask);
  
        // WebSocket에서 받은 데이터를 상태에 반영
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === `task-${updatedTask.taskId}`
              ? {
                  ...task,
                  group: `column-${updatedTask.groupId}`,
                  name: updatedTask.name,
                  startDate: updatedTask.startDate,
                  endDate: updatedTask.endDate,
                  assignee: updatedTask.assignee || "Unassigned",
                }
              : task
          )
        );
      });
    };
  
    const initializeWebSocket = () => {
      connectStomp(SERVER_HOST + "/socket", onConnected);
    };
  
    if (projectId) {
      fetchProjectData(projectId).then(initializeWebSocket);
    }
  
    return () => {
      // WebSocket 연결 해제
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [projectId]);


  useEffect(() => {
    const onConnected = () => {
      console.log("WebSocket 연결 성공");
  
      // 그룹 업데이트 이벤트 구독
      subscribe("/sub/group/update", (updatedGroup) => {
        console.log("Received Group Update:", updatedGroup);
  
        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column.id === `column-${updatedGroup.projectItemId}`
              ? { ...column, position: updatedGroup.position }
              : column
          )
        );
      });
    };
  
    connectStomp(SERVER_HOST + "/socket", onConnected);
  
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);
  


  const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const openModal = (type) => setModals((prev) => ({ ...prev, [type]: true }));
  const closeModal = (type) => setModals((prev) => ({ ...prev, [type]: false }));

   // 그룹 생성
   const handleCreateItemGroup = async (column) => {
    const dto = {
      name: column.title,
      color: column.color,
      position: columns.length,
      project: { projectId },
    };
  
    try {
      const response = await postCreateProjectItem(dto);
      console.log("성공:", response);
      setColumns((prev) => [
        ...prev,
        {
          id: `column-${response.id}`, 
          title: column.title,
          color: column.color,
        },
      ]);
      closeModal("addColumn");
    } catch (error) {
      console.error("Error creating item group:", error.message);
    }
  };

  // 업데이트
  const handleUpdateItemGroup = (column) => {
    if (!column || !column.id) {
      console.error("Invalid column object:", column);
      return;
    }
    setSelectedColumn(column);
    openModal("addColumn");
  };

  const handleSaveColumn = async () => {
    if (!selectedColumn) {
      console.error("No column selected for update.");
      return;
    }
  
    const columnId = selectedColumn.id.split("-")[1]; // 컬럼 ID 추출
  
    const dto = {
      name: newColumn.title, // 수정된 값
      color: newColumn.color,
      position: columns.findIndex((col) => col.id === selectedColumn.id),
      project: { projectId },
    };
  
    try {
      const response = await postUpdateProjectItem(columnId, dto);
      console.log("업데이트 성공:", response);
  
      // UI 업데이트
      setColumns((prev) =>
        prev.map((col) =>
          col.id === selectedColumn.id
            ? { ...col, title: newColumn.title, color: newColumn.color }
            : col
        )
      );
  
      closeModal("addColumn");
      setSelectedColumn(null); // 상태 초기화
    } catch (error) {
      console.error("업데이트 실패:", error.message);
    }
  };

  // 삭제
  const handleDeleteItemGroup = async (columnId) => {
    const itemgroupId = columnId.split("-")[1]; 
    try {
      const response = await postDeleteProjectItem(itemgroupId);
      console.log("삭제 성공:", response);
      setColumns((prevColumns) => prevColumns.filter((col) => col.id !== columnId));
    } catch (error) {
      console.error("삭제 실패:", error.message);
    }
  };
  
  const handleAddTask = async () => {
    if (!newTaskName.trim() || !currentGroupId) {
      console.error("Task 이름이나 그룹 ID가 누락되었습니다.");
      return;
    }
  
    const newTask = {
      name: newTaskName.trim(),
      assignee: newTaskAssignee.trim() || "Unassigned",
      description: "", 
      priority: null,  
      status: "Pending", 
      startDate: newTaskStartDate || null,
      endDate: newTaskEndDate || null,
      projectItem: { projectItemId: currentGroupId.split("-")[1] },
    };
  
    try {
      const response = await postCreateProjectTask(newTask);
      console.log("Task 추가 성공:", response);
  
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: `task-${response.taskId}`, 
          name: newTask.name,
          assignee: newTask.assignee,
          description: newTask.description,
          priority: newTask.priority,
          status: newTask.status,
          startDate: newTask.startDate,
          endDate: newTask.endDate,
          group: currentGroupId,
        },
      ]);
  
      closeModal("addTask");
      clearTaskForm(); 
    } catch (error) {
      console.error("Task 추가 실패:", error.message);
    }
  };
  

  const handleEditTask = async () => {
    if (!currentTask || !currentTask.id) {
      console.error("currentTask 또는 currentTask.id가 유효하지 않습니다:", currentTask);
      return;
    }
  
    const taskId = currentTask.id.split("-")[1]; // Task ID 추출
    if (!taskId) {
      console.error("유효한 Task ID를 추출하지 못했습니다:", currentTask.id);
      return;
    }
  
    console.log("Sending Data:", {
      name: currentTask.name.trim(),
      assignee: selectedParticipant,
      startDate: taskStartDate || null,
      endDate: taskEndDate || null,
      taskId, // 확인용 출력
    });
  
    const updatedTask = {
      name: currentTask.name.trim(),
      assignee: selectedParticipant,
      startDate: taskStartDate || null,
      endDate: taskEndDate || null,
    };
  
    try {
      const response = await postUpdateProjectTask(taskId, updatedTask);
      console.log("Task 수정 성공:", response);
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTask.id
            ? {
                ...task,
                name: updatedTask.name,
                assignee: updatedTask.assignee,
                startDate: updatedTask.startDate,
                endDate: updatedTask.endDate,
              }
            : task
        )
      );
  
      closeModal("editTask");
      setCurrentTask(null);
      setTaskAssignee("");
      setTaskStartDate("");
      setTaskEndDate("");
    } catch (error) {
      console.error("Task 수정 실패:", error.message);
    }
  };
  

  
  

  const handleDeleteTask = async (taskId) => {
    const taskID = taskId.split("-")[1]; 
    console.log("test = " , taskID);
    try {
      await postDeleteProjectTask(taskID);
      console.log("Task 삭제 성공");
  
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Task 삭제 실패:", error.message);
    }
  };
  

  //드래그 앤 드롭
  const onDragEnd = (result) => {
    const { source, destination, type } = result;
  
    if (!destination) return;
  
    if (type === "COLUMN") {
      // COLUMN 드래그 앤 드롭 처리
      const reorderedColumns = Array.from(columns);
      const [movedColumn] = reorderedColumns.splice(source.index, 1);
      reorderedColumns.splice(destination.index, 0, movedColumn);
  
      // 업데이트된 컬럼들의 position 설정
      const updatedColumns = reorderedColumns.map((column, index) => ({
        ...column,
        position: index, // 새로운 순서에 따라 position 업데이트
      }));
  
      setColumns(updatedColumns);
  
      // 이동한 그룹 정보를 WebSocket으로 전송
      const movedGroupId = movedColumn.id.split("-")[1]; // 그룹 ID 추출
      const newPosition = destination.index;
  
      console.log("Group 이동 이벤트 전송: ", { groupId: movedGroupId, position: newPosition });
  
      publish("/pub/group/move", { projectItemId: movedGroupId, position: newPosition });
    } else if (type === "TASK") {
      // TASK 드래그 앤 드롭 처리
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;
  
      if (sourceColumnId !== destinationColumnId || source.index !== destination.index) {
        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        movedTask.group = destinationColumnId;
        updatedTasks.splice(destination.index, 0, movedTask);
  
        setTasks(updatedTasks);
  
        const taskId = movedTask.id?.split("-")[1]; // Null 체크
        const groupId = destinationColumnId?.split("-")[1]; // Null 체크
  
        if (!taskId || !groupId) {
          console.error("Invalid taskId or groupId:", { taskId, groupId });
          return;
        }
  
        console.log("Task 이동 이벤트 전송: ", { taskId, groupId });
        publish("/pub/tasks/move", { taskId, groupId });
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
                            console.log("Editing column:", column);
                            handleUpdateItemGroup(column);
                          }}
                          >
                            <EditIcon />
                          </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteItemGroup(column.id) }
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
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* Task 정보 */}
                                      <Box>
                                        <Typography variant="body1">{task.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                          {task.assignee || "Unassigned"}
                                        </Typography>
                                      </Box>

                                      {/* 버튼 그룹: 오른쪽으로 이동 */}
                                      <Box
                                        sx={{
                                          marginLeft: "auto", // Flexbox의 오른쪽으로 밀기
                                          display: "flex",    // 버튼 그룹 정렬
                                          gap: 1,             // 버튼 사이 간격
                                        }}
                                      >
                                        <IconButton
                                          size="small"
                                          onClick={() => {
                                            setCurrentTask(task);
                                            openModal("editTask");
                                          }}
                                        >
                                          <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDeleteTask(task.id)}>
                                          <DeleteIcon />
                                        </IconButton>
                                      </Box>
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
           <Button variant="contained" color="primary" onClick={() => openModal("participants")}>
            작업자 선택
          </Button>
          <TextField
            label="Start Date"
            type="date"
            value={newTaskStartDate}
            onChange={(e) => setNewTaskStartDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={newTaskEndDate}
            onChange={(e) => setNewTaskEndDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
          <Button variant="contained" onClick={() => handleAddTask()}>
            Add
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => closeModal("addTask")}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

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
           <Button variant="contained" color="primary" onClick={() => openModal("participants")}>
            작업자 선택
          </Button>
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
            <Button variant="contained" color="primary" onClick={handleEditTask}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => closeModal("editTask")}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>


      <Modal open={modals.addColumn} onClose={() => closeModal("addColumn")}>
        <Box sx={{ width: 400, margin: "auto", padding: 4, bgcolor: "background.paper" }}>
          <Typography variant="h6">
            {selectedColumn ? "Edit Column" : "Add Column"}
          </Typography>
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
            onChange={(updatedColor) =>
              setNewColumn({ ...newColumn, color: updatedColor.hex })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (selectedColumn) {
                  handleSaveColumn();
                } else {
                  handleCreateItemGroup(newColumn);
                }
              }}
              sx={{ marginTop: 2 }}
            >
              {selectedColumn ? "Save" : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
         {/* 참여자 목록 모달 */}
         <Modal open={modals.participants} onClose={() => closeModal("participants")}>
          <Box sx={{ width: 400, margin: "auto", padding: 4, bgcolor: "background.paper" }}>
            <Typography variant="h6">작업자 선택</Typography>
            <List>
              {participants && participants.length > 0 ? (
                participants.map((participant, index) => (
                  <React.Fragment key={participant.userId}>
                    <ListItem
                      secondaryAction={
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedParticipant === participant.userId}
                              onChange={() => handleRadioChange(participant.userId)}
                              checkedIcon={<RadioButtonChecked />} // 라디오 버튼으로 표시
                              icon={<RadioButtonUnchecked />} // 선택되지 않은 상태 아이콘
                            />
                          }
                          label=""
                        />
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: generateRandomColor() }}>
                          {participant.username.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={participant.username}
                        secondary={`ID: ${participant.userId}`}
                      />
                    </ListItem>
                    {index < participants.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No participants found.
                </Typography>
              )}
            </List>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={confirmSelectedParticipant}>
                저장
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => closeModal("participants")}
                sx={{ marginLeft: 2 }}
              >
                취소
              </Button>
            </Box>
          </Box>
        </Modal>
    </DragDropContext>
  );
}
