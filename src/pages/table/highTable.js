import React, {Component} from "react";
import {Badge, Button, Card, message, Modal, Table} from "antd";
import axios from './../../axios/index';
import Utils from "../../utils/utils";

export default class HighTable extends Component{

  state = {};
  params = {
    page:1
  };

  componentDidMount() {
    this.request();
  }

  request = () => {
    let _this = this;
    axios.ajax({
      url: '/table/high/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        res.result.list.map((item, index) => {
          item.key = index;
        });
        this.setState({
          dataSource: res.result.list
        });
      }
    })
  }; //请求接口数据

  handleChange = (pagination,filters,sorter) => {
    this.setState({
      sortOrder: sorter.order
    })
  };

  //删除操作
  handleDelete = (item) => {
    let id = item.id;
    Modal.confirm({
      title:'确认',
      content:'您确认要删除此条数据吗',
      onOk:()=>{
        message.success('删除成功');
        this.request();
      }
    })
  };

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        width: 80,
        dataIndex: 'interest',
        render(state) {
          let config = {
            '1': '游泳',
            '2': '足球',
            '3': '篮球',
            '4': '攀岩',
            '5': '网球',
            '6': '斯诺克',
            '7': '高尔夫',
            '8': '骑行',
          };
          return config[state];
        }
      },
      {
        title: '是否已婚',
        width: 80,
        dataIndex: 'isMarried',
        render(state) {
          return state == 1 ? '是' : '否'
        }
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        width: 80,
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        width: 80,
        dataIndex: 'time'
      }
    ]; // 第一个表格的数据
    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80,
        fixed:'left'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        width: 80,
        dataIndex: 'interest',
        render(state) {
          let config = {
            '1': '游泳',
            '2': '足球',
            '3': '篮球',
            '4': '攀岩',
            '5': '网球',
            '6': '斯诺克',
            '7': '高尔夫',
            '8': '骑行',
          };
          return config[state];
        }
      },
      {
        title: '是否已婚',
        width: 80,
        dataIndex: 'isMarried',
        render(state) {
          return state == 1 ? '是' : '否'
        }
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        width: 80,
        fixed:'right',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        width: 80,
        fixed:'right',
        dataIndex: 'time'
      }
    ]; // 第二个表格的数据
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter:(a,b)=>{
          return a.age - b.age;
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(state) {
          let config = {
            '1': '游泳',
            '2': '足球',
            '3': '篮球',
            '4': '攀岩',
            '5': '网球',
            '6': '斯诺克',
            '7': '高尔夫',
            '8': '骑行',
          };
          return config[state];
        }
      },
      {
        title: '是否已婚',
        dataIndex: 'isMarried',
        render(state) {
          return state == 1 ? '是' : '否'
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]; // 第三个表格的数据
    const columns4 = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者',
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(state) {
          let config = {
            '1': <Badge status="success" text="成功"/>,
            '2': <Badge status="error" text="报错"/>,
            '3': <Badge status="default" text="正常"/>,
            '4': <Badge status="processing" text="进行中"/>,
            '5': <Badge status="warning" text="警告"/>,
          };
          return config[state];
        }
      },
      {
        title: '是否已婚',
        dataIndex: 'isMarried',
        render(state) {
          return state == 1 ? '是' : '否'
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '操作',
        render:(text,item)=>{
          return <Button size="small" onClick={(item) => {this.handleDelete(item)}}>删除</Button>
        }
      }
    ]; // 第三个表格的数据

    return (
        <div style={{width: '100%'}}>
          <Card title="头部固定">
            <Table
                columns={columns}
                dataSource={this.state.dataSource}
                bordered
                pagination={false}
                scroll={{y:240}}
            />
          </Card>
          <Card title="左侧固定" style={{margin: '10px 0'}}>
            <Table
                bordered
                columns={columns2}
                dataSource={this.state.dataSource}
                pagination={false}
                scroll={{x:2730}}
                scroll={{y:480}}
            />
          </Card>
          <Card title="表格排序" style={{margin: '10px 0'}}>
            <Table
                bordered
                columns={columns3}
                dataSource={this.state.dataSource}
                pagination={false}
                onChange={this.handleChange}
            />
          </Card>
          <Card title="操作按钮" style={{margin: '10px 0'}}>
            <Table
                bordered
                columns={columns4}
                dataSource={this.state.dataSource}
                pagination={false}
            />
          </Card>
        </div>
    );
  }

}
