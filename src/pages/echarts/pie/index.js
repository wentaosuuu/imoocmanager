import React, {Component} from "react";
import {Card} from "antd";
import echarts from 'echarts';
import echartTheme from './../themeLight';
import ReactEcharts from "echarts-for-react";

export default class Pie extends Component {

  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme); //这里先注册(定义)好主题, 下面的图标才能使用
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:&nbsp;{c}&nbsp;({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1200,
              name: '周二'
            },
            {
              value: 600,
              name: '周三'
            },
            {
              value: 700,
              name: '周四'
            },
            {
              value: 550,
              name: '周五'
            },
            {
              value: 1500,
              name: '周六'
            },
            {
              value: 2000,
              name: '周日'
            }
          ]
        }
      ]
    };
    return option;
  };

  getOption2 = () => {
    let option2 = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:&nbsp;{c}&nbsp;({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'], //第一个参数是内环大小, 第二个参数是外环大小
          center: ['50%', '60%'], //可以移动圆心的位置
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1200,
              name: '周二'
            },
            {
              value: 600,
              name: '周三'
            },
            {
              value: 700,
              name: '周四'
            },
            {
              value: 550,
              name: '周五'
            },
            {
              value: 1500,
              name: '周六'
            },
            {
              value: 2000,
              name: '周日'
            }
          ]
        }
      ]
    };
    return option2;
  };

  getOption3 = () => {
    let option3 = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:&nbsp;{c}&nbsp;({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1200,
              name: '周二'
            },
            {
              value: 600,
              name: '周三'
            },
            {
              value: 700,
              name: '周四'
            },
            {
              value: 550,
              name: '周五'
            },
            {
              value: 1500,
              name: '周六'
            },
            {
              value: 2000,
              name: '周日'
            }
          ].sort((a, b) => { //这个是给这些数据排序, 用sort方法
            return a.value - b.value
          }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
    return option3;
  };


  render() {
    return (
      <div style={{width: '100%'}}>
        <Card title="饼图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{height: 500}}/>
        </Card>
        <Card title="饼图表之二" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height: 500}}/>
        </Card>
        <Card title="饼图表之三" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height: 500}}/>
        </Card>
      </div>
    );
  }
}

