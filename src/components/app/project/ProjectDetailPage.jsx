import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetailPage = () => {
  const { id } = useParams(); 
  const [project, setProject] = React.useState(null);

  const projects = [
    {
      id: 1,
      name: "프로젝트 1",
      teamLeader: "팀장1",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      members: ["김철수", "박영희", "이민수"],
    },
    {
      id: 2,
      name: "팀 프로젝트",
      teamLeader: "팀장2",
      startDate: "2024-02-01",
      endDate: "2024-10-31",
      members: ["조수민", "한서진"],
    },
  ];

  React.useEffect(() => {
    const selectedProject = projects.find(
      (project) => project.id === parseInt(id, 10)
    );
    setProject(selectedProject);
  }, [id]);

  if (!project) {
    return <p>프로젝트를 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>팀장: {project.teamLeader}</p>
      <p>기간: {project.startDate} ~ {project.endDate}</p>
      <h3>참여자 목록:</h3>
      <ul>
        {project.members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetailPage;
