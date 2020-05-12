import React, {Component, Fragment} from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import  {GlobalStyleFont} from './statics/iconfont/iconfont';
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Buttons from './pages/ui/buttons'
import NoMatch from "./pages/noMatch";
import Modals from "./pages/ui/modals";
import Loading from "./pages/ui/loading";
import Notice from "./pages/ui/notice";
import Message from "./pages/ui/message";
import Tab from "./pages/ui/tab";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousels";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";
import BasicTable from "./pages/table/basicTable";
import HighTable from "./pages/table/highTable";
import City from "./pages/city";
import Order from "./pages/order";
import Common from "./common";
import OrderDetail from "./pages/order/detail";
import User from "./pages/user";
import BikeMap from "./pages/map/bikeMap";
import Bar from "./pages/echarts/bar";
import Pie from "./pages/echarts/pie";
import Line from "./pages/echarts/line";
import RichText from "./pages/richi";
import PermissionUser from "./pages/permission";
import Home from "./pages/home";

export default class IRouter extends Component{
  render() {
    return(
      <div>
        <GlobalStyleFont/>
        <HashRouter>
          <App>
            <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/common" render={()=>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
              </Common>
            }
            />
            <Route path="/order/detail" component={Login}/>
            <Route path="/" render={()=>
              <Admin>
                <Switch>
                  <Route path="/home" component={Home}/>
                  <Route path="/ui/buttons" component={Buttons}/>
                  <Route path="/ui/modals" component={Modals}/>
                  <Route path="/ui/loadings" component={Loading}/>
                  <Route path="/ui/notification" component={Notice}/>
                  <Route path="/ui/messages" component={Message}/>
                  <Route path="/ui/tabs" component={Tab}/>
                  <Route path="/ui/gallery" component={Gallery}/>
                  <Route path="/ui/carousel" component={Carousels}/>
                  <Route path="/form/login" component={FormLogin}/>
                  <Route path="/form/reg" component={FormRegister}/>
                  <Route path="/table/basic" component={BasicTable}/>
                  <Route path="/table/high" component={HighTable}/>
                  <Route path="/city" component={City}/>
                  <Route path="/order" component={Order}/>
                  <Route path="/user" component={User}/>
                  <Route path="/bikeMap" component={BikeMap}/>
                  <Route path="/charts/bar" component={Bar}/>
                  <Route path="/charts/pie" component={Pie}/>
                  <Route path="/charts/line" component={Line}/>
                  <Route path="/rich" component={RichText}/>
                  <Route path="/permission" component={PermissionUser}/>
                  <Redirect to="/home"/>
                  <Route component={NoMatch}/>
                </Switch>
              </Admin>
            } />
            </Switch>
          </App>
        </HashRouter>
      </div>
    );
  }
}
