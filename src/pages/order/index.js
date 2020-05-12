import React, {Component} from "react";
import {Button, Card, DatePicker, Form, message, Modal, Select, Table} from "antd";
import axios from './../../axios/index';
import Utils from "../../utils/utils";
import BaseForm from './../../componenets/BaseForm';

const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends Component {
  state = {
    orderInfo: {},
    orderConfirmVisble: false
  };
  params = {
    page: 1
  };
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: 1,
      width: 100,
      list: [{id: '0', name: '全部'}, {id: '1', name: '北京'}, {id: '2', name: '天津'}, {id: '3', name: '上海'}]
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: 1,
      width: 100,
      list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '2', name: '结束行程'}]
    }
  ];

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/order/list',
      data: {
        params: {
          page: this.params.page  //因为这里会有很多个值, 有城市, 开始和结束时间, 订单状态等等, 所以不能写成 params: this.params.page
        }
      }
    }).then((res) => {
      if (res.code == '0') {
        let list = res.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        this.setState({
          list,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  };

  //订单结束确认
  handleConfirm = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      });
      return;
    }
    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({
          orderInfo: res.result,
          orderConfirmVisble: true
        })
      }
    });
    this.setState({
      orderConfirmVisble: true
    })
  };

  //结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        message.success("订单结束成功")
        this.setState({
          orderConfirmVisble: false
        });
        this.requestList();
      }
    });
  };

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  };

  //订单详情
  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单'
      });
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`, '_blank');
  };

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return distance / 1000 + 'Km';
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status',

      },
      {
        title: '开始',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ];
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    };
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };
    return (
      <div style={{width: '100%'}}>
        <Card>
          <FilterForm/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
          <Button
            type="primary"
            style={{marginLeft: 10}}
            onClick={this.handleConfirm}
          >
            结束订单
          </Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始实践" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
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
            <Option value="2">天津市</Option>
            <Option value="3">深圳市</Option>
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
          <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
