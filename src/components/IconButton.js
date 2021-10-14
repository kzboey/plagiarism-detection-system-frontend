import { makeStyles } from "@material-ui/core/styles";
import { IconButton as MUIconButton, Tooltip } from "@material-ui/core";
import Fade from '@mui/material/Fade';

const useStyles = makeStyles(theme => ({
    iconButton : {
    "&:hover": {
        backgroundColor: "#A9A9A9"
        }
    }
}))

export default function IconButton(props){
    const classes = useStyles();
    const {tips,handleClick,children,...other} = props;
   
    return(
        <Tooltip TransitionComponent={Fade} title={tips}>
            <MUIconButton onClick={handleClick} className={classes.iconButton} {...other}>
                {children}
            </MUIconButton>
        </Tooltip>
    )
}
