import React, {useState, useEffect,useCallback} from 'react';
import {Container,Grid,Box,makeStyles} from '@material-ui/core';
import {DynamicBox,Canvas,CustomDialog} from '../../components/export';
import AppConfig from '../../util/AppConfig.js';
import {get,post} from '../../util/HttpRequest';
import '../../styles/media.scss';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      textAlign : 'left',
    }
  }))


export default function MatchingReport(props){

    const classes = useStyles();
    const [image, setImage] =  useState([]);
    const [similarityData, setSimilarityData] =  useState([]);
    const [sourceData, setSourceData] =  useState([]);
    const [open, setOpen] = useState(false);
    const [popoutCanvas, setPopoutCanvas] = useState([]);
    const [popout , setPopout] = useState(false);  
    const pids = props.location.state.pageIds;
    const USER_TOKEN = AppConfig.getToken()
    const AuthStr = 'Bearer '.concat(USER_TOKEN); 
    let counter = 0;    //counter for number in bounding

    useEffect(async () => {
        fetchData();
    },[]);

    const fetchData = () => {
        getImage();
        getSimilarityContent();
    }

    const getImage = async() => {
        post(AppConfig.getAPI('getPages'),{data:pids},{Authorization: AuthStr}).then(resp =>{
            if(resp != undefined && resp.code === 0){             
                setImage(resp.data);
            }else{
                AppConfig.refreshToken();
            }
        })
    }

    const getSimilarityContent = async() => {
        post(AppConfig.getAPI('getContentsPids'),{data:pids},{Authorization: AuthStr}).then(resp =>{
            if(resp != undefined && resp.code === 0){             
                setSimilarityData(resp.data);
                getSourceContent(resp.data);
            }else{
                AppConfig.refreshToken();
            }
        });
        
    }
    
    //additional information in right table
    const getSourceContent = (datas) => {
        let cids = datas.map(data => data.origin);
        post(AppConfig.getAPI('getContents'),{data:cids},{Authorization: AuthStr}).then(resp =>{
            if(resp !== undefined && resp.code === 0){    
                console.log(resp.data);
                setSourceData(resp.data);
            }
        })
    }

    const handlePopOutData = useCallback((origin) => {
        setPopout(true);
        getPopOutContent(origin);
    })

    async function getPopOutContent(origin){
        //origin is content ids array of the contents of another page      
        post(AppConfig.getAPI('getContents'),{data:origin},{Authorization: AuthStr}).then(resp =>{
            if(resp !== undefined && resp.code === 0){             
                let popoutData = resp.data;
                let popoutImg = [];
                getPopOutImage(popoutData).then(res =>{
                    popoutImg = res;
                    createPopOutContent(popoutImg,popoutData);
                });      
            }
        });
    }

    async function getPopOutImage(popoutData){
       
        if(popoutData === undefined || !Array.isArray(popoutData)) return;
        let pids = popoutData.map(content => content.page_id_FK);
        return new Promise ((resolve, reject) =>{
            post(AppConfig.getAPI('getPages'),{data:pids},{Authorization: AuthStr}).then(resp =>{
                if(resp != undefined && resp.code == 0){             
                    resolve(resp.data);
                }else{
                    reject(false);
                }
            })
        })
    }


    const createPopOutContent = (popoutImg,popoutData) =>{
        if(popoutData === undefined || popoutImg === undefined || popoutImg.length === 0 || popoutData.length === 0) return;
        let popOutContent = popoutImg.map((img, index) => {
            let boundedBoxData = [];
            let exist = false;
            for(var i=0; i<index; i++){
                exist = popoutImg[i].page_name === img.page_name;
            }
            popoutData.map(data =>{
                 if(img.page_id == data.page_id_FK){
                     boundedBoxData.push(data);
                 }
             })
             if(!exist) return <Canvas image={img.base64img} data={boundedBoxData} isPopOut={true} pname={img.page_name}/>
        }) 
        setPopoutCanvas(popOutContent);
        setOpen(true);
    }

    const closePopOut = () =>{
        setPopout(false);
        setOpen(false);
        setPopoutCanvas([]);
    }

    return(
        <Box className="whole-container">
            <Container className={classes.root}>   
                <Grid container spacing={3}>
                    <Grid item xs={7} spacing={2}>
                        {
                            image.map(img => {
                                let boundedBoxData = [];
                                similarityData.map(data =>{
                                        if(img.page_id === data.page_id_FK){
                                            counter++;
                                            data["counter"] = counter;
                                            boundedBoxData.push(data);
                                        }
                                    })
                                    return <Canvas image={img.base64img} data={boundedBoxData} isPopOut={false} pname={img.page_name} popOutElement={handlePopOutData}/>
                            }) 
                        }
                    </Grid>
                    <Grid item xs={5}>
                        <DynamicBox datas={similarityData} sourceDatas={sourceData} popOutElement={handlePopOutData}/>
                    </Grid>
                </Grid>
            </Container>`  
            {popout && <CustomDialog
                    open={open}
                    onClose={() => closePopOut()}
                    content = {popoutCanvas}
            />}
        </Box>       
    )
    
}

