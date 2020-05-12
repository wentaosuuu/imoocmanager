import React, {Component} from "react";
import {Card, message, Tabs} from "antd";
import { AppleOutlined, AndroidOutlined  } from '@ant-design/icons';

const {TabPane} = Tabs;
const iconApple = <AppleOutlined />;
const iconAndroid = <AndroidOutlined />;

export default class Tab extends Component{

  handleCallback = (key) => {
    message.info("Hi, 您选择了页签: " +key)
  };

  componentWillMount() {
    const panes = [
        {
          title:'Tab 1',
          content:'Tab Tab 1',
          key:'1'
        },
        {
          title:'Tab 2',
          content:'Tab Tab 2',
          key:'2'
        },
        {
          title:'Tab 3',
          content:'Tab  Tab 3',
          key:'3'
        }];
    this.setState({
      activeKey:panes[0].key,
      panes
    })
  };

  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  newTabIndex = 0; //有了这个, 才不会增加标签后其他标签还是选中状态
  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    return(
        <div style={{width:'100%'}}>
          <Card title="Tab页签" className="card-wrap">
            <Tabs defaultActiveKey="1" onChange={this.handleCallback} >
              <TabPane tab="Tab 1" key="1">欢迎学习React课程</TabPane>
              <TabPane tab="Tab 2" key="2">欢迎学习React课程</TabPane>
              <TabPane tab="Tab 3" key="3">React是一个受欢迎的MV*框架</TabPane>
            </Tabs>
          </Card>
          <Card title="Tab带图页签" className="card-wrap">
            <Tabs defaultActiveKey="1" onChange={this.handleCallback} >
              <TabPane tab={<span>{iconApple}Tab 1</span>} key="1">欢迎学习React课程<i>&#xe851;</i></TabPane>
              <TabPane tab={<span>{iconAndroid}Tab 2</span>}  key="2" disabled>欢迎学习React课程</TabPane>
              <TabPane tab="Tab 3" key="3">React是一个受欢迎的MV*框架</TabPane>
            </Tabs>
          </Card>
          <Card title="Tab带图页签" className="card-wrap">
            <Tabs
                onChange={this.onChange}
                activeKey={this.state.activeKey} //这里可要可不要, 因为当我们点击标签的时候已经显示我们选中了哪一个
                //defaultActiveKey="1"
                //onChange={this.handleCallback}  //不要的原因是这里有一个回调函数, 我们知道我们点了哪个
                type="editable-card"
                onEdit={this.onEdit}
            >
              {/*JS语法一定是在大括号里面写的*/}
              {
                this.state.panes.map((panel)=>{
                  return <TabPane
                      tab={panel.title}
                      key={panel.key}
                  >
                    {panel.content}
                  </TabPane>
                })
              }
            </Tabs>
          </Card>
        </div>
    )
  }
}
