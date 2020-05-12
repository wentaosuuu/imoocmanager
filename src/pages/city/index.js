import React, {Component, createRef} from "react";
import axios from './../../axios/index';
import {Card, Form, Select, Button, Table, Modal, Input, message} from "antd";
import Utils from "../../utils/utils";

const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends Component {
  formRef = createRef();

  state = {
    list: [],
    isShowOpenCity: false,
  };
  params = {page: 1};

  componentDidMount() {
    this.requestList();
  }

  //默认请求我们的接口数据
  requestList = () => {
    let _this = this; //这是为了区分作用域的问题, 不然this指向会出错
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      this.setState({
        list: res.result.item_list.map((item, index) => {
          item.key = index;
          return item; //这里不return 就不能返回新的对象
        }),
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current;
          _this.requestList();
        })
      })
    })
  };

  //开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  };

  //城市开通提交
  handleSubmit = (values) => {
    let cityInfo = this.formRef.current.getFieldsValue();
    console.log(cityInfo);
    axios.ajax({
      url: '/city/open',
      data:{
        params:cityInfo
      }
    }).then((res)=>{
      if (res.code == '0'){
        message.success("开通成功");
        this.setState({
          isShowOpenCity:false
        });
        this.requestList();
      }
    })
  };

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode){
          return mode == '1' ? '禁停区':'指定停车点'
        }
      },
      {
        title: '运营模式',
        dataIndex: 'op_mode',
        render(op_mode){
          return op_mode == '1' ? '自营':'加盟'
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map((item) => {
            return item.user_name
          }).join(',');
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateDate
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ];
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    return (
        <div style={{width: '100%'}}>
          <Card>
            <FilterForm/>
          </Card>
          <Card style={{marginTop: 10}}>
            <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
          </Card>
          <div className='content-wrap'>
            <Table
                bordered
                columns={columns}
                dataSource={this.state.list}
                pagination={this.state.pagination}
            />
          </div>
          <Modal
              title="开通城市"
              visible={this.state.isShowOpenCity}
              onOk={this.handleSubmit}
              onCancel={() => {
                this.setState({
                  isShowOpenCity: false
                })
              }}
          >
            {/*引入组件的方式不能取到值, 必须直接在这里写Form, 不明白为什么*/}
            {/*<OpenCityForm />*/}
            <Form
                layout="horizontal"
                name="开通城市"
                ref={this.formRef}  // 设置这个才能在Modal里去Form的值
            >
              <FormItem
                  label="选择城市"
                  name="city_id"
                  {...formItemLayout}
              >
                <Select style={{width: 240}}>
                  <Option value="">全部</Option>
                  <Option value="1">北京市</Option>
                  <Option value="2">天津市</Option>
                </Select>
              </FormItem>
              <FormItem
                  label="运营模式"
                  name="op_mode"
                  {...formItemLayout}
              >
                <Select>
                  <Option value="1">自营</Option>
                  <Option value="2">加盟</Option>
                </Select>
              </FormItem>
              <FormItem
                  label="用车模式"
                  name="bike_mode"
                  {...formItemLayout}
              >
                <Select>
                  <Option value="1">指定停车点</Option>
                  <Option value="2">禁停区</Option>
                </Select>
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
              label="用车模式"
              name="mode"
          >
            <Select placeholder="请选择" style={{width: 140}}>
              <Option value="">全部</Option>
              <Option value="1">指定停车点模式</Option>
              <Option value="2">禁停区模式</Option>
            </Select>
          </FormItem>
          <FormItem
              label="运营模式"
              name="op_mode"
          >
            <Select placeholder="请选择" style={{width: 100}}>
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          </FormItem>
          <FormItem
              label="加盟商授权状态"
              name="auth_status"
          >
            <Select placeholder="请选择" style={{width: 100}}>
              <Option value="">全部</Option>
              <Option value="1">已授权</Option>
              <Option value="2">未授权</Option>
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

// class OpenCityForm extends Component {
//   render() {
//     const formItemLayout = {
//       labelCol: {
//         span: 5
//       },
//       wrapperCol: {
//         span: 19
//       }
//     };
//     return (
//         <Form
//             layout="horizontal"
//             name="开通城市"
//             ref={this.formRef}
//         >
//           <FormItem
//               label="选择城市"
//               name="city_id"
//               {...formItemLayout}
//           >
//             <Select style={{width: 240}}>
//               <Option value="">全部</Option>
//               <Option value="1">北京市</Option>
//               <Option value="2">天津市</Option>
//             </Select>
//           </FormItem>
//           <FormItem
//               label="运营模式"
//               name="op_mode"
//               {...formItemLayout}
//           >
//             <Select>
//               <Option value="1">自营</Option>
//               <Option value="2">加盟</Option>
//             </Select>
//           </FormItem>
//           <FormItem
//               label="用车模式"
//               name="bike_mode"
//               {...formItemLayout}
//           >
//             <Select>
//               <Option value="1">指定停车点</Option>
//               <Option value="2">禁停区</Option>
//             </Select>
//           </FormItem>
//         </Form>
//     );
//   }
// }

// import React from "react";
// import {Card, Form, Input, Button, Modal} from "antd";
// const FormItem = Form.Item;
//
// export default class FormRef extends React.Component {
//   formRef = React.createRef();
//
//   state = {
//     visible: false
//   };
//
//   setVisible = (visible) => {
//     this.setState({
//       visible: visible
//     })
//   };
//
//   handleSubmit = (values) => {
//     let userInfo = this.formRef.current.getFieldsValue();
//     console.log(userInfo);
//   };
//
//   handleShowModal = () => {
//     this.setVisible(true)
//   };
//
//   render() {
//     return (
//         <div>
//           <Button onClick={this.handleShowModal}>show modal</Button>
//           <Card title="登录水平表单" style={{marginTop: 10}}>
//
//           </Card>
//           <Modal
//               visible={this.state.visible}
//               onOk={this.handleSubmit}
//               onCancel={this.setVisible.bind(this,false)} //注意这里要用上bind
//           >
//             <Form style={{width: 300}} ref={this.formRef}>
//               <FormItem name="username">
//                 <Input placeholder="请输入用户名"/>
//               </FormItem>
//               <FormItem name="password">
//                 <Input type="password" placeholder="请输入密码"/>
//               </FormItem>
//             </Form>
//           </Modal>
//         </div>
//     );
//   }
// }
