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
    const {data} = props;
    const { control, handleSubmit } = useForm({});
    const [startDate, setStartDate] = useState(data != undefined ? new Date(data.start_date) : formatDate(new Date()));
    const [endDate, setEndDate] = useState(data != undefined ? new Date(data.end_date) : formatDate(new Date()));

    const onSubmit = (values) => {
        values.course_id = values.course_id !== undefined ? values.course_id : "";
        values.title = values.title !== undefined ? values.title : "";
        values.task = values.task !== undefined ? values.task : "";
        values.start_date = values.start_date !== undefined ? values.start_date : "";
        values.end_date = values.end_date !== undefined ? values.end_date : "";
        console.log(JSON.stringify(values));
        //post to backend
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
                                    defaultValue = {data !== undefined ? data.course_id : ""}
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
                                defaultValue = {data !== undefined ? data.title : ""} />
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
                                defaultValue = {data !== undefined ? data.task : ""}/>
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

