import Project from "../../../components/app/project/project";
import ProjectLayout from "../../../layouts/app/ProjectLayout";

import '../../../styles/Project.scss';
import '../../../styles/Aside.scss';
export default function ProjectPage(){
    return(
        <ProjectLayout>
            <Project/>
        </ProjectLayout>
    );
}

