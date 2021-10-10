import React from 'react'
import {TaskForm} from './form.js'
import {makeStyles,Grid,Paper,Typography,Card,CardHeader} from "@material-ui/core";
import {SubmitButton} from '../../components/export'

const useStyle = makeStyles((theme) => ({
    padding: {
      padding: theme.spacing(3),
    },
    cardTitle : {
        display : 'inline-block',
        paddingLeft : 0
    }
}))

export default function CreateTaskForm(){
    const classes = useStyle()

    return(
        <Grid container justify="center" direction="row">
            <Grid item md={8} >
                <Card className={classes.padding}>
                    <CardHeader title="CREATE TASK" className={classes.cardTitle}></CardHeader>
                    <Grid item>
                        <TaskForm/>
                    </Grid>
                    <Grid item>
                        <SubmitButton title="Submit" type="submit" form="task-form"/>
                    </Grid>
                </Card>     
            </Grid>     
        </Grid> 
    )
}