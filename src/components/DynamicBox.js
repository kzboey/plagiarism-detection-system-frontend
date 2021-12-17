import React, {useState,useEffect} from 'react';
import {MATCHDATA } from '../resources/MatchData';
import '../styles/media.scss';
import {Container,Typography,Divider,Box,makeStyles,Button} from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import CustomDialog from './CustomDialog' 
import sample2 from '../resources/sample2.png'; // Tell webpack this JS file uses this image
import Image from 'material-ui-image'

const useStyles = makeStyles(theme => ({
    matchlist: {
        border : '1px solid #06080a' ,
        padding : '0px'
    },
    matchListItem1: {
        color : '#d90726'
    },
    matchListItem2: {
        color : '#6a056e'
    },
    matchListItem3: {
        color : '#05780b'
    },
    listIndex: {
        padding : '10px'
    },
    matchListItemText: {
        padding: '0px 0px 0px 15px',
    },
    listSimilarity: {
        padding : '10px',
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
    }
  }))

  export default function DynamicBox(props){
    const classes = useStyles();
    const {datas, ...rest} = props;
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState(datas);
    const mdata = MATCHDATA;

    useEffect(() => { setRows(datas)}, [datas] )

    const getListClassName = (source) =>{
        let className = '';
        switch(source){
            case 'Publication':
                className = classes.matchListItem1;
                break;
            case 'Student exam':
                className = classes.matchListItem2;
                break;
            case 'Internet Sources':
                className = classes.matchListItem3;
                break;       
        }
        return className;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    
    return(
        <Container>
            <Typography variant="h2">Match Overview</Typography>  
            <List className={classes.matchlist}> 
            <Box className={classes.matchOverall}>
                <p>21%</p>
                <span>{rows.length} matches</span> 
            </Box> 
            <Divider/>
            {rows.map((row,index) => (
                <ListItem divider className={getListClassName(row.origin)} onClick={handleClickOpen}>
                    <Typography variant="h3" className={classes.listIndex}>
                        {++index}
                    </Typography>  
                    <ListItemText 
                        primary={<Typography style={{ fontSize: '1.5rem', fontWeight : 'bold' }}>{row.content_value}</Typography>} 
                        secondary={row.origin} 
                        className={classes.matchListItemText}/> 
                    <Typography variant="h4" className={classes.listSimilarity}>
                        {row.similarity}
                    </Typography>  
                </ListItem>            
            ))}
            </List>
            <CustomDialog
                open={open}
                onClose={() => setOpen(false)}
                content = {<Image src={sample2}/> }
            />
        </Container>         
    )
}

