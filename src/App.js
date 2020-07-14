import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Route} from "react-router-dom";
//import {CookiesProvider} from 'react-cookie';

//Import components to render
import Navbar from "./components/Navbar";
import Lists from "./components/Lists";
import CreateList from "./components/Create-List";
import Register from './components/Register';
import Login from "./components/Login";
import UpdateList from "./components/Update-List";
import WelcomeScreen from "./components/Welcome";

function App() {

  return (
    <Router>
      <div>
        <Navbar/>
        <Route path="/" exact component={Login} />
        <Route path="/createlist" component={CreateList}/>
        <Route path="/register" component={Register}/>
        <Route path="/lists" component={Lists}/>
        <Route path ="/edit/:id" component={UpdateList}/>
        <Route path ="/welcome" component={WelcomeScreen}/>
      </div>
    </Router>
  );
}

export default App;
