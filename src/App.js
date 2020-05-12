import React, {Component, Fragment} from 'react';
import './style/common.less'

class App extends Component{
  render() {
    return(
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

export default App;
