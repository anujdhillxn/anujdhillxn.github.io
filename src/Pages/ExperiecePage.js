import React from "react";
import Title from "../Components/Title";
import { info } from "../config/info";
import Experience from "../Components/Experience";

const ExperiencePage = ({ selectedSkills }) => {
    return (
        <div style={{ paddingTop: "5rem" }} className="ExperiencePage">
            <Title
                title={"Professional Experience"}
                span={"Professional Experience"}
            />
            <div className="experience-container">
                {info.experiences
                    .filter((experience) => {
                        for (const skill of selectedSkills) {
                            if (experience.skills.includes(skill)) return true;
                        }
                        return false;
                    })
                    .map((item) => (
                        <Experience info={item} />
                    ))}
            </div>
        </div>
    );
};

export default ExperiencePage;
