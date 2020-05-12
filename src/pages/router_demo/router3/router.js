import React, {Component} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import Main from "./Main";
import Info from "./info";
import Topic from "../router1/topic";
import About from '../router1/about';
import Home from "./Home";
import NoMatch from "./NoMatch";

export default class IRoute extends Component{
  render() {
    return(
        <HashRouter>
          <Home>
            <Switch>
              <Route path="/main" render={()=>
                  <Main>
                    {/*动态路由方法*/}
                    <Route path="/main/:mainId" component={Info}/>
                  </Main>
              }/>
              <Route path="/about" exact component={About}/>
              <Route path="/topics" exact component={Topic}/>
              <Route component={NoMatch}></Route>
            </Switch>
          </Home>
        </HashRouter>
    );
  }
}
