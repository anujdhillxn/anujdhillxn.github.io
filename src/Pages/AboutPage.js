import React from "react";
import Title from "../Components/Title";
import Bio from "../Components/Bio";
const AboutPage = () => {
    return (
        <div style={{ paddingTop: "5rem" }} className="AboutPage">
            <Title title={"About Me"} span={"About Me"} />
            <Bio />
        </div>
    );
};
export default AboutPage;
