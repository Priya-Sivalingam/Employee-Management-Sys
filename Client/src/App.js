// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/employees" component={EmployeeList} />
                    <Route path="/employee/:id" component={EmployeeDetails} />
                    <Route path="/add-employee" component={AddEmployee} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
