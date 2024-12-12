import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSelectsProject, deleteProject } from "../../../api/project/project/projectAPI";
import Modal from "../../modal/Modal";
import AddProjectForm from "./asideProjectModal/AddProjectForm";
import { useSelector } from "react-redux";
import EditProjectModal from "./asideProjectModal/EditProjectModal";


export default function ProjectSidebar({ isVisible }) {
  const userId = useSelector((state) => state.userSlice.userid);
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

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

  const selectProject = (projectId) => {
    setSelectedProjectId(projectId); 
    navigate(`/app/project/${projectId}`);
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
                    style={{ flex: 1 }}
                    onClick={() => selectProject(project.projectId)}
                  >
                    {selectedProjectId === project.projectId ? `> ${project.name}` : project.name}
                  </span>
                    <button
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      onClick={() => handleEditClick(project)}
                    >
                      수정
                    </button>
                    <button
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      onClick={() => handleDeleteClick(project.projectId)}
                    >
                      삭제
                    </button>
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
          onSave={handleSave}
        />
      )}
    </div>
  );
}