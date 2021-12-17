import React, {useState, useEffect,useCallback} from 'react'
import {makeStyles,Box,Grid,CardHeader,Card} from '@material-ui/core';
import AppConfig from '../../util/AppConfig.js';
import {UserForm} from './form.js'
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

export default function CreateUser(props){
    const classes = useStyle()

    return(
        <Grid container justify="center" direction="row">
            <Grid item md={8} >
                <Card className={classes.padding}>
                    <CardHeader title="CREATE USER" className={classes.cardTitle}></CardHeader>
                    <Grid item>
                        <UserForm/>
                    </Grid>
                    <Grid item >
                        <br/>
                        <SubmitButton title="Submit" type="submit" form="task-form"/>
                    </Grid>
                </Card>     
            </Grid>     
        </Grid> 
    )
}