import "./App.scss";
import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ProjectsPage from "./Pages/ProjectsPage";
import ContactPage from "./Pages/ContactPage";
import Particles from "react-tsparticles";
import particleOptions from "./config/particleOptions.js";
import { info } from "./config/info";
import SkillsPage from "./Pages/SkillsPage";
import ExperiencePage from "./Pages/ExperiecePage";
import { API_URL, LOADED, LOADING } from "./config/api.js";
import axios from "axios";

const App = () => {
    const [navToggle, setNavToggle] = useState(false);
    const [homeToggle, setHomeToggle] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState(info.allSkills);
    const [commentList, setCommentList] = useState([]);
    const [apiCallStatus, setApiCallStatus] = useState(LOADING);
    const [views, setViews] = useState("");
    const navClick = () => {
        setNavToggle(!navToggle);
    };
    const enterClick = () => {
        document.getElementsByTagName("body")[0].style.overflowY = "scroll";
        setHomeToggle(!homeToggle);
    };
    const clickSkill = (skill) => {
        if (skill === "All") {
            setSelectedSkills(info.allSkills);
            return;
        }
        if (selectedSkills.length === info.allSkills.length) {
            setSelectedSkills([skill]);
            return;
        }
        if (selectedSkills.includes(skill)) {
            setSelectedSkills((selectedSkills) =>
                selectedSkills.filter((item) => item !== skill)
            );
        } else {
            setSelectedSkills((selectedSkills) => [...selectedSkills, skill]);
        }
    };

    const fetchData = async () => {
        try {
            setApiCallStatus(LOADING);
            const resp = await axios.get(API_URL);
            setCommentList(resp.data.commentList);
            setViews(resp.data.views);
            setApiCallStatus(LOADED);
        } catch (e) {
            setApiCallStatus(e.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            <div className={`firstpage ${homeToggle ? "home-toggle" : ""}`}>
                <HomePage enterClick={enterClick} />
            </div>
            <div className={`sidebar ${navToggle ? "nav-toggle" : ""}`}>
                <NavBar apiCallStatus={apiCallStatus} views={views} />
            </div>
            <div className="nav-btn" onClick={navClick}>
                <div className="lines-1"></div>
                <div className="lines-2"></div>
                <div className="lines-3"></div>
            </div>
            <div className="main-content">
                <div className="content">
                    <div id="about">
                        <AboutPage />
                    </div>
                    <div id="skills">
                        <SkillsPage
                            selectedSkills={selectedSkills}
                            clickSkill={clickSkill}
                        />
                    </div>
                    <div id="experience">
                        <ExperiencePage selectedSkills={selectedSkills} />
                    </div>
                    <div id="projects">
                        <ProjectsPage selectedSkills={selectedSkills} />
                    </div>
                    <div id="contact">
                        <ContactPage
                            apiCallStatus={apiCallStatus}
                            commentList={commentList}
                        />
                    </div>
                </div>
            </div>
            <Particles id="tsparticles" options={particleOptions} />
        </div>
    );
};

export default App;
