import React, {Component} from "react";
import {HashRouter, Link, Route} from "react-router-dom";
import Main from '../router2/Main';
import About from './about';
import Topic from './topic';


export default class Home extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul>
            <li><Link to="/">Home1</Link></li>
            <li><Link to="/about">About1</Link></li>
            <li><Link to="/topics">Topics1</Link></li>
          </ul>
          <hr/>

        </div>
      </HashRouter>
    );
  }
}
