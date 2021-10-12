import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Chip} from '@material-ui/core';
import Breadcrumbs  from 'react-router-dynamic-breadcrumbs';  
import '../styles/media.scss';

  export default function Navigation(props){
    const routesList = props.appRoutes;

    return (
        <Breadcrumbs mappedRoutes={routesList} 
          WrapperComponent={(props) =>
            <ul className="breadcrumb">{props.children}</ul>}
          ActiveLinkComponent={(props) =>
            <li className="breadcrumb-item active" >{props.children}</li>}
          LinkComponent={(props) =>
            <li className="breadcrumb-item">{props.children}</li>
          } />
    )
  }