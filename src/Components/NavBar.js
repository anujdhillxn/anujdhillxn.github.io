import React from "react";
import avatar from "../img/avatar.jpeg";
import { Link } from "react-scroll";
import { LOADED } from "../config/api";
function Navbar({ viewCount, apiCallStatus }) {
    return (
        <div className="NavBar">
            <nav className="nav">
                <div className="profile">
                    <img src={avatar} alt="Anuj" />
                </div>
                <ul className="nav-items">
                    <li className="nav-item">
                        <Link
                            activeClass="active"
                            to="about"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                        >
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            activeClass="active"
                            to="skills"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                        >
                            Skills
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            activeClass="active"
                            to="experience"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                        >
                            Experience
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            activeClass="active"
                            to="projects"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                        >
                            Projects
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            activeClass="active"
                            to="contact"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
                <footer className="footer">
                    <p>
                        Views:{" "}
                        {apiCallStatus === LOADED ? viewCount : apiCallStatus}
                    </p>
                </footer>
            </nav>
        </div>
    );
}
export default Navbar;
