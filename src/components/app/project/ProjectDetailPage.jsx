import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postSelectProject } from "../../../api/project/project/projectAPI";
import Modal from "../../modal/Modal";

export default function ProjectDetailPage() {
  const { projectId } = useParams(); 
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const data = { projectId }; 
        const response = await postSelectProject(data);
        setProjectDetail(response);
      } catch (error) {
        console.error("프로젝트 상세 정보를 가져오는 중 오류 발생:", error);
      }
    };

    if (projectId) fetchProjectDetail();
  }, [projectId]);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  return (
    <div>
      {projectDetail ? (
        <div>
          <h2>{projectDetail.name}</h2>
          <p>팀장: {projectDetail.teamLeader}</p>
          <p>시작일: {projectDetail.startDate}</p>
          <p>종료일: {projectDetail.endDate}</p>
          <p>참여자: {projectDetail.members.join(", ")}</p>

          <button onClick={() => navigate("/app/project")}>뒤로가기</button>
          <button onClick={openUpdateModal}>수정/삭제</button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}

      {isUpdateModalOpen && (
        <Modal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} title="프로젝트 수정/삭제">
          <UpdateProjectForm project={projectDetail} onClose={closeUpdateModal} />
        </Modal>
      )}
    </div>
  );
}

function UpdateProjectForm({ project, onClose }) {
  const [projectName, setProjectName] = useState(project.name);
  const [teamLeader, setTeamLeader] = useState(project.teamLeader);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);

  const handleUpdate = () => {
    console.log("프로젝트 수정:", {
      projectId: project.projectId,
      name: projectName,
      teamLeader,
      startDate,
      endDate,
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      console.log("프로젝트 삭제:", project.projectId);
      onClose();
    }
  };

  return (
    <div>
      <div>
        <label>프로젝트 이름</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <label>팀장</label>
        <input
          type="text"
          value={teamLeader}
          onChange={(e) => setTeamLeader(e.target.value)}
        />
      </div>
      <div>
        <label>시작일</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>종료일</label>
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
