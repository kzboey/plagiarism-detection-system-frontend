import React,{useEffect,useState}  from 'react';
import {makeStyles,AppBar,Drawer,Toolbar,Typography,Divider,Box,Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import '../styles/media.scss';
import myavatar from '../resources/avatar.jpg'; // Tell webpack this JS file uses this image
import { useLocation} from "react-router-dom";
import {IconButton} from './export'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    appbackground : {
        background : 'linear-gradient(90deg,#6B203E 0%,#BF165E 100%)'
    },
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
     },
     appbarTitle: { 
        marginLeft : '2em'
     }
}))


export default function Header(props) {
    let history = useHistory();
    const classes = useStyles();
    const location = useLocation();
    const {titles} = props;
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [title, setTitle] = useState(titles["/"]);

    const toggleSideBar = () => {
        setIsSideBarOpen(true);
    }

    const closeSideBar = () => {
        setIsSideBarOpen(false);
    }

    const handleLogout = () => {
        //revoke token
        history.push("/login");
    }

    useEffect(() => {
        location.pathname.includes('dashboard') ? setTitle("My Dashboard") : setTitle("Plagiarism Detection System");
     }, [location.pathname]);

    return(
        <div>
            <AppBar position="static" className={classes.appbackground}> 
                <Toolbar>
                   
                    {/* <IconButton onClick={toggleSideBar}>
                        <MenuIcon/>
                    </IconButton> */}

                    <Typography variant="title" color="inherit" className={classes.appbarTitle}>
                        Plagiarism Detection System
                    </Typography>
                    
                    <section className={classes.rightToolbar}>
                        <Avatar alt="Avatar" src={myavatar}/>
                        <span  className="pd-5">New User</span>
                        <IconButton tips="Logout" color="inherit" aria-label="Save" handleClick={handleLogout}>
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
                    <Link to='/task' className={classes.link}>
                        <ListItem>
                        <ListItemIcon>
                            <AddIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Create Task' />
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to='/dashboard' className={classes.link}>
                        <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary='My Dashboard' />
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to='/report' className={classes.link}>
                        <ListItem>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Settings' />
                        </ListItem>
                    </Link>
                </List>
                </Box>
            </Drawer>   
        </div>
    )
}
