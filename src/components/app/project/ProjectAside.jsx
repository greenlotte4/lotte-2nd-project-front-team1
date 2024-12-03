import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/Modal";

export default function ProjectSidebar({ isVisible }) {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "프로젝트 1",
      teamLeader: "팀장1",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      members: ["홍길동", "김영희", "이철수"],
    },
    {
      id: 2,
      name: "팀 프로젝트",
      teamLeader: "팀장2",
      startDate: "2024-02-01",
      endDate: "2024-10-31",
      members: ["박영수", "최민수"],
    },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openUpdateModal = (project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const addProject = (newProject) => {
    const newId = projects.length + 1;
    setProjects((prevProjects) => [
      ...prevProjects,
      { id: newId, ...newProject, members: [] }, 
    ]);
  };

  const updateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    closeUpdateModal();
  };

  const deleteProject = (projectToDelete) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectToDelete.id)
    );
  };

  const selectProject = (project) => {
    setSelectedProject(project); // Track selected project
    navigate(`/app/project/${project.id}`); // Update URL
  };

  return (
    <>
      {isAnimating && (
        <div id="sidebar-container">
          <aside
            className={
              isVisible ? "aside-slide-in sidebar" : "aside-slide-out sidebar"
            }
          >
            <nav className="menu">
              <ul>
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className={`menu-item ${
                      selectedProject?.id === project.id ? "selected" : ""
                    }`}
                    onClick={() => selectProject(project)}
                  >
                    {project.name}
                    <button
                      className="update-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openUpdateModal(project);
                      }}
                    >
                      수정/삭제
                    </button>
                  </li>
                ))}
              </ul>
              <button className="addButton" onClick={openAddModal}>
                + 프로젝트 추가
              </button>
            </nav>
          </aside>
        </div>
      )}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="프로젝트 추가">
        <AddProjectForm onClose={closeAddModal} onAddProject={addProject} />
      </Modal>
      <Modal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} title="프로젝트 수정">
        {selectedProject && (
          <UpdateProjectForm
            project={selectedProject}
            onClose={closeUpdateModal}
            onUpdateProject={updateProject}
            onDeleteProject={deleteProject}
          />
        )}
      </Modal>

      {selectedProject && (
        <div className="selected-project-members">
          <h3>{selectedProject.name} 참여자</h3>
          <ul>
            {selectedProject.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function AddProjectForm({ onClose, onAddProject }) {
  const [projectName, setProjectName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tasks, setTasks] = useState(["기본 Task"]);

  const handleAddTask = () => {
    const MAX_TASKS = 5;

    if (tasks.length >= MAX_TASKS) {
      alert(`Task는 최대 ${MAX_TASKS}개까지만 추가할 수 있습니다.`);
      return;
    }

    setTasks([...tasks, ""]);
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };

  const handleSubmit = () => {
    const newProject = {
      name: projectName,
      teamLeader,
      startDate,
      endDate,
      tasks,
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="add-project-form">
      <div>
        <label>프로젝트 이름</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <label>팀원</label>
        <input
          type="text"
          value={teamLeader}
          onChange={(e) => setTeamLeader(e.target.value)}
        />
        <button>사용자 추가</button>
      </div>
      <div>
        <label>프로젝트 기간</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label>Tasks</label>
        {tasks.map((task, index) => (
          <div key={index}>
            <input
              type="text"
              value={task}
              onChange={(e) => handleTaskChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddTask}>+ Task 추가</button>
      </div>
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
}

function UpdateProjectForm({ project, onClose, onUpdateProject, onDeleteProject }) {
  const [projectName, setProjectName] = useState(project.name);
  const [teamLeader, setTeamLeader] = useState(project.teamLeader);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);

  const handleUpdate = () => {
    const updatedProject = {
      ...project,
      name: projectName,
      teamLeader,
      startDate,
      endDate,
    };

    onUpdateProject(updatedProject);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      onDeleteProject(project);
      onClose();
    }
  };

  return (
    <div className="update-project-form">
      <div>
        <label>프로젝트 이름</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <label>팀원</label>
        <input
          type="text"
          value={teamLeader}
          onChange={(e) => setTeamLeader(e.target.value)}
        />
      </div>
      <div>
        <label>프로젝트 기간</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}
