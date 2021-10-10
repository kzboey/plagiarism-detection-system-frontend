import React from 'react';
import {Button,makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    buttonBlock : {
        margin : '0.2rem',
        borderRadius: '10px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0)',
        '&:hover' : {
            backgroundColor:'#1a0387',
            transition: 'width 2s',
          }
      },
      input : {
          display : 'none'
      }
}))

export const SubmitButton = props =>{
    const classes = useStyles();
    const {title,type,onPress,...other} = props;
    
    return(
        <Button
            color="primary"
            size="medium"
            variant="contained"
            className={classes.buttonBlock}
            type={type}
            onClick={onPress}
            {...other}>
            {title}
        </Button>
    )
}

export const ConfirmButton = props => {
    const classes = useStyles();
    const {title,type,onPress,...other} = props;
    
    return(
        <Button
            color="primary"
            size="medium"
            variant="contained"
            component="span"
            className={classes.buttonBlock}
            type="button"
            onClick={onPress}
            {...other}>
            {title}
        </Button>
    )
}

export const UploadButton = props =>{
    const {title,type,onPress,...other} = props;
    return (
        <div style={{ display: 'inline' }}>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="uploadButton"
            />
            <label htmlFor="uploadButton">
                <Button title={title} type={type} onClick={onPress} {...other}/>
            </label>
        </div>
    )
}
