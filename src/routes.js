import { CreateTaskForm,TaskLists, Submissions, MatchingReport,CreateUser } from "./view/export";

export default [
    { 
        path: "/newuser", 
        name: "CreateUser", 
        Component: CreateUser 
    },
    { 
        path: "/task", 
        name: "CreateTask", 
        Component: CreateTaskForm 
    },
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