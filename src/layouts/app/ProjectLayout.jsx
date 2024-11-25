import ProjectHeader from "../../components/app/project/ProjectHeader";

export default function ProjectLayout({children}){
    return (
        <div>
            <ProjectHeader/>
            {children}
        </div>
    );
}