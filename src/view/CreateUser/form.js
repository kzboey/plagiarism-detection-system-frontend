import React, { useState } from 'react';
import {
    Box,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import AppConfig from '../../util/AppConfig.js';
import {get,post,patch,deletes} from '../../util/HttpRequest'


export function UserForm(props){
    const {data,type,childData} = props;
    const { control, handleSubmit } = useForm({});
    const [value, setValue] = useState('');

    function getValues(current,previous){
        let value = ""
        if(type == 'edit'){
            value = current !== undefined ? current : previous; //means field not edited
        }else{
            value = current !== undefined ? current : ''; //means field not edited
        }

        return value;
    }

    const onSubmit = (values) => {
        let formdata = {};
        values.right = value;
        console.log(JSON.stringify(values));
        formdata.eid = getValues(values.eid,data.eid);
        formdata.password =  getValues(values.password,data.password);
        formdata.last_name = getValues(values.last_name,data.last_name);
        formdata.first_name = getValues(values.first_name,data.first_name);
        formdata.other_name = getValues(values.other_name,data.other_name);
        formdata.email = getValues(values.email,data.email);
        formdata.phone = getValues(values.phone,data.phone);
        formdata.organization = getValues(values.organization,data.organization);
        formdata.right = getValues(values.right,data.right);
        childData(formdata,type);
    }

    return (
        <Box>
            <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="eid"
                            render={({ field }) => (
                                <TextField 
                                    {...field} 
                                    label="Username"
                                    type="text"
                                    placeholder="eid"
                                    fullWidth
                                    name="eid"
                                    variant="outlined"
                                    disabled = {type == 'edit' ? true : false}
                                    defaultValue = {data !== undefined && type == 'edit' ? data.eid : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="Password" 
                                type="text"
                                placeholder="password"
                                fullWidth
                                name="password"
                                variant="outlined"
                                disabled = {type == 'edit' ? true : false}
                                defaultValue = {data !== undefined && type == 'edit'? data.password : ""} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="last_name"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="Last Name" 
                                type="text"
                                placeholder="last_name"
                                fullWidth
                                name="last_name"
                                variant="outlined"
                                defaultValue = {data !== undefined && type == 'edit'? data.last_name : ""} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="first_name"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="First Name" 
                                type="text"
                                placeholder="first_name"
                                fullWidth
                                name="first_name"
                                variant="outlined"
                                defaultValue = {data !== undefined && type == 'edit'? data.first_name : ""} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="other_name"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="Other Name" 
                                type="text"
                                placeholder="other_name"
                                fullWidth
                                name="other_name"
                                variant="outlined"
                                defaultValue = {data !== undefined && type == 'edit'? data.other_name : ""} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="Email" 
                                type="text"
                                placeholder="email"
                                fullWidth
                                name="email"
                                variant="outlined"
                                defaultValue = {data !== undefined && type == 'edit'? data.email : ""} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="Phone" 
                                type="text"
                                placeholder="phone"
                                fullWidth
                                name="phone"
                                variant="outlined"
                                defaultValue = {data !== undefined && type == 'edit'? data.phone : ""} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="organization"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="Organization" 
                                type="text"
                                placeholder="organization"
                                fullWidth
                                name="organization"
                                variant="outlined"
                                defaultValue = {data !== undefined && type == 'edit'? data.organization : ''} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <label>User Rights:</label>
                        <Controller
                            name="right"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup onChange={e => setValue(e.target.value)}>
                                    <FormControlLabel
                                        value="admin"
                                        control={<Radio />}
                                        label="admin"
                                    />
                                    <FormControlLabel 
                                        value="user" 
                                        control={<Radio />} 
                                        label="Normal User" />
                              </RadioGroup>
                            )}   
                        />
                    </Grid>
                    
                </Grid>
            </form>
        </Box>
    )
}