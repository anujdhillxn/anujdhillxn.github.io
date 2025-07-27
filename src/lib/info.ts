import redditscraper from "../img/projects/redditscraper.jpg";
import visualcursor from "../img/projects/visualcursor.jpg";
import funcdiff from "../img/projects/funcdiff.jpg";
import flipbook from "../img/projects/flipbook.jpg";
import igbotImg from "../img/projects/igbot.jpg";
import cptemplates from "../img/projects/cptemplates.jpg";
import agnocpeed from "../img/projects/agnocpeed.jpg";
import lucive from "../img/projects/lucive.png";
import {
    IconCodechef,
    IconCodeforces,
    IconGithub,
    IconInstagram,
    IconLeetcode,
    IconLink,
    IconLinkedin,
} from "./icons";

export type ProjectLink = {
    url: string;
    icon: string;
};

export type Project = {
    id: string;
    skills: string;
    links: ProjectLink[];
    image: string;
    title: string;
    description: string;
};

export type Experience = {
    id: string;
    employer: string;
    role: string;
    skills: string;
    type: string;
    startMonth: string;
    endMonth: string;
    description: string;
};

const projects: Project[] = [
    {
        id: "lucive",
        skills: "Typescript,React Native, Python, Java, Django, PostgreSQL",
        links: [
            {
                url: "https://github.com/anujdhillxn/lucive",
                icon: IconGithub,
            },
            {
                url: `/lucive`, //TODO: fix me
                icon: IconLink,
            },
        ],
        image: lucive,
        title: "Lucive",
        description: "Android app for digital detox and screentime management",
    },
    {
        id: "agnocpeed",
        skills: "Javascript,ReactJS,NodeJS,ElectronJS,Web Scraping",
        links: [
            {
                url: "https://github.com/anujdhillxn/agnocpeed",
                icon: IconGithub,
            },
            {
                url: "https://codeforces.com/blog/entry/108609",
                icon: IconCodeforces,
            },
        ],
        image: agnocpeed,
        title: "Agnocpeed",
        description: "Desktop app for competitive programming support.",
    },
    {
        id: "igbot",
        skills: "Javascript,Typescript,NodeJS,ExpressJS,Web Scraping,MongoDB",
        links: [
            {
                url: "https://github.com/anujdhillxn/igbot",
                icon: IconGithub,
            },
        ],
        image: igbotImg,
        title: "Instagram Bot",
        description:
            "Automated bot for instagram using puppeteer and expressjs for posting, scraping and gathering followers",
    },
    {
        id: "cpb",
        skills: "C++,DSA",
        links: [
            {
                url: "https://github.com/anujdhillxn/CompetitiveProgramming_Boilerplate",
                icon: IconGithub,
            },
        ],
        image: cptemplates,
        title: "Competitive Programming Templates",
        description:
            "Implementations of various standard Data structures and algorithms",
    },
    {
        id: "fd",
        skills: "Python,Flask,DSA",
        links: [
            {
                url: "https://github.com/anujdhillxn/functiondifferentiator",
                icon: IconGithub,
            },
            {
                url: "https://functiondifferentiator.onrender.com",
                icon: IconLink,
            },
        ],
        image: funcdiff,
        title: "Function Differentiator",
        description: "Flask app to find derivative of a function",
    },
    {
        id: "fb",
        skills: "Python",
        links: [
            {
                url: "https://github.com/anujdhillxn/flipbook",
                icon: IconGithub,
            },
        ],
        image: flipbook,
        title: "Flipbook language",
        description: "A language for generating flipbooks using pictures",
    },
    // {
    //     id: 1,
    //     skills: "Python",
    //     links: [
    //         {
    //             url: "https://github.com/anujdhillxn/redditscraper",
    //             icon: IconGithub,
    //         },
    //     ],
    //     image: redditscraper,
    //     title: "Reddit-Scraper",
    //     description: "Download Reddit images and videos using Python",
    // },
    // {
    //     id: 2,
    //     skills: "Python,Machine Learning",
    //     links: [
    //         {
    //             url: "https://github.com/anujdhillxn/visualcursor",
    //             icon: IconGithub,
    //         },
    //     ],
    //     image: visualcursor,
    //     title: "Visual Cursor",
    //     description: "Control mouse with eyeball movement",
    // },
];

