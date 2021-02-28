import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FirstComponent from './components/learning-examples/FirstComponent'
import SecondComponent from './components/learning-examples/SecondComponent'
import ThirdComponent from './components/learning-examples/ThirdComponent'
import Counter from './components/counter/Counter'
import Album from './components/album-app/album'
import './bootstrap.css'
 
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter by = {1}/>
           <Counter by = {5}/>
           <Counter by = {10}/>*/}
          <Album />
      </div>
    );
  }
}



class LearningComponents extends Component {
  render() {
    return (
      <div className="App">
        My Hello World
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </div>
    );
  }
}

export default App;