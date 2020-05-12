import React, {Component} from "react";
import {Card} from "antd";
//这是加载全部, 也可以按需加载,提高性能
import echarts from 'echarts';
import echartTheme from './../echartTheme';
import ReactEcharts from "echarts-for-react";

export default class Line extends Component{

  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme); //这里先注册(定义)好主题, 下面的图标才能使用
  }

  getOption = () => {
    let option = {
      title:{
        text: '用户骑行订单'
      },
      tooltip:{ //鼠标移到柱形图上时显示数据
        trigger:'axis'
      },
      xAxis:{  //这里定义X轴
        //真正开发时, 这里的data应该是后端接口返回来的数据
        data:['周一','周二','周三','周四','周五','周六','周日',]
      },
      yAxis:{ //定义Y轴
        type: 'value'
      },
      series: [ //定义数据
        {
          name:'订单量',
          type:'line',
          data:[1000,2000,1500,3000,2000,1200,800] //这里数据的数量要和上面xAxis里data的数量保持一致
        }
      ]
    };
    return option;
  };

  getOption2 = () => {
    let option2 = {
      title:{
        text: '用户骑行订单'
      },
      legend: {
        data:['OFO','摩拜','酷骑']
      },
      tooltip:{ //鼠标移到柱形图上时显示数据
        trigger:'axis'
      },
      xAxis:{  //这里定义X轴
        //真正开发时, 这里的data应该是后端接口返回来的数据
        data:['周一','周二','周三','周四','周五','周六','周日',]
      },
      yAxis:{ //定义Y轴
        type: 'value'
      },
      series: [ //数据源
        {
          name:'OFO',
          type:'line',
          data:[2000,2300,3000,3600,4000,4100,4200] //这里数据的数量要和上面xAxis里data的数量保持一致
        },
        {
          name:'摩拜',
          type:'line',
          data:[500,1000,1400,3000,2500,2100,2100]
        },
        {
          name:'酷骑',
          type:'line',
          data:[400,600,450,750,1100,1950,2000]
        }
      ]
    };
    return option2;
  };

  getOption3 = () => {
    let option3 = {
      title:{
        text: '用户骑行订单'
      },
      legend: {
        data:['OFO','摩拜','酷骑']
      },
      tooltip:{ //鼠标移到柱形图上时显示数据
        trigger:'axis'
      },
      xAxis:{  //这里定义X轴
        //真正开发时, 这里的data应该是后端接口返回来的数据
        data:['周一','周二','周三','周四','周五','周六','周日',],
        type:'category',
        boundaryGap: false // false X轴从0开始
      },
      yAxis:{ //定义Y轴
        type: 'value'
      },
      series: [ //数据源
        {
          name:'订单量',
          type:'line',
          data:[1000,2000,1500,3000,2000,1200,800], //这里数据的数量要和上面xAxis里data的数量保持一致
          areaStyle:{}
        }
      ]
    };
    return option3;
  };

  render() {
    return (
      <div style={{width:'100%'}}>
        <Card title="折线图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}}/>
        </Card>
        <Card title="折线图表之二" style={{marginTop:10}}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>
        </Card>
        <Card title="折线图表之三" style={{marginTop:10}}>
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height:500}}/>
        </Card>
      </div>
    );
  }
}

