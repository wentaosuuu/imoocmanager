import React, {Component} from "react";
import {Button, Card, Modal } from "antd";
import './ui.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default class Modals extends Component{

  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  };

  handleOpen = (type) => {
    this.setState({
      [type]: true
    })
  };

  handleOk = () => {
    this.setState({
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false
    })
  };

  handleCancel = () => {
    this.setState({
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false
    })
  };

  handleConfirm = (type) => {
    // 老师那个Modal.[type]不好使, 如果不行的话那就写4个吧
    Modal.confirm({
      title:'确认',
      icon: <ExclamationCircleOutlined />,
      content: '你确定你学会了吗',
      onOk(){
        console.log('ok');
      },
      onCancel(){
        console.log('cancel');
      }
    })
  };

  render() {
    return(
        <div style={{width:'100%'}}>
          <Card title="基础模态框" className="card-wrap" >
            {/*传参一定要用箭头函数来绑定事件, 不传参不用*/}
            <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
            <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
            <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
            <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平居中弹框</Button>
          </Card>
          <Card title="信息确认框" className="card-wrap" >
            <Button type="primary" onClick={() => this.handleConfirm('Confirm')}>Confirm</Button>
            <Button type="primary" onClick={() => this.handleConfirm('Info')}>Info</Button>
            <Button type="primary" onClick={() => this.handleConfirm('Success')}>Success</Button>
            <Button type="primary" onClick={() => this.handleConfirm('Warning')}>Warning</Button>
          </Card>
          <Modal
              title="Basic Modal"
              visible={this.state.showModal1}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <Modal
              title="Basic Modal"
              visible={this.state.showModal2}
              okText="好的"
              cancelText="算了"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <Modal
              title="Basic Modal"
              style={{ top: 20 }}
              visible={this.state.showModal3}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <Modal
              title="Basic Modal"
              centered
              visible={this.state.showModal4}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
    );
  }

}
