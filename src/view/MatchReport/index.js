import React, { Component } from 'react'
import sample2 from '../../resources/sample2.png'; // Tell webpack this JS file uses this image
import sample3 from '../../resources/sample3.jpeg'; // Tell webpack this JS file uses this image
import {Container,Grid,Box,makeStyles} from '@material-ui/core';
import DynamicBox from '../../components/DynamicBox'; 
import { withStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image'
import '../../styles/media.scss';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      textAlign : 'left'
    }
  }))

export default function MatchingReport(props){
    
    const classes = useStyles();

    return(
        <Box className="whole-container">
            <Container className={classes.root}>   
                <Grid container spacing={3}>
                    <Grid item xs={7} spacing={2}>
                        <Image src={sample3}/>
                    </Grid>
                    <Grid item xs={5}>
                        <DynamicBox />
                    </Grid>
                </Grid>
            </Container>`  
        </Box>       
    )
    
}

