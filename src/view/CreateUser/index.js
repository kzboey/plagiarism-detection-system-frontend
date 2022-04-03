import React, {useState, useEffect,useCallback} from 'react'
import {makeStyles,Box,Grid,CardHeader,Card} from '@material-ui/core';
import AppConfig from '../../util/AppConfig.js';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import EditIcon from "@material-ui/icons/Edit";                                 
import DeleteIcon from "@material-ui/icons/Delete";
import {UserForm} from './form.js'
import {DynamicTables,IconButton,ConfirmDialog,FormDialog,SubmitButton,CustomSnackbar} from '../../components/export'
import {get,post,patch,deletes} from '../../util/HttpRequest'

const useStyle = makeStyles((theme) => ({
    padding: {
      padding: theme.spacing(3),
    },
    cardTitle : {
        display : 'inline-block',
        paddingLeft : 0
    }
}))

//Define header label
const headers = [
    {id : "eid", label : "User Id", align: "left", format: value => value.toLocaleString()},
    {id : "last_name", label : "Last Name", align: "center", format: value => value.toLocaleString()},
    {id : "first_name", label : "First Name", align: "center",format: value => value.toLocaleString()},
    {id : "other_name", label : "Other Name", align: "center",format: value => value.toLocaleString()},
    {id : "email", label : "Email Address", align: "center",format: value => value.toLocaleString()},
    {id : "phone", label : "Phone", align: "center"},
    {id : "organization", label : "Organization", align: "center"},
    {id : "right", label : "Right", align: "center"},
    {id : "action", label : "Actions", align: "center"}
]

function createData(eid, last_name, first_name, other_name, email, phone, organization,right,action) {
    return { eid, last_name, first_name, other_name, email, phone, organization,right,action};
}

export default function CreateUser(props){
    const classes = useStyle()
    const [dialogTitle , setDialogTitle] = useState("Create User");
    const [open, setOpen] = useState(false);
    const [type , setType] = useState("");
    const [formData, setFormData] = useState("");
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setOpenMessage] = useState('');
    const [data, setData] =  useState([]); //table data
    const [deleteId, setDeleteId] =  useState('');

    let USER_TOKEN = AppConfig.getToken()
    let AuthStr = 'Bearer '.concat(USER_TOKEN); 

    useEffect(async () => {
        if(data.length && data.length==0){
            return;
        }
        fetchData();
    },[data.length]);

    const fetchData = () => {
        get(AppConfig.getAPI('Users'),{Authorization: AuthStr}).then(resp => {
            if(resp != undefined && resp.code == 0){               
                setData(resp.data);
            }else{
                AppConfig.refreshToken();
                setData([]);
            }
        }); 
    }

    const handleFormData = useCallback((childData,type) => {
        console.log("childData"+JSON.stringify(childData));
        if(type == 'create'){
            post(AppConfig.getAPI('Users'),childData,{Authorization: AuthStr}).then(resp =>{
                if(resp != undefined && resp.code == 0){
                    fetchData();
                    setFormData("");
                    setAlertType('success');
                    setOpenMessage('Create User successful!');
                }else{
                    setAlertType('error');
                    setOpenMessage('Create User failed!');
                }
            })    
        }else if(type == 'edit'){
            // let param = '?eid='+childData.eid;
            let url = AppConfig.getAPI('user');
            patch(url,childData,{Authorization: AuthStr}).then(resp =>{
                if(resp != undefined && resp.code == 0){
                    fetchData();
                    setFormData();
                    setAlertType('success');
                    setOpenMessage('Edit User successful!');
                }else{
                    setAlertType('error');
                    setOpenMessage('Edit User failed!');
                }
            }) 
        }
      }, []);

    const handleClickOpenCreate = () => {
        setDialogTitle("Create User");
        setType("create");
        setOpen(true);
    };

    const handleClickOpenEdit = (item) => {
        setDialogTitle("Edit User");
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
            let param = '?eid='+deleteId;
            let url = AppConfig.getAPI('user') + param;
            deletes(url,{Authorization: AuthStr}).then(resp => {
                if(resp != undefined && resp.code == 0){               
                    fetchData();
                    setAlertType('success');
                    setOpenMessage('Delete user successful!');
                    setOpenAlert(true);
                }else{
                    setAlertType('error');
                    setOpenMessage('Error deleting user!');
                    setOpenAlert(true);
                }
            }); 
        }
    };
    const rows = data.map(item =>
        createData(
            item.eid, item.last_name, item.first_name, item.other_name, item.email, item.phone, item.organization, item.right,
            <ButtonGroup variant="outlined">
                <IconButton tips="edit" handleClick={() => { handleClickOpenEdit(item)}} >
                    <EditIcon/>
                </IconButton>
                <IconButton tips="delete" handleClick={() => handleClickOpenConfirmDelete(item.eid)}>
                    <DeleteIcon/>
                </IconButton>
            </ButtonGroup>
            )   //pass handleClick function to custombutton component
    );

    return(
        <Box>
            <CustomSnackbar 
                type={alertType} 
                message={alertMessage}
                open={openAlert}
                onClose={() => setOpenAlert(false)}/>
            <Grid container spacing={2} justify="center" direction="row">
                <Grid item xs={8} className="title-row">   
                    <h2>Users Management:</h2>               
                </Grid>
                <Grid item xs={8} className="button-row">
                    <SubmitButton title="Create User" type="upload" onPress={()=>handleClickOpenCreate()}/>               
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
                <UserForm data={formData} type={type} childData={handleFormData}/>
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