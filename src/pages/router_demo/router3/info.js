import React, {Component} from "react";

export default class Info extends Component{
  render() {
    return(
        <div>
          测试动态路由功能
          <br/>
          动态路由的值是: {this.props.match.params.mainId}
        </div>
    );
  }
}
