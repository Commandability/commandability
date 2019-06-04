import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import IncidentPage from './components/pages/IncidentPage';
import ReportPage from './components/pages/ReportPage';


const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root' hideNavBar>
                <Scene key='auth' hideNavBar>
                    <Scene key='login' component={LoginPage} title='Please Login' initial ></Scene>
                </Scene>
                <Scene key='home' hideNavBar>
                    <Scene key='main' component={MainPage} title='Main Page' hideNavBar></Scene>
                    <Scene key='report' component={ReportPage} title='Report Page'></Scene>
                </Scene>
                <Scene key='management' hideNavBar>
                    <Scene key='incident' component={IncidentPage} title='Incident Page' hideNavBar></Scene>
                    <Scene key='editPerson' title='Please enter the new personnel informaiton'></Scene>
                    <Scene key='editGroup' title='Please enter the new group information'></Scene>
                </Scene>
            </Scene>
        </Router>
    );
}

export default RouterComponent;

// Add this to the action/index.js to properly link paths:
//
// import { Actions } from 'react-native-router-flux';
//
// For each action that results in a screen change or new page, add in Actions.'key'(), where
// the key value matches the key to the page you want to switch to. This is added just after 
// the dispatch(); in the appropriate action. For nested scenes, do the upper level one. 
//
// Actions.home()