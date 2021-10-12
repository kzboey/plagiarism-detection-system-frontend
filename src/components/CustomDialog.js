import * as React from 'react';
import { Paper, Dialog,DialogContent,Button } from '@material-ui/core';
import Image from 'material-ui-image'


export default function CustomDialog(props) {
  const  { open, onClose, data, children } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <Paper>
            <DialogContent>{children}</DialogContent>     
        </Paper>
        <Button onClick={handleClose} color="primary">
                  CLOSE
        </Button>
    </Dialog>
  )
}
