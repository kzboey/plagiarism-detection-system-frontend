import React from 'react';
import {makeStyles,AppBar,Drawer,Toolbar,Typography,Divider,IconButton,Box,Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import '../styles/media.scss';
import myavatar from '../resources/avatar.jpg'; // Tell webpack this JS file uses this image

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    sideNav: {
        width: '15rem',      
    },
    link: {
      color: 'black',
      textDecoration: 'none',
    },
    rightToolbar: {
        display : "flex",
        marginLeft: "auto",
        marginRight: theme.spacing(3),
     }
}))


export default function NavBar(props) {
    const classes = useStyles();
    const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);

    const toggleSideBar = () => {
        setIsSideBarOpen(true);
    }

    const closeSideBar = () => {
        setIsSideBarOpen(false);
    }

    return(
        <div>
            <AppBar position="static"> 
                <Toolbar>
                    <IconButton onClick={toggleSideBar}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        {props.title}
                    </Typography>
                    
                    <section className={classes.rightToolbar}>
                        <Avatar alt="Avatar" src={myavatar}/>
                        <span  className="pd-5">New User</span>
                        <IconButton color="inherit" aria-label="Save">
                            <LogoutIcon />
                        </IconButton>
                    </section>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={isSideBarOpen}
                onClose={closeSideBar}>
                <Box className={classes.sideNav} >
                <List>
                    <Link to='/home' className={classes.link}>
                        <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary='My Submission' />
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to='/report' className={classes.link}>
                        <ListItem>
                        <ListItemIcon>
                            <PermContactCalendarIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Report' />
                        </ListItem>
                    </Link>
                </List>
                </Box>
            </Drawer>   
        </div>
    )
}
