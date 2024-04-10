import React from "react";
import about from "../img/about.jfif";
import { info } from "../config/info";
const Bio = () => {
    const About = info.about;
    return (
        <div className="ImageSection">
            <div className="img">
                <img src={about} alt="" />
            </div>
            <div className="about-info">
                <h4>
                    Hey there, I am<span> Anuj</span>
                </h4>
                <About />
                <button className="btn">
                    <a href={info.cvLink}>Download CV</a>
                </button>
            </div>
        </div>
    );
};
export default Bio;
