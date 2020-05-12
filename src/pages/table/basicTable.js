import React, {Component} from "react";
import {Button, Card, message, Modal, Table} from "antd";
//import axios from 'axios';
import axios from './../../axios/index';
import Utils from "../../utils/utils";

export default class BasicTable extends Component {

  state = {
    dataSource2: []
  };
  params = {
    page:1
  }; //另外写这个的原因是跳转页面不需要我们重新渲染dom, 也就是不需要调用state里的数据, 只需要渲染接口. 可以节省性能

  componentDidMount() {
    const data = [
      {
        id: '0',
        userName: 'wentao',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '法国奥尔良',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'xiedan',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '法国奥尔良',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'kimi',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '法国奥尔良',
        time: '09:00'
      }
    ];
    data.map((item, index) => {
      item.key = index
    });
    this.setState({
      dataSource: data
    });
    this.request();
  }

  //动态获取mock数据
  //Easy-mock已经挂掉, 这个方法已经不适用了
  // request = () => {
  //   //baseApi 要通过 axios/index 来调取, 不然我们有10条数据就要调10次baseApi吗, 要把公共部分抽取出去
  //   let baseApi = 'http://mock.studyinghome.com/mock/5e78f199ef619e1977e29b60/mockapi';
  //   axios.get(baseApi+'/table/list').then((res) => {
  //     let data = res.data;
  //     if (res.status == '200' && res.data.code == 0) {
  //       this.setState({
  //         dataSource2: data.result,
  //       })
  //     }
  //   });
  // };

  //这里调用ajax异步请求的方法, 封装的方法都写在src/axios/index.js里了, 这里直接引用方法就好了
  request = () => {
    let _this = this;
    axios.ajax({
      url: '/table/list',
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
          dataSource2: res.result.list,
          selectedRowKeys: [] ,
          selectedRows: null,
          pagination: Utils.pagination(res,(current)=>{
            _this.params.page = current;
            //会发现不管按哪一夜都不会跳转, 那是因为在接口那里已经定死page:1, 实际上应该是动态的, 我们在这里已经实现了跳转页面的操作
            this.request();
          })
        });
      }
    })
  };

  onRowClick = (record, index) => {
    let selectKey = [index];
    Modal.info({
      title: '信息',
      content: `用户名: ${record.userName}, 用户爱好 ${record.interest}`
    });
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  };
  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    if(typeof(rows) != 'undefined' && rows != null){
      rows.map((item) => {
        ids.push(item.id)
      });
    }
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗? ${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        this.request();
      }
    });
  };   //多选执行删除动作

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
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
    ]; // 第一个表格的数据
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };

    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let ids = [];
        selectedRows.map((item)=>{
          ids.push(item.id)
        });
        this.setState({
          selectedRowKeys,
          selectedRows,
          selectedIds:ids
        })
      }
    };

    return (
        <div style={{width: '100%'}}>
          <Card title="基础表格">
            <Table
                columns={columns}
                dataSource={this.state.dataSource}
                bordered
                pagination={false}
            />
          </Card>
          <Card title="动态数据渲染表格-Mock" style={{margin: '10px 0'}}>
            <Table
                bordered
                columns={columns}
                dataSource={this.state.dataSource2}
                pagination={false}
            />
          </Card>
          <Card title="Mock-单选" style={{margin: '10px 0'}}>
            <Table
                bordered
                rowSelection={rowSelection}
                onRow={(record, index) => {
                  return {
                    onClick: () => {
                      this.onRowClick(record, index);
                    }
                  };
                }}
                columns={columns}
                dataSource={this.state.dataSource2}
                pagination={false}
            />
          </Card>
          <Card title="Mock-多选" style={{margin: '10px 0'}}>
            <div style={{marginBottom: 10}}>
              <Button onClick={this.handleDelete}>删除</Button>
            </div>
            <Table
                bordered
                rowSelection={rowCheckSelection}
                columns={columns}
                dataSource={this.state.dataSource2}
                pagination={false}
            />
          </Card>
          <Card title="Mock-表格分页" style={{margin: '10px 0'}}>
            <Table
                bordered
                columns={columns}
                dataSource={this.state.dataSource2}
                pagination={this.state.pagination}
            />
          </Card>
        </div>
    );
  }
}


