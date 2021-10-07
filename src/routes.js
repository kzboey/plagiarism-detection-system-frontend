import { TaskLists, Submissions, MatchingReport } from "./view/export";

export default [
    { 
        path: "/dashboard", 
        name: "Dashboard", 
        Component: TaskLists 
    },
    { 
        path: "/dashboard/:id", 
        name: "Submissions", 
        Component: Submissions 
    },
    { 
        path: "/dashboard/:id/:student", 
        name: "MatchingReport", 
        Component: MatchingReport 
    }
]