import React, {Component} from "react";
import {Col, Row} from "antd";
import './style/common.less';
import 'antd/dist/antd.css';
import Header from './componenets/Header';
import Footer from './componenets/Footer';
import NavLeft from './componenets/NavLeft';
import Home from './pages/home';


export default class Admin extends Component{
  render() {
    return(
      <Row className="container" >
        <Col span="4" className="nav-left">
          <NavLeft/>
        </Col>
        <Col span="20" className="main">
          <Header/>
          <Row className="content">
            {/*<Home/>*/}
            {this.props.children}
          </Row>
          <Footer/>
        </Col>
      </Row>
    );
  }
}
