import React, {Component} from "react";
import {Row} from "antd";
import './style/common.less';
import 'antd/dist/antd.css';
import Header from './componenets/Header';

export default class Common extends Component {
  render() {
    return (
      <div>
        <Row className="simple-page">
          <Header menuType="second"/>
        </Row>
        <Row className="content">
          {this.props.children}
        </Row>
      </div>
    );
  }
}
