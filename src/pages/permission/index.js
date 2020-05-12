import React, {Component, createRef} from "react";
import {Button, Card, Form, Input, message, Modal, Select, Table, Transfer, Tree} from "antd";
import Utils from "../../utils/utils";
import axios from './../../axios/index';
import data from './../../config/menuConfig';
import menuConfig from "../../config/menuConfig";

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class PermissionUser extends Component {
  formRef = createRef();
  state = {
    isRoleVisible: false,
    isPermVisible: false
  };
  params = {};

  componentWillMount() {
    this.requestList();
  }

  //请求接口数据
  requestList = () => {
    let _this = this; //这是为了区分作用域的问题, 不然this指向会出错
    axios.ajax({
      url: '/role/list',
      data: {
        params: {
          page: 1
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

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
    console.log(record);
  };

  // 打开创建角色弹框
  handleCreateUser = () => {
    this.formRef.current.setFieldsValue({
      status: this.state.selectedItem
    });
    this.setState({
      isRoleVisible: true
    })
  };

  // 角色提交
  handleRoleSubmit = () => {
    let data = this.formRef.current.getFieldsValue();
    axios.ajax({
      url: '/role/create',
      data: {
        params: data
      }
    }).then((res) => {
      if (res.code === 0) {
        message.success("创建成功");
        this.setState({
          isRoleVisible: false
        });
        this.formRef.current.resetFields();
        this.requestList();
      }
    })
  };

  // 权限设置
  handlePermission = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一个角色'
      });
      return;
    } else {

      this.setState({
        isPermVisible: true,
        detailInfo: item
      });
    }
  };

  handlePermEditSubmit = () => {
    this.setState({
      isPermVisible: false
    })
  };

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      } else {
        return <TreeNode {...item} />
      }
    })
  };

  // 用户授权
  handleUserAuth = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一个角色'
      });
      return;
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item
    });
    this.getRoleUserList(item.id);
  };

  getRoleUserList = (id) => {
    axios.ajax({
      url: '/role/user_list',
      data: {
        params: {
          id
        }
      }
    }).then((res) => {
      if (res) {
        this.getAuthUserList(res.result);
      }
    })
  };

  // 筛选目标用户
  getAuthUserList = (dataSource) => {
    const mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        };
        if (data.status == 1) {
          targetKeys.push(data.key); // targetKeys是key的集合, 不是对象的集合. 所以不能只写data, 要把key值传进去
        }
        mockData.push(data); // 这里不能是互斥的作用(不能放在else里), 因为mockData是全量数据, 需要从接口里获得全部数据, 根据status==1, 把key值挑出来, 组件会自动做一些过滤. key会一一映射. 把相同key值放在后侧. 所以不能是互斥的关系
      }
      this.setState({
        mockData,
        targetKeys
      })
    }
  };

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };

  handleChange = (targetKeys) => {
    this.setState({
      targetKeys
    })
  };

  // 用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedItem.id;
    axios.ajax({
      url:'/role/user_role_edit',
      data:{
        params:{
          ...data
        }
      }
    }).then((res)=>{
      if (res){
        this.setState({
          isUserVisible:false
        });
        this.requestList();
      }
    })
  };

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formateDate
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          return status === 1 ? '启用' : '停用'
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
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
          <Button type="primary" onClick={this.handleCreateUser}>创建角色</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={this.handlePermission}>设置权限</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            //pagination={false}
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
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.formRef.current.resetFields();
            this.setState({
              isRoleVisible: false
            })
          }}
        >
          <Form
            name="userCreate"
            ref={this.formRef}
          >
            <FormItem
              label="角色名称"
              name="userName"
              {...formItemLayout}
            >
              <Input type="text" placeholder="请输入角色名称"/>
            </FormItem>
            <FormItem
              label="状态"
              name="status"
              {...formItemLayout}
            >
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>停用</Option>
              </Select>
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
        >
          <Form
            label="设置权限"
            layout="horizontal"
            ref={this.formRef}
          >
            <FormItem label="角色名称" name="roleName" {...formItemLayout}>
              <Input disabled/>
            </FormItem>
            <FormItem label="状态" name="status"  {...formItemLayout}>
              <Select>
                <Option value={1}>启用</Option>
                <Option value={0}>停用</Option>
              </Select>
            </FormItem>
            <Tree
              checkable
              defaultExpandAll
              onCheck={(checkedKeys) => {
                this.onCheck(checkedKeys)
              }}
            >
              <TreeNode title="平台权限" key="platform_all">
                {
                  this.renderTreeNodes(menuConfig)
                }
              </TreeNode>
            </Tree>
          </Form>
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={700}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            })
          }}
        >
          <Form
            ref={this.formRef}
            layout="horizontal"
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
          >
            <FormItem label="角色名称" name="roleName" {...formItemLayout}>
              <Input disabled/>
            </FormItem>
            <FormItem label="选择用户" name="transfer" {...formItemLayout}>
              <Transfer
                dataSource={this.state.mockData}
                titles={['待选用户','已选用户']}
                showSearch
                searchPlaceholder='输入用户名'
                filterOption={this.filterOption}
                targetKeys={this.state.targetKeys}
                render={item => item.title} // 这个render可以显示用户名, 没有这个方法不行
                listStyle={{width:200, height:400}}
                onChange={this.handleChange}
              />
            </FormItem>
          </Form>

        </Modal>
      </div>
    );
  }
}
