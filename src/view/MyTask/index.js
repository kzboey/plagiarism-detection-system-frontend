import React, {useState} from 'react'
import {Box,Grid} from '@material-ui/core';
import {DynamicTables,IconButton, ConfirmDialog,FormDialog,SubmitButton,CustomSnackbar} from '../../components/export'
import taskList from '../../resources/TaskList.json';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import EditIcon from "@material-ui/icons/Edit";                                 
import DeleteIcon from "@material-ui/icons/Delete";
import PreviewIcon from '@mui/icons-material/Preview';
import {TaskForm} from '../TaskForm/form.js'
import '../../styles/media.scss';

//Define header label
const headers = [
    {id : "task_id", label : "Task Id", align: "left", format: value => value.toLocaleString()},
    {id : "course_id", label : "Course Id", align: "center", format: value => value.toLocaleString()},
    {id : "title", label : "Course Title", align: "center", format: value => value.toLocaleString()},
    {id : "task", label : "Task", align: "center",format: value => value.toLocaleString()},
    {id : "start", label : "Start Date", align: "center",format: value => value.toLocaleString()},
    {id : "due", label : "Due Date", align: "center",format: value => value.toLocaleString()},
    {id : "action", label : "Actions", align: "center"}
]

function createData(task_id, course_id, title, task, start, due, action ) {
    return { task_id, course_id, title, task, start, due, action };
}

export default function TaskLists(props){
    const [open, setOpen] = useState(false);
    const [dialogTitle , setDialogTitle] = useState("Create Task");
    const [formData, setFormData] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState('info');
    const [alertMessage, setOpenMessage] = useState('');

    const handleClickOpenCreate = () => {
        setDialogTitle("Create Task");
        setOpen(true);
    };

    const handleClickOpenEdit = (item) => {
        setDialogTitle("Edit Task");
        setFormData(item);
        setOpen(true);
    };

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleEdit = (values) => {
        //api edit data in db
        setOpenAlert(true);
    };

    const handleRemove = () => {
        //api delete data in db
        //setOpenAlert(true);
    };

    const handleClick = (id) => {
        var url = "/dashboard/"+id;
        props.history.push(url);
    }
    //row item value for data table
    const rows = taskList.map(item =>
        createData(
            item.task_id, item.course_id, item.title, item.task, item.start_date, item.end_date, 
            <ButtonGroup variant="outlined">
                <IconButton tips="view submissions" handleClick={() => { handleClick(item.course_id)}}>
                    <PreviewIcon/>
                </IconButton>
                <IconButton tips="edit" handleClick={() => { handleClickOpenEdit(item)}}>
                    <EditIcon/>
                </IconButton>
                <IconButton tips="delete" handleClick={handleClickOpenConfirm}>
                    <DeleteIcon/>
                </IconButton>
            </ButtonGroup>
            )   //pass handleClick function to custombutton component
    );

    return(
        <Box>
            <CustomSnackbar 
                type="success" 
                message="create task successful!"
                open={openAlert}
                onClose={() => setOpenAlert(false)}/>
            <Grid container spacing={2} justify="center" direction="row">
                <Grid item xs={8} className="title-row">   
                    <h2>My Tasks:</h2>               
                </Grid>
                <Grid item xs={8} className="button-row">
                    <SubmitButton title="New Task" type="upload" onPress={()=>handleClickOpenCreate()}/>               
                </Grid>
                <Grid item xs={8}>               
                    <DynamicTables headers={headers} datas={rows}/>   
                </Grid>
            </Grid>
            <FormDialog
                title={dialogTitle}
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleEdit}
            >
                <TaskForm data={formData}/>
            </FormDialog>
            <ConfirmDialog
                title="Delete Data?"
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={handleRemove}
            >
                Are you sure you want to delete this Data?
            </ConfirmDialog>
        </Box>
    )
}

