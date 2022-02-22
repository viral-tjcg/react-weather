import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import SnackBar from './Components/SnackBar';
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
      <SnackBar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
