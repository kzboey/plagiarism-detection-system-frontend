import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import { ThroughProvider } from "react-through";

ReactDOM.render(
  <ThroughProvider>
    <App />
  </ThroughProvider>
  ,document.getElementById('root')
);


