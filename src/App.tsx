import React from "react";
import { Button } from "@material-ui/core";
import "./App.css";
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import {Footer} from "./Components/Footer";
import Header from "./Components/Header";
import Shopping from "./Components/Shopping";
import Shopping2 from "./Components/Shopping2";
import { LoginPage } from "./Components/LoginPage";



function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/welcome" component = {Shopping2} />
        <Route path="/" component = {Shopping} />
        
      </Switch>
      <Footer></Footer>
    
    </div>
  );
}

export default App;
