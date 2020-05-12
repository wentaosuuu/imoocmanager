import React, {Component} from "react";
import {HashRouter, Route} from "react-router-dom";
import Main from "./Main";
import About from "../router1/about";
import Topic from "../router1/topic";
import Home from "./Home";

export default class IRoute extends Component{
  render() {
    return(
        <HashRouter>
          <Home>
            <Route path="/main" render={()=>
              <Main>
                <Route path="/main/a" component={About}/>
              </Main>
            }/>
            <Route path="/about" exact component={About}/>
            <Route path="/topics" exact component={Topic}/>
          </Home>
        </HashRouter>
    );
  }
}
