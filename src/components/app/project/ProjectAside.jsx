import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSelectsProject, deleteProject } from "../../../api/project/project/projectAPI";
import Modal from "../../modal/Modal";
import AddProjectForm from "./asideProjectModal/AddProjectModal";
import { useSelector } from "react-redux";
import EditProjectModal from "./asideProjectModal/EditProjectModal";
import {
  Button,
} from "@mui/material";

export default function ProjectSidebar({ isVisible }) {
  const userId = useSelector((state) => state.userSlice.userid);
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [userList, setUserList] = useState([]);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await postSelectsProject(userId);
        console.log("프로젝트 데이터:", data);
        if (data) {
          setProjects(data); 
        } else {
          setProjects([]); 
        }
      } catch (error) {
        console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
        setProjects([]); 
      }
    };
  
    if (userId) fetchProjects();
  }, [userId]);
  

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const selectProject = (projectId, tab = "main") => {
    setSelectedProjectId(projectId);
    console.log("Selected Project ID:", projectId);
    navigate(`/app/project/${projectId}/${tab}`);
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };
  
  const handleDeleteClick = async (projectId) => {
    console.log("삭제 ID:", projectId);
    if (!window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      return;
    }
    try {
      await deleteProject(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.projectId !== projectId)
      );
      console.log(`프로젝트 ${projectId} 삭제 완료`);
    } catch (err) {
      console.error(`프로젝트 ${projectId} 삭제 실패`, err);
      alert("프로젝트 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSave = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.projectId === updatedProject.projectId ? updatedProject : proj
      )
    );
    setIsEditModalOpen(false);
    setSelectedProject(null);
  };

  const handleAddProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <div id="sidebar-container">
      {isAnimating && (
        <aside className={isVisible ? "aside-slide-in sidebar" : "aside-slide-out sidebar"}>
          <nav className="menu">
          <button className="addButton" onClick={openAddModal}>
              + 프로젝트 추가
            </button>
            <h3 style={{ fontSize: "24px" }}>프로젝트 List</h3>
            <ul>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <li key={project.projectId} style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{ flex: 1, cursor: "pointer" }}
                      onClick={() => selectProject(project.projectId)}
                    >
                      {selectedProjectId === project.projectId ? `> ${project.name}` : project.name}
                    </span>
                    <Button
                      style={{ backgroundColor: "white", marginLeft: "8px", cursor: "pointer", border: "1px solid black" }}
                      onClick={() => handleEditClick(project)}
                    >
                      수정
                    </Button>
                    <Button
                      style={{ backgroundColor: "white", marginLeft: "8px", cursor: "pointer", border: "1px solid black" }}
                      onClick={() => handleDeleteClick(project.projectId)}
                    >
                      삭제
                    </Button>
                  </li>
                ))
              ) : (
                <li>참여 중인 프로젝트가 없습니다.</li>
              )}
            </ul>
          </nav>
        </aside>
      )}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="프로젝트 추가">
        <AddProjectForm onClose={closeAddModal} onAddProject={handleAddProject} />
      </Modal>
      {selectedProject && (
        <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={selectedProject} 
        userList={userList} 
        onSave={(updatedProject) => {
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.projectId === updatedProject.projectId ? updatedProject : project
            )
          );
          alert("프로젝트가 성공적으로 수정되었습니다.");
        }}
      />
      )}
    </div>
  );
}