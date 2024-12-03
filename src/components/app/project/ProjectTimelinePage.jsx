/*
   날짜 : 2024/11/25
   이름 : 이도영
   내용 : 프로젝트 타임라인 화면

   추가내역
   -------------
 */

   import React, { useEffect, useState } from "react";
   import Timeline from "react-calendar-timeline";
   import moment from "moment";
   
   export default function ProjectTimelinePage({ projectId }) {
     const [projectData, setProjectData] = useState(null);
   
     const timelineData = [
       {
         id: 1,
         name: "프로젝트 1",
         groups: [
           { id: 1, title: "팀원 1" },
           { id: 2, title: "팀원 2" },
         ],
         items: [
           {
             id: 1,
             group: 1,
             title: "Task 1",
             start_time: moment().subtract(7, "days").toDate(),
             end_time: moment().toDate(),
           },
           {
             id: 2,
             group: 2,
             title: "Task 2",
             start_time: moment().toDate(),
             end_time: moment().add(7, "days").toDate(),
           },
         ],
       },
       {
         id: 2,
         name: "팀 프로젝트",
         groups: [
           { id: 1, title: "팀장" },
           { id: 2, title: "개발자" },
         ],
         items: [
           {
             id: 1,
             group: 1,
             title: "개발 계획",
             start_time: moment().subtract(5, "days").toDate(),
             end_time: moment().add(5, "days").toDate(),
           },
           {
             id: 2,
             group: 2,
             title: "기능 개발",
             start_time: moment().add(5, "days").toDate(),
             end_time: moment().add(15, "days").toDate(),
           },
         ],
       },
     ];
   
     useEffect(() => {
       const project = timelineData.find(
         (proj) => proj.id === parseInt(projectId, 10)
       );
       if (project) {
         console.log("Loaded Project Data:", project);
         setProjectData(project);
       } else {
         console.error("Project not found for ID:", projectId);
       }
     }, [projectId]);
   
     if (!projectData) {
       return (
         <div className="timeline-page">
           <p>프로젝트 데이터를 불러오는 중입니다...</p>
         </div>
       );
     }
   
     return (
       <div className="timeline-page">
         <div className="timeline-content">
           <h2>{projectData.name} - Timeline</h2>
           <Timeline
             groups={projectData.groups}
             items={projectData.items}
             defaultTimeStart={moment().subtract(15, "days").toDate()}
             defaultTimeEnd={moment().add(15, "days").toDate()}
           />
         </div>
       </div>
     );
   }
   