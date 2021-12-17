import * as React from 'react';
import { Paper, Dialog,DialogContent,Button } from '@material-ui/core';
import Image from 'material-ui-image'


export default function CustomDialog(props) {
  const  { open, onClose, content, children } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <Paper  style={{ width: '25rem'}}>
          {content}   
        </Paper>
        <Button onClick={handleClose} color="primary">
                  CLOSE
        </Button>
    </Dialog>
  )
}
