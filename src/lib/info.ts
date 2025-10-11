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
    linkedinUrl?: string;
};

const projects: Project[] = [
    {
        id: "ions",
        skills: "Typescript,Canvas API,Animation",
        links: [
            {
                url: "https://github.com/anujdhillxn/ions-ts",
                icon: IconGithub,
            },
            {
                url: "https://www.npmjs.com/package/ions-ts",
                icon: IconLink,
            },
        ],
        title: "Ions.ts",
        description: "Lightweight canvas animation library - the background you're seeing right now",
    },
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
        title: "Instagram Bot",
        description:
            "Automated bot for instagram for posting, scraping and gathering followers",
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
