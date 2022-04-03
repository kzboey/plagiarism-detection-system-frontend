import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import {Divider} from '@material-ui/core'

export default function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'block', alignItems: 'center', justifyContent: 'center'}}>
        <Box sx={{ p: 2, display: 'block', alignItems: 'center', justifyContent: 'center', width : '100px', padding: '0px', textAlign: 'center' }}>
            <CircularProgress variant="determinate"  size="3.5rem" {...props} />
        </Box>
        <Box
            sx={{
            top: 20,
            left: 1,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            <Box sx={{ p: 2, display: 'block', alignItems: 'center', justifyContent: 'center', width : '100px', padding: '0px', textAlign: 'center' }}>
                <Typography variant="p" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
        {   props.success ? 
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <Typography variant="p" component="span" color="green">
                    <DoneIcon/> 
                </Typography>
                <Typography variant="p" component="span" color="green">
                    Success
                </Typography>  
            </Box>
            :
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <Typography variant="p" component="span" color="primary" >
                    Submitting...
                </Typography>  
            </Box>
        }
      
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
  success: PropTypes.bool.isRequired,
};
