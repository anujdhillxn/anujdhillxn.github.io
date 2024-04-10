import React from "react";
import Categories from "../Components/Categories";

import { info } from "../config/info";
import Title from "../Components/Title";
const SkillsPage = ({ selectedSkills, clickSkill }) => {
    return (
        <div className="SkillsPage">
            <div className="title">
                <Title title={"Skills"} span={"Skills"} />
            </div>
            <div className="skill-data">
                <Categories
                    filter={clickSkill}
                    selectedCategories={selectedSkills}
                    categories={info.allSkills}
                />
            </div>
        </div>
    );
};

export default SkillsPage;
