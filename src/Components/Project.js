import React from "react";

const Project = ({ project }) => {
    return (
        <div className="project" key={project.id}>
            <div className="image-data">
                <img src={project.image} alt={project.title} />
                <ul className="hover-items">
                    {project.links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <li>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    className="icon-holder"
                                    rel="noreferrer"
                                >
                                    <Icon />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <h5 className="heading-text">{project.title}</h5>
            <p>{project.description}</p>
        </div>
    );
};
export default Project;
//<Link className="icon-holder">
//                                        <FontAwesomeIcon icon={faYoutube} className="icon yt"/>
//                                    </Link>
