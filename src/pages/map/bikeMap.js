import React, {Component} from "react";
import axios from './../../axios';
import {Button, Card, DatePicker, Form, Select} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
export default class BikeMap extends Component{

  state={};
  params={};
  map='';

  componentWillMount() {
    this.requestList();
  }

  //调用查询车辆信息接口
  requestList = () => {
    axios.ajax({
      url:'/map/bike_list',
      data:{
        params: this.params
      }
    }).then((res)=>{
      if (res.code === 0){
        this.setState({
          total_count: res.result.total_count
        });
        this.renderMap(res);
      }
    })
  };

  //查询表单
  handleSearch = () => {
    this.requestList();
  };

  //渲染地图数据
  renderMap = (res) => {
    let list = res.result.route_list;
    this.map = new window.BMap.Map('container');
    let gps1 = list[0].split(',');
    let stratPoint = new window.BMap.Point(gps1[0],gps1[1]);
    let gps2 = list[list.length-1].split(',');
    let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
    this.map.centerAndZoom(endPoint,11);

    //起点
    let startPointIcon = new window.BMap.Icon(
      '/assets/start_point.png',
      new window.BMap.Size(36,42),
      {imageSize:new window.BMap.Size(36,42),
      anchor: new window.BMap.Size(18,42)}
      );
    let bikeMarkerStart = new window.BMap.Marker(stratPoint, {icon: startPointIcon});
    this.map.addOverlay(bikeMarkerStart);
    //终点
    let endPointIcon = new window.BMap.Icon(
      '/assets/end_point.png',
      new window.BMap.Size(36,42),
      {imageSize: new window.BMap.Size(36,42),
      anchor: new window.BMap.Size(18,42)}
    );
    let bikeMarkerEnd = new window.BMap.Marker(endPoint, {icon: endPointIcon});
    this.map.addOverlay(bikeMarkerEnd);

    //绘制车辆行驶路线
    let routeList = [];
    list.forEach((item)=>{
      let p = item.split(',');
      routeList.push(new window.BMap.Point(p[0],p[1]))
    });
    let polyLine = new window.BMap.Polyline(routeList,{
      strokeColor: '#ef4136',
      strokeWeight:2,
      strokeOpacity:1
    });
    this.map.addOverlay(polyLine);

    //绘制服务区
    let servicePointList = [];
    let serviceList = res.result.service_list;
    serviceList.forEach((item)=>{
      servicePointList.push(new window.BMap.Point(item.lon,item.lat))
    });
    let polyServiceLine = new window.BMap.Polyline(servicePointList,{
      strokeColor: '#ef4136',
      strokeWeight:3,
      strokeOpacity:1
    });
    this.map.addOverlay(polyServiceLine);

    //添加地图中的自行车图标
    let bikeList = res.result.bike_list;
    let bikeIcon = new window.BMap.Icon(
      '/assets/bike.jpg',
      new window.BMap.Size(36,42),{
        imageSize: new window.BMap.Size(36,42),
        anchor: new window.BMap.Size(18,42)
      });
    //Marker是覆盖物, 就需要知道坐标, 就需要一个forEach循环把接口里的坐标遍历出来存到point变量里.
    bikeList.forEach((item)=>{
      let p = item.split(',');
      let point = new window.BMap.Point(p[0],p[1]);
      let bikeMarker = new window.BMap.Marker(point,{icon: bikeIcon});
      this.map.addOverlay(bikeMarker);
    })

  };

  render() {
    return (
      <div>
        <Card>
          <FilterForm/>
        </Card>
        <Card style={{marginTop:10}}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{height:500}}></div>
        </Card>
      </div>
    );
  }
}


class FilterForm extends Component {

  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <Form
        layout="inline"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <FormItem
          label="城市"
          name="city_id"
        >
          <Select placeholder="全部" style={{width: 100}}>
            <Option value="">全部</Option>
            <Option value="1">北京市</Option>
            <Option value="2">上海市</Option>
            <Option value="3">天津市</Option>
            <Option value="4">杭州市</Option>
            <Option value="5">南宁市</Option>
          </Select>
        </FormItem>
        <FormItem
          label="订单时间"
          name="start_time"
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
        </FormItem>
        <FormItem
          label="结束时间"
          name="end_time"
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
        </FormItem>
        <FormItem
          label="订单状态"
          name="order_status"
        >
          <Select placeholder="请选择" style={{width: 100}}>
            <Option value="">全部</Option>
            <Option value="1">进行中</Option>
            <Option value="2">结束行程</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleSearch}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
