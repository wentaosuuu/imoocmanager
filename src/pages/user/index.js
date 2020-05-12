import React, {Component, createRef} from "react";
import axios from './../../axios/index';
import {Button, Card, DatePicker, Form, Input, message, Modal, Table, Radio, Select} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import './../../style/common.less';
//ETable 没学

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
export default class User extends Component {
  formRef = createRef();
  state = {
    isVisible: false,
  };
  params = {
    page: 1
  };

  componentDidMount() {
    this.requestList();
  }

  //请求接口数据
  requestList = () => {
    let _this = this;
    axios.ajax({
      url: 'userCreate'? '/table/list':'/table/edit',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      if (res.code === 0) {
        res.result.list.map((item, index) => {
          item.key = index;
        });
        this.setState({
          dataSource: res.result.list
        });
      }
    })
  };

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  };

  //功能区操作
  handleOperate = (type) => {
    if (type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      })
    }else if (type === 'edit'){
      this.formRef.current.setFieldsValue({
        sex: 1
      });
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
      });
    }
  };

  //创建员工提交
  handleSubmit = () => {
    let userCreate = this.formRef.current.getFieldsValue();
    axios.ajax({
      url: '/user/add',
      data: {
        params: userCreate
      }
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          isVisible: false
        });
        this.requestList();
      }
    })
  };


  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
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
    ];
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    };

    return (
      <div style={{width: '100%'}}>
        <Card>
          <Form
            layout="inline"
            ref={this.formRef}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <FormItem label="用户名" name="user_name">
              {/*<BaseForm/>   这个封装的过程我放弃了, 很多方法都弃用了. 封装不过来. 没时间了*/}
              <Input placeholder="请输入用户名"/>
            </FormItem>
            <FormItem label="用户手机号">
              <Input placeholder="请输入用户手机号"/>
            </FormItem>
            <FormItem label="请选择入职日期">
              <DatePicker showTime format="YYYY-MM-DD"/>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.openOrderDetail}>查询</Button>
              <Button
                type="primary"
                style={{marginLeft: 10}}
                onClick={this.handleConfirm}
              >
                重置
              </Button>
            </FormItem>
          </Form>
        </Card>
        <Card className="operate-wrap">
          <Button type="primary" icon={<PlusOutlined/>} onClick={() => this.handleOperate('create')}>创建员工</Button>
          <Button type="primary" icon={<EditOutlined/>} onClick={() => this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" icon={<DeleteOutlined/>} onClick={() => this.handleOperate('delete')}>删除员工</Button>
          <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
        </Card>
        <Card>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          />
        </Card>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            //this.props.formRef.resetFields(); 会报错 'resetFields' undefined
            this.formRef.current.resetFields(); //点击cancel时清空表单
            this.setState({
              isVisible: false
            })
          }}
          width={600}
        >
          <Form
            layout="horizontal"
            name="创建员工"
            ref={this.formRef} //将Form的值存到formRef中
          >
            <FormItem label="用户名" name="user_name" {...formItemLayout}>
              <Input type="text" placeholder="请输入用户名"/>
            </FormItem>
            <FormItem label="性别" name="sex" {...formItemLayout}>
              <RadioGroup>
                <Radio value={1}>男</Radio> {/*想要数字的1就写{1} 字符串的1就写"1"*/}
                <Radio value={2}>女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="状态" name="state" {...formItemLayout}>
              <Select>
                <Option value={1}>单身</Option>
                <Option value={2}>恋爱中</Option>
                <Option value={3}>失恋中</Option>
                <Option value={4}>已婚</Option>
                <Option value={5}>孤独终老</Option>
              </Select>
            </FormItem>
            <FormItem label="生日" name="birthday" {...formItemLayout}>
              <DatePicker showTime format="YYYY-MM-DD"/>
            </FormItem>
            <FormItem label="联系地址" name="address" {...formItemLayout}>
              <TextArea rows={3} placeholder="请输入联系地址"/>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
