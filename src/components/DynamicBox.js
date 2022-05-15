import React, {useState,useEffect} from 'react';
import '../styles/media.scss';
import {Container,Typography,Divider,Box,makeStyles} from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    matchlist: {
        border : '1px solid #06080a' ,
        padding : '0px'
    },
    matchListItem1: {
        color : 'red'
    },
    matchListItem2: {
        color : 'blue'
    },
    listIndex: {
        padding : '10px'
    },
    matchListItemText: {
        wordBreak: 'break-word',
        padding: '0px 0px 0px 10px',
    },
    listSimilarity: {
        //padding : '10px',
        position: 'relative',
        bottom: 20,
        color : 'black'
    },
    matchOverall:{
        width: '100%',
        textAlign : 'center',
        '& p' : {
            color : '#09148f',
            padding : '0px',
            fontSize : '2.5rem',
            margin : '1rem'
        },
        '& span' : {
            backgroundColor : '#CCCCCC',
            padding : '10px'
            
        }
    },
    sourcePageText:{
        fontWeight: 'bold',
        margin : '0px',
        color: '#404040',
    },
    sourceText:{
        fontWeight: '500',
        margin : '0px',
        color: '#404040',
    }
  }))

  export default function DynamicBox(props){
    const classes = useStyles();
    const {datas, sourceDatas, popOutElement, ...rest} = props;
    const [rows, setRows] = useState(datas);

    useEffect(() => { setRows(datas)}, [datas] )

    const getListClassName = (source) =>{
        let className = '';
        switch(source){
            case 'sentence':
                className = classes.matchListItem1;
                break;
            case 'equation':
                className = classes.matchListItem2;
                break;    
        }
        return className;
    }

    const handleClickOpen = (content_id, origin) => {
        callbackElement(content_id, origin);
    };
    
    const getOriginPage = (origin) => {
        if(sourceDatas === undefined || sourceDatas === null || sourceDatas.length === 0) return;
        let data = sourceDatas.find(data => data.content_id === origin);
        return data.page_name;
    };

    const getOriginData = (origin) => {
        if(sourceDatas === undefined || sourceDatas === null || sourceDatas.length === 0) return;
        let data = sourceDatas.find(data => data.content_id === origin);
        return data.content_value;
    };

    const getSimilarityPercentage = (score) => {
        if(score === undefined) return;
        return Math.trunc(100*(Math.round(score * 100) / 100)) + "%";
    };

    const callbackElement = (content_id, origin) =>{
        const data = [origin];
        popOutElement([content_id], data);
    }

    return(
        <Container>
            <Typography variant="h2">Match Overview</Typography>  
            <List className={classes.matchlist}> 
            <Box className={classes.matchOverall}>
                <p>0%</p>
                <span>{rows.length} matches</span> 
            </Box> 
            <Divider/>
            {rows.map((row,index) => (
                <ListItem divider className={getListClassName(row.content_type)} onClick={() => handleClickOpen(row.content_id, row.origin)}>
                    <Typography variant="h3" className={classes.listIndex}>
                        {++index}
                    </Typography>  
                    <ListItemText
                        primary={<Typography style={{ fontSize: '1.0rem', fontWeight : 'bold' }}>{row.content_value}</Typography>} 
                        secondary={<div><p className={classes.sourcePageText}>{getOriginPage(row.origin)}</p><p className={classes.sourceText}>{getOriginData(row.origin)}</p></div>} 
                        className={classes.matchListItemText}/> 
                    <Typography variant="h4" className={classes.listSimilarity}>
                        {getSimilarityPercentage(row.similarity)}
                    </Typography>  
                </ListItem>            
            ))}
            </List>
        </Container>         
    )
}

