import loginImg from "./logo1.png";
import './App.css';
import {Login,Register, Dashboard} from "./component/login/index";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="logos">
        <img className="img1" src={loginImg}></img>
      </div>
      <Router>
        {/* <Login/> */}
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/signup" component={Register}/>
      </Router>
      {/* <Login /> */}
    </div>
  );
}

export default App;
