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
    logo?: string;
    linkedinUrl?: string;
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
        id: "millennium",
        employer: "Millennium",
        role: "Software Engineer - Enterprise Risk Tech",
        skills: "Python,AI,ReactJS,Javascript,Typescript,Data Visualization",
        type: "Full-time",
        startMonth: "June 2025",
        endMonth: "Present",
        description: `Building AI-powered interfaces for risk managers and the CIO office with Python and React.`,
        logo: "/logos/millennium.png", // TODO: Add actual logo
        linkedinUrl: 'https://www.linkedin.com/company/millennium-management/posts/?feedView=all'
    },
    {
        id: "anz",
        employer: "ANZ Bank",
        role: "Fullstack Developer - Front Office Quant Tech",
        skills: "Java,Spring,Git,ReactJS,Javascript,Typescript,C++,MS SQL Server",
        type: "Full-time",
        startMonth: "June 2022",
        endMonth: "June 2025",
        description: `Built tools for traders and quants using Spring and React.`,
        logo: "/logos/anz.png", // TODO: Add actual logo
        linkedinUrl: 'https://www.linkedin.com/company/anz/posts/?feedView=all'
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
            Been building software since <span>2021</span>.
            <br /> I make things work on both sides - what you see and what makes it tick.
            <br /> Scroll ahead to see what I've been up to.
        </p>
    `,
    cvLink: "https://drive.google.com/file/d/1w2E-dRdiixj7ovxEgP6CI_xsAJPE7TGe/view?usp=sharing",
    email: "anuj.dhillon.14@gmail.com",
    phoneNumber: "+918569919298",
    links,
    projects,
    experiences,
    allSkills: [
        ...new Set(
            [...projects, ...experiences]
                .map((project) => project.skills)
                .join(",")
                .split(",")
                .map((skill) => skill.trim())
        ),
    ],
};
