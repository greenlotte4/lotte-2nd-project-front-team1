/*
   날짜 : 2024/11/25
   이름 : 이도영
   내용 : 프로젝트 메인 화면

   추가내역
   -------------
 */

   import React, { useState } from "react";
   import AddIcon from "@mui/icons-material/Add";
   import { Fab, Modal, Box, TextField, Button } from "@mui/material";
   
   export default function ProjectMainPage() {
     const [tasks, setTasks] = useState([]);
     const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
     const [newTask, setNewTask] = useState({ name: "", group: "" });
   
     const [content, setContent] = useState({}); 
   
     const handleOpenTaskModal = () => setIsTaskModalOpen(true);
     const handleCloseTaskModal = () => {
       setNewTask({ name: "", group: "" }); 
       setIsTaskModalOpen(false);
     };
   
     const handleAddTask = () => {
       const taskId = tasks.length + 1; 
       setTasks([...tasks, { id: taskId, ...newTask }]);
       setContent({ ...content, [taskId]: [] }); 
       handleCloseTaskModal();
     };
   
     const handleAddContent = (taskId) => {
       const updatedContent = { ...content };
       updatedContent[taskId].push(`새로운 작업 내용 ${updatedContent[taskId].length + 1}`);
       setContent(updatedContent);
     };
   
     return (
       <div className="projectmainpage-page">
         {tasks.map((task) => (
           <table key={task.id} className="task-table">
             <thead>
               <tr>
                 <th>{task.name}</th>
               </tr>
             </thead>
             <tbody>
               {content[task.id]?.map((item, index) => (
                 <tr key={index}>
                   <td colSpan="3" className="task-cell">
                     <div className="task-group">
                       <p>{item}</p>
                     </div>
                   </td>
                 </tr>
               ))}
               <tr>
                 <td colSpan="3" className="task-cell">
                   <Fab
                     color="primary"
                     aria-label="addContent"
                     id="addContent"
                     onClick={() => handleAddContent(task.id)}
                   >
                     <AddIcon />
                   </Fab>
                 </td>
               </tr>
             </tbody>
           </table>
         ))}
         <Fab
           color="primary"
           aria-label="addTask"
           id="addTask"
           onClick={handleOpenTaskModal}
           style={{ position: "fixed", bottom: "16px", right: "16px" }}
         >
           <AddIcon />
         </Fab>
   
         <Modal open={isTaskModalOpen} onClose={handleCloseTaskModal}>
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
             <h3>태스크 추가</h3>
             <TextField
               label="태스크 이름"
               value={newTask.name}
               onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
               fullWidth
               margin="normal"
             />
             <TextField
               label="그룹 이름"
               value={newTask.group}
               onChange={(e) => setNewTask({ ...newTask, group: e.target.value })}
               fullWidth
               margin="normal"
             />
             <Button
               variant="contained"
               color="primary"
               onClick={handleAddTask}
               fullWidth
               style={{ marginTop: "16px" }}
             >
               추가
             </Button>
           </Box>
         </Modal>
       </div>
     );
   }
