import React, {Component} from "react";
import {Button, Card, Radio, Tooltip} from "antd";
import './ui.less';
import { SearchOutlined, PlusOutlined, LeftOutlined,RightOutlined } from '@ant-design/icons';

export default class Buttons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      close: false,
      size: 'default'
    };
    this.handleCloseLoading = this.handleCloseLoading.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
        <div style={{width:'100%'}}>
          <Card title="基础按钮" className="card-wrap">
            <Button type="primary">Imooc</Button>
            <Button>Imooc</Button>
            <Button type="dashed">Imooc</Button>
            <Button type="danger">Imooc</Button>
            <Button disabled>Imooc</Button>
          </Card>
          <Card title="图形按钮" className="card-wrap">
            {/*现在不能像视频那样icon="plus"已经无效了. 必须以添加Icon组件的形式来加图形*/}
            <Button icon={<PlusOutlined />}>创建</Button>
            <Button icon="edit">编辑</Button>
            <Button icon="delete">删除</Button>
            <Button shape="circle" />
            <Button type="primary" icon="search">搜索</Button>
            <Button type="primary" icon="download">下载</Button>
          </Card>
          <Card title="Loading按钮" className="card-wrap">
            <Button type="primary" loading={true}>确定</Button>
            <Button type="primary" shape="circle" loading={true}/>
            <Button loading={true}>点击加载</Button>
            <Button shape="circle" loading={true}/>
            <Button type="primary" onClick={this.handleCloseLoading} loading={this.state.close}>关闭</Button>
          </Card>
          <Card title="按钮组">
            <Button.Group>
              <Button type="primary" icon={<LeftOutlined />}>返回</Button>
              <Button type="primary" icon={<RightOutlined />}>前进</Button>
            </Button.Group>
          </Card>
          <Card title="按钮尺寸" className="card-wrap">
            <Radio.Group value={this.state.size} onChange={this.handleChange}>
              <Radio value="small">小</Radio>
              <Radio value="default">中</Radio>
              <Radio value="large">大</Radio>
            </Radio.Group>
            <Button type="primary" size={this.state.size}>Imooc</Button>
            <Button size={this.state.size}>Imooc</Button>
            <Button type="dashed" size={this.state.size}>Imooc</Button>
            <Button type="danger" size={this.state.size}>Imooc</Button>
          </Card>
          <Card title="按钮尺寸" className="card-wrap">
            <Radio.Group value={this.state.size} onChange={this.handleChange}>
              <Radio value="small">小</Radio>
              <Radio value="default">中</Radio>
              <Radio value="large">大</Radio>
            </Radio.Group>
            <Button type="primary" size={this.state.size}>Imooc</Button>
            <Button size={this.state.size}>Imooc</Button>
            <Button type="dashed" size={this.state.size}>Imooc</Button>
            <Button type="danger" size={this.state.size}>Imooc</Button>
          </Card>
          <Card title="按钮尺寸" className="card-wrap">
            <Radio.Group value={this.state.size} onChange={this.handleChange}>
              <Radio value="small">小</Radio>
              <Radio value="default">中</Radio>
              <Radio value="large">大</Radio>
            </Radio.Group>
            <Button type="primary" size={this.state.size}>Imooc</Button>
            <Button size={this.state.size}>Imooc</Button>
            <Button type="dashed" size={this.state.size}>Imooc</Button>
            <Button type="danger" size={this.state.size}>Imooc</Button>
          </Card>
          <Card title="按钮尺寸" className="card-wrap">
            <Radio.Group value={this.state.size} onChange={this.handleChange}>
              <Radio value="small">小</Radio>
              <Radio value="default">中</Radio>
              <Radio value="large">大</Radio>
            </Radio.Group>
            <Button type="primary" size={this.state.size}>Imooc</Button>
            <Button size={this.state.size}>Imooc</Button>
            <Button type="dashed" size={this.state.size}>Imooc</Button>
            <Button type="danger" size={this.state.size}>Imooc</Button>
          </Card>
        </div>
    );
  }

  handleCloseLoading(){
    this.setState(()=>({
      close: true
    }));
  }

  handleChange(e){
    this.setState((value)=>({
      size: e.target.value
    }));
  };
}
