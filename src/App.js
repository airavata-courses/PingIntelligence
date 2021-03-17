import loginImg from "./logo1.png";
import './App.css';
import {Login,Register, Dashboard, Viewphotos,PhotoSearchModal, Logout} from "./component/login/index";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import ErrorComponent from './component/login/ErrorComponent.jsx'
import HeaderComponent from './component/login/HeaderComponent.jsx'
// import FooterComponent from './component/login/FooterComponent.jsx'
import AuthenticatedRoute from './component/login/AuthenticatedRoute.js'
import './bootstrap.css'

function App() {
  return (
    <div className="App">
      <Router>
        <>
			<HeaderComponent/>
			<Switch>
				<Route path ="/" exact component = {Login} />
				<Route path="/login" component={Login}/>
				<Route path="/signup" component={Register}/>
				
				<AuthenticatedRoute path="/dashboard" component={Dashboard}/>
				<AuthenticatedRoute path="/view-album-photos" component={Viewphotos}/>
				<AuthenticatedRoute path="/find-album-photos" component={PhotoSearchModal}/>
			
			
				<Route component = {ErrorComponent} />
			</Switch>
			{/* <FooterComponent/> */}
		</>
      </Router>      
    </div>
  );
}

export default App;
