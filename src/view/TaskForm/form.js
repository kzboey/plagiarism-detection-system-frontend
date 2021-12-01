import React, { useState } from 'react';
import {
    Box,
    TextField,
    Grid,
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { Controller, useForm } from "react-hook-form";
import { MuiPickersUtilsProvider,DateTimePicker as MuiDateTimePicker } from "@material-ui/pickers";
import {formatDate} from '../../util/DateUtil'

export function TaskForm(props) {
    const {data,type,childData} = props;
    const { control, handleSubmit } = useForm({});
    const [startDate, setStartDate] = useState(data != undefined ? new Date(data.start_date) : formatDate(new Date()));
    const [endDate, setEndDate] = useState(data != undefined ? new Date(data.due_date) : formatDate(new Date()));

    const onSubmit = (values) => {
        let formdata = {};
        // formdata.course_id = values.course_id === undefined || values.id === "" ? values.id : "";
        // formdata.course_title = values.title === undefined || values.title === "" ? values.title : "";
        // formdata.task_name = values.task_name === undefined || values.task === ""? values.task : "";
        if(type == 'edit'){formdata.task_id = data.task_id};
        formdata.course_id = values.id !== undefined ? values.id : data.course_id;
        formdata.course_title = values.title !== undefined ? values.title : data.course_title;
        formdata.task_name = values.task !== undefined ? values.task : data.task_name;
        formdata.start_date = values.start_date === undefined || values.start_date === "" ? formatDate(startDate) : "";
        formdata.due_date = values.end_date === undefined || values.end_date === "" ? formatDate(endDate) : "";
        console.log(JSON.stringify(formdata));
        childData(formdata,type);
    }

    const handleStartDateChange = (newStartDate) => {
        setStartDate(newStartDate);
    };

    const handleEndDateChange = (newEndDate) => {
        setEndDate(newEndDate);
    };

    return (
        <Box>
            <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="id"
                            render={({ field }) => (
                                <TextField 
                                    {...field} 
                                    label="Course Id"
                                    type="text"
                                    placeholder="Course Id"
                                    fullWidth
                                    name="id"
                                    variant="outlined"
                                    defaultValue = {data !== undefined && type == 'edit' ? data.course_id : ""}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="Course Title " 
                                type="text"
                                placeholder="Course Id"
                                fullWidth
                                name="title"
                                variant="outlined"
                                defaultValue = {data !== undefined && type == 'edit'? data.course_title : ""} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="task"
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                label="Task " 
                                type="text"
                                placeholder="Task"
                                fullWidth
                                name="task"
                                helperText="eg: midterm, final"
                                variant="outlined" 
                                defaultValue = {data !== undefined && type == 'edit'? data.task_name : ""}/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="start_date"
                            render={({ field }) => (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <MuiDateTimePicker 
                                        {...field}
                                        label="Start Date"
                                        inputVariant="outlined"
                                        fullWidth
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        format='yyyy-MM-dd HH:mm:ss'
                                         />
                                </MuiPickersUtilsProvider>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="end_date"
                            render={({ field }) => (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <MuiDateTimePicker 
                                        {...field}
                                        label="End Date"
                                        inputVariant="outlined"
                                        fullWidth
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        format='yyyy-MM-dd HH:mm:ss'
                                         />
                                </MuiPickersUtilsProvider>
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

