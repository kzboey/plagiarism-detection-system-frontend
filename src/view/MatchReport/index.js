import React, {useState, useEffect} from 'react'
import sample3 from '../../resources/chancheukkin_LATE_146111_6570615_IMG_20201022_151343.png'; // Tell webpack this JS file uses this image
import {Container,Grid,Box,makeStyles} from '@material-ui/core';
import DynamicBox from '../../components/DynamicBox'; 
import Image from 'material-ui-image'
import AppConfig from '../../util/AppConfig.js';
import {get,post} from '../../util/HttpRequest'
import '../../styles/media.scss';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      textAlign : 'left'
    }
  }))

export default function MatchingReport(props){

    const classes = useStyles();
    const [data, setData] =  useState([]);
    const pids = props.location.state.pageIds;
    const USER_TOKEN = AppConfig.getToken()
    const AuthStr = 'Bearer '.concat(USER_TOKEN); 

    useEffect(async () => {
        fetchData();
    },[data.length]);

    const fetchData = () => {
        post(AppConfig.getAPI('contents'),pids,{Authorization: AuthStr}).then(resp =>{
            if(resp != undefined && resp.code == 0){             
                console.log("fetch contents succeed");
                setData(resp.data);
            }else{
                AppConfig.refreshToken();
                setData([]);
            }
        })  
    }

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

