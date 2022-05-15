import React, {useState, useEffect,useCallback} from 'react';
import { Paper, Dialog, Button, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dialogBox: {
    maxWidth : '500rem',
    maxHeight: '100rem'
  },
  root: {
    display: 'inline-flex',
  },
  imageBox: {
    width: '100%',
    height: '100%',
    padding: '5px'
  }
}))

export default function CustomDialog(props) {
  const classes = useStyles();
  const  { open, onClose, content, content2, children } = props;
  const [leftContent, setLeftContent] = useState();
  const [rightContent, setRightContent] = useState();

  const handleClose = () => {
    onClose();
  };

    //Initialization
    useEffect(() => {
        setLeftContent(content);
        setRightContent(content2);
    }, [content, content2])


  return (
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'lg'}>
          <Container className={classes.root}>  
            <Paper className={classes.imageBox} elevation={5}>
              {leftContent}   
            </Paper>
            <Paper className={classes.imageBox} elevation={5}>
              {rightContent}   
            </Paper>
          </Container>
          <Button onClick={handleClose} color="primary">
                    CLOSE
          </Button>
      </Dialog>
  )
}
