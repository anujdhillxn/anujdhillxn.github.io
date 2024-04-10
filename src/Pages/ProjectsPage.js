import React from "react";
import Title from "../Components/Title";
import { info } from "../config/info";
import Project from "../Components/Project";

const ProjectsPage = ({ selectedSkills }) => {
    return (
        <div className="ProjectsPage">
            <div className="title">
                <Title title={"Projects"} span={"Projects"} />
            </div>
            <div className="projects-data">
                <div className="projects">
                    {info.projects
                        .filter((project) => {
                            for (const skill of selectedSkills) {
                                if (project.skills.includes(skill)) return true;
                            }
                            return false;
                        })
                        .map((item) => {
                            return <Project project={item} />;
                        })}
                </div>
            </div>
        </div>
    );
};
export default ProjectsPage;
