import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: true,
    };

    this.groupBy = this.groupBy.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  };


  componentWillMount() {
    var JSONdata = data['VDEALS'];
    this.setState({
      data: this.groupBy(JSONdata, 'PKEY')
    });
  }



  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  toggleClass(key) {
    document.getElementById(key).classList.toggle("active");
  }

  render() {
    var self = this;
    var parents = Object.keys(self.state.data).map(function(key, index) {
      var childrens = self.state.data[key].map(function (child, index) {
        return (
          <li>{child.Name}</li>
        );
      }, this);

      return (
        <ul id={key} onClick={() => self.toggleClass(key)}>{key}{childrens}</ul>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="data">
          {parents}
        </div>
      </div>
    );
  }
}

export default App;
