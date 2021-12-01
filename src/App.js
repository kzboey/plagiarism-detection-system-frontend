import React, { useEffect, Fragment } from 'react';
import {Box,Grid,Paper} from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import {Login} from './view/export'
import {AppBar,Navigation} from './components/export'
import routes from "./routes";

const routesList = {
  '/task': 'New Task',
  '/dashboard': 'Dashboard',
  '/dashboard/:id': ':id',
  '/dashboard/:id/:student': ':student',
}

const titles = {
  '/task': 'New Task',
  "/dashboard": "My Dashboard",
  "/dashboard/:id": "My Dashboard",
  '/dashboard/:id/:student': 'My Dashboard',
};

const App = () => {
    useEffect(() => console.log("Refresh"));

    return (
      <Box>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/login" component={Login} />
            <Fragment>
              <AppBar titles={titles}/>
              <Grid container justify="center" direction="row">
                <Grid item xs={8} spacing={2} >  
                  <Paper elevation={3} variant="elevation" rounded>
                    <Navigation appRoutes={routesList}/>  
                  </Paper>      
                </Grid>
              </Grid>
                  {routes.map(({ path, Component }, key) => (
                    <Route exact path={path} key={key} component={Component} /> 
                ))}
            </Fragment>
          </Switch>
        </Router>
      </Box>
    )
}

export default App;