const experiences: Experience[] = [
    {
        id: "anz",
        employer: "Australia And New Zealand Banking Group Limited",
        role: "Fullstack Developer",
        skills: "Java,Spring,Git,ReactJS,Javascript,Typescript,C++,MS SQL Server",
        type: "Full-time",
        startMonth: "June, 2022",
        endMonth: "Present",
        description: `
            <p class="about-text">
                <ul>
                    <li>
                        Created a <span>Static Data Viewer</span> (ReactJS, Spring) that converts XML data into a human-readable grid format, allows editing, and shows diff across versions. Received <span>Employee of the Month Award</span> (Feb 2023).
                    </li>
                    <li>
                        Created a <span>Review System</span> (ReactJS, Spring, C++, MS SQL Server) that suspends any DB data modification coming from 3rd party source systems until required approvals are in place. Received <span>Employee of the Month Award</span> (Jan 2024).
                    </li>
                    <li>
                        Collaborated with squads like FX, Rates, and XVA across India, Australia, and Singapore to add new functionalities, fix bugs, and improve performance.
                    </li>
                </ul>
            </p>
        `,
    },
    {
        id: "mm",
        employer: "Math Materate",
        role: "Fullstack Developer",
        skills: "ReactJS,Javascript,PostgreSQL,Git,Django",
        type: "Internship",
        startMonth: "May, 2021",
        endMonth: "August, 2021",
        description: `
            <p class="about-text">
                <ul>
                    <li>
                        Developed a <span>Live Classes Portal</span> which included features like creating and monitoring classes, resolving doubts, etc.
                    </li>
                    <li>
                        Using ReactJS, made the entire UI, ranging from CSS to API Integration.
                    </li>
                    <li>
                        Created the models and REST API used by the UI in Django Rest Framework.
                    </li>
                    <li>
                        Hosted Jitsi Meet on an AWS EC2 instance which was used to host classes.
                    </li>
                </ul>
            </p>
        `,
    },
];

const links = [
    {
        url: "https://www.instagram.com/anujdhillxn/",
        icon: IconInstagram,
    },
    {
        url: "https://www.linkedin.com/in/anujdhillxn/",
        icon: IconLinkedin,
    },
    {
        url: "https://github.com/anujdhillxn",
        icon: IconGithub,
    },
    {
        url: "https://codeforces.com/profile/anujdhillxn",
        icon: IconCodeforces,
    },
    {
        url: "https://www.codechef.com/users/anujdhillxn",
        icon: IconCodechef,
    },
    {
        url: "https://leetcode.com/anujdhillxn/",
        icon: IconLeetcode,
    },
];

export const info = {
    about: `
        <p class="about-text">
            I graduated from <span>IIT Delhi</span> in 2022 and since then have been working to make seamless web applications.
            <br /> As a <span>full-stack developer</span>, I wield a versatile toolkit that empowers me to create and manage entire web applications. On the front end, I have crafted interactive user interfaces using ReactJS. On the back end, I have worked with Node.js and Spring to build robust server-side logic.
            <br /> In my free time, I like to play video games, do competitive programming, and play guitar.
        </p>
    `,
    cvLink: "https://drive.google.com/file/d/1w2E-dRdiixj7ovxEgP6CI_xsAJPE7TGe/view?usp=sharing",
    email: "anuj.dhillon.14@gmail.com",
    phoneNumber: "+918569919298",
    links,
    projects,
    experiences,
    allSkills: [
        "All",
        ...new Set(
            [...projects, ...experiences]
                .map((project) => project.skills)
                .join(",")
                .split(",")
                .map((skill) => skill.trim())
        ),
    ],
};
