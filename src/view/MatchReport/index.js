import React, {useState, useEffect} from 'react'
import sample3 from '../../resources/chancheukkin_LATE_146111_6570615_IMG_20201022_151343.png'; // Tell webpack this JS file uses this image
import sample2 from '../../resources/sample2.png'; // Tell webpack this JS file uses this image
import {Container,Grid,Box,makeStyles} from '@material-ui/core';
import {DynamicBox,Canvas} from '../../components/export'
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
    const [image, setImage] =  useState([]);
    const [imageData, setImageData] =  useState([]);
    const [boxData, setBoxData] =  useState([]);
    const pids = props.location.state.pageIds;
    const USER_TOKEN = AppConfig.getToken()
    const AuthStr = 'Bearer '.concat(USER_TOKEN); 
    
    useEffect(async () => {
        fetchData();

    },[image.length]);

    const fetchData = () => {
        getImage();
        getImageContent();
        getDynamicBoxContent();
    }

    const getImage = () => {
        post(AppConfig.getAPI('getPages'),{data:pids},{Authorization: AuthStr}).then(resp =>{
            if(resp != undefined && resp.code == 0){             
                console.log("fetch images succeed");
                setImage(resp.data);
            }
        })
    }

    const getImageContent = () => {
        post(AppConfig.getAPI('contents'),{data:pids},{Authorization: AuthStr}).then(resp =>{
            if(resp != undefined && resp.code == 0){             
                console.log("fetch contents succeed");
                setImageData(resp.data);
            }
        });
    }

    const getDynamicBoxContent = () => {
        post(AppConfig.getAPI('getBoxContents'),{data:pids},{Authorization: AuthStr}).then(resp =>{
            if(resp != undefined && resp.code == 0){             
                console.log("fetch contents succeed");
                setBoxData(resp.data);
            }
        });
    }

    return(
        <Box className="whole-container">
            <Container className={classes.root}>   
                <Grid container spacing={3}>
                    <Grid item xs={7} spacing={2}>
                    {/* <img src="data:image/png;base64,"/> */}
                        {
                           image.map(img => {
                               let boundedBoxData = {};
                                Object.keys(imageData).map(key =>{
                                    if(key == img.page_id){
                                        boundedBoxData = imageData[key];
                                    }
                                })
                                return <Canvas image={img.base64img} data={boundedBoxData}/>
                           }) 
                        }
                    </Grid>
                    <Grid item xs={5}>
                        <DynamicBox datas={boxData}/>
                    </Grid>
                </Grid>
            </Container>`  
        </Box>       
    )
    
}

