import React from "react";

const Experience = ({ info }) => {
    const About = info.description;
    return (
        <div style={{ margin: "2rem 0 2rem 0" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                }}
            >
                {" "}
                <h5 className="heading-text">{`${info.employer} `}</h5>
                <p>{`(${info.startMonth} - ${info.endMonth})`}</p>
            </div>

            <h3>{info.role}</h3>
            <About />
        </div>
    );
};

export default Experience;
