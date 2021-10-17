import { CreateTaskForm,TaskLists, Submissions, MatchingReport } from "./view/export";

export default [
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
        path: "/dashboard/:course_id", 
        name: "Submissions", 
        Component: Submissions 
    },
    { 
        path: "/dashboard/:course_id/:student", 
        name: "MatchingReport", 
        Component: MatchingReport 
    }
]