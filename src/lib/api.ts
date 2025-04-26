const DEBUG = false;
const API_URL = DEBUG
    ? "http://localhost:5000/"
    : "https://api-anujdhillxn.onrender.com/";
const LOADED = "Loaded";
const LOADING = "Loading...";
export { API_URL, LOADED, LOADING };

export type Comment = {
    author: string;
    dateAdded: string;
    content: string;
};
