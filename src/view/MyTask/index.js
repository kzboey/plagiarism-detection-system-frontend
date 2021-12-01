import React, {useState, useEffect,useCallback} from 'react'
import {Box,Grid} from '@material-ui/core';
import {DynamicTables,IconButton, ConfirmDialog,FormDialog,SubmitButton,CustomSnackbar} from '../../components/export'
import taskList from '../../resources/TaskList.json';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import EditIcon from "@material-ui/icons/Edit";                                 
import DeleteIcon from "@material-ui/icons/Delete";
import PreviewIcon from '@mui/icons-material/Preview';
import {TaskForm} from '../TaskForm/form.js'
import AppConfig from '../../util/AppConfig.js';
import {get,post,patch,deletes} from '../../util/HttpRequest'
import '../../styles/media.scss';

// const USER_TOKEN = AppConfig.getToken()
// const AuthStr = 'Bearer '.concat(USER_TOKEN); 

//Define header label
const headers = [
    {id : "task_id", label : "Task Id", align: "left", format: value => value.toLocaleString()},
    {id : "course_id", label : "Course Id", align: "center", format: value => value.toLocaleString()},
    {id : "title", label : "Course Title", align: "center", format: value => value.toLocaleString()},
    {id : "task_name", label : "Task", align: "center",format: value => value.toLocaleString()},
    {id : "start", label : "Start Date", align: "center",format: value => value.toLocaleString()},
    {id : "due", label : "Due Date", align: "center",format: value => value.toLocaleString()},
    {id : "action", label : "Actions", align: "center"}
]

function createData(task_id, course_id, title, task_name, start, due, action ) {
    return { task_id, course_id, title, task_name, start, due, action };
}

export default function TaskLists(props){
    const [open, setOpen] = useState(false);
    const [dialogTitle , setDialogTitle] = useState("Create Task");
    const [type , setType] = useState("");
    const [formData, setFormData] = useState("");
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState('info');
    const [alertMessage, setOpenMessage] = useState('');
    const [data, setData] =  useState([]);
    const [deleteId, setDeleteId] =  useState('');

    useEffect(async () => {
        if(data.length && data.length==0){
            return;
        }
        fetchData();
    },[data.length]);

    const fetchData = () => {
        let USER_TOKEN = AppConfig.getToken()
        let AuthStr = 'Bearer '.concat(USER_TOKEN); 
        get(AppConfig.getAPI('tasks'),{Authorization: AuthStr}).then(resp => {
            if(resp != undefined && resp.code == 0){               
                setData(resp.data);
            }else{
                AppConfig.refreshToken();
                setData([]);
            }
        }); 
    }

    const handleClickOpenCreate = () => {
        setDialogTitle("Create Task");
        setType("create");
        setOpen(true);
    };

    const handleClickOpenEdit = (item) => {
        setDialogTitle("Edit Task");
        setType("edit");
        setFormData(item);
        setOpen(true);
    };

    const handleClickOpenConfirmDelete = (taskId) => {
        console.log('task id: '+taskId);
        setDeleteId(taskId);
        setOpenConfirmDelete(true);
    };

    const handleEdit = () => {
        setOpenAlert(true); 
    };

    const handleRemove = () => {
        //api delete data in db
        if(deleteId != ''){
            let USER_TOKEN = AppConfig.getToken()
            let AuthStr = 'Bearer '.concat(USER_TOKEN); 
            let url = AppConfig.getAPI('task') + deleteId;
            deletes(url,{Authorization: AuthStr}).then(resp => {
                if(resp != undefined && resp.code == 0){               
                    fetchData();
                    setOpenAlert(true);
                }else{
                    setOpenAlert(true);
                }
            }); 
        }
    };

    const handleClick = (item) => {
        let nxtUrl = item.task_id + '/?course_id='+item.course_id + '&task_name_id='+item.task_name;
        //let nxtUrl = item.task_id;
        let url = "/dashboard/"+nxtUrl;
        props.history.push(url);
    }

    const handleFormData = useCallback((childData,type) => {
        console.log("childData"+JSON.stringify(childData));
        let USER_TOKEN = AppConfig.getToken()
        let AuthStr = 'Bearer '.concat(USER_TOKEN); 
        if(type == 'create'){
            post(AppConfig.getAPI('tasks'),childData,{Authorization: AuthStr}).then(resp =>{
                if(resp != undefined && resp.code == 0){
                    fetchData();
                    setFormData("");
                }
            })    
        }else if(type == 'edit'){
            let url = AppConfig.getAPI('task') + childData.task_id;
            patch(url,childData,{Authorization: AuthStr}).then(resp =>{
                if(resp != undefined && resp.code == 0){
                    fetchData();
                    setFormData("");
                }
            }) 
        }
      }, []);

    const rows = data.map(item =>
        createData(
            item.task_id, item.course_id, item.course_title, item.task_name, item.start_date, item.due_date, 
            <ButtonGroup variant="outlined">
                <IconButton tips="view submissions" handleClick={() => { handleClick(item)}}>
                    <PreviewIcon/>
                </IconButton>
                <IconButton tips="edit" handleClick={() => { handleClickOpenEdit(item)}} >
                    <EditIcon/>
                </IconButton>
                <IconButton tips="delete" handleClick={() => handleClickOpenConfirmDelete(item.task_id)}>
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
                <TaskForm data={formData} type={type} childData={handleFormData}/>
            </FormDialog>
            <ConfirmDialog
                title="Delete Data?"
                open={openConfirmDelete}
                onClose={() => setOpenConfirmDelete(false)}
                onConfirm={handleRemove}
            >
                Are you sure you want to delete this Data?
            </ConfirmDialog>
        </Box>
    )
}

