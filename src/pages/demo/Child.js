import React, {Component} from "react";

export default class Child extends Component{
  constructor(props) {
    super(props);
    this.state = {
      count:0
    };
  }

  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    console.log('did mount');
  }

  componentWillReceiveProps(newProps) {
    console.log('will props'+ newProps.name)
  }

  shouldComponentUpdate() {
    console.log('should update');
    return true;
  }

  componentWillUpdate() {
    console.log('will update');
  }

  componentDidUpdate() {
    console.log('didi update')
  }

  render() {
    return(
        <div>
          <p>测试子组件生命周期</p>
          <p>{this.props.name}</p>
        </div>
    )
  }
}
