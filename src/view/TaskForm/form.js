import React, { useState } from 'react';
import {
    Box,
    TextField,
    Grid,
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { Controller, useForm } from "react-hook-form";
import { MuiPickersUtilsProvider,DateTimePicker } from "@material-ui/pickers";

export function TaskForm() {
    const { control, handleSubmit } = useForm({
        value : ""
    });
    const [selectedDate, handleDateChange] = useState(new Date());
    const onSubmit = (values) => {
        console.log(JSON.stringify(values));
        //post to backend
    }

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
                                variant="outlined" />
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
                                variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}> 
                        <Controller
                            control={control}
                            name="start_date"
                            render={({ field }) => (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker 
                                        {...field}
                                        label="Start Date"
                                        inputVariant="outlined"
                                        fullWidth
                                        value={selectedDate}
                                        onChange={handleDateChange}
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
                                    <DateTimePicker 
                                        {...field}
                                        label="End Date"
                                        inputVariant="outlined"
                                        fullWidth
                                        value={selectedDate}
                                        onChange={handleDateChange}
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

