//虽然这是3.0版本的antd, 但是还是根据视频中的代码补完整, 日后自己再研究(如果有时间的话)

// import React, {Component} from "react";
// import {Button, Card, Checkbox, Form, Icon, Input, message} from "antd";
//
// const FormItem = Form.Item;
//
// class FormLogin extends Component{
//
//   handleSubmit = () => {
//     let userInfo = this.props.form.getFieldsValue();
//     this.props.form.valideFields((err,values)=>{
//       if (!err){
//         message.success(`${userInfo.userName} 恭喜你, 完成本次表单组件学习, 当前密码为: ${userInfo.userPwd}`)
//       }
//     });
//   };
//
//   render() {
//
//     const {getFieldDecorator} = this.props.form;
//
//     return(
//         <div style={{width:'100%'}}>
//           <Card title="登录行内表单">
//             <Form layout="inline">
//               <FormItem>
//                 <Input placeholder="请输入用户名"/>
//               </FormItem>
//               <FormItem>
//                 <Input placeholder="请输入密码"/>
//               </FormItem>
//               <FormItem>
//                 <Button type="primary">登录</Button>
//               </FormItem>
//             </Form>
//           </Card>
//           <Card title="水平表单" style={{marginTop:10}}>
//             <Form
//               style={{width:300}}
//               layout="horizontal"
//             >
//               <FormItem>
//                 {
//                   getFieldDecorator('userName',{
//                     initialValue:'',
//                     rules:[
//                       {
//                         required: true,
//                         message:'用户名不能为空'
//                       },
//                       {
//                         min:5,
//                         max:10,
//                         message: '长度不在范围内'
//                       },
//                       {
//                         pattern: /^\w+$/g,
//                         //这种写法是正则表达式
//                         // pattern: new RegExp('/^\\w'+'$/g')
//                         message:'用户名必须为英文字母'
//                       }
//                     ]
//                   })(<Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>)
//                 }
//               </FormItem>
//               <FormItem>
//                 {
//                   getFieldDecorator('userPwd',{
//                     initialValue:'',
//                     rules:[]
//                   })(<Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>)
//                   // 这个Icon写法肯定是不行的, 这个是3.0的写法, 现在4.0需要引入Icon组件才行, 我是知道怎么做的
//                 }
//               </FormItem>
//               <FormItem>
//                 {
//                   getFieldDecorator('remember',{
//                     valuePropName: 'check',
//                     initialValue: false
//                   })(
//                    <Checkbox>记住密码</Checkbox>
//                   )
//                 }
//                  <a href="#" style={{float: 'right'}}>忘记密码</a>
//               </FormItem>
//               <FormItem>
//                 <Button type="primary" onClick={this.handleSubmit}>登录</Button>
//               </FormItem>
//             </Form>
//           </Card>
//         </div>
//     );
//   }
// }
//
// export default Form.create()(FormLogin);


//这个是老师在评论区给的解决方法, 会在console.log中打印出账号密码

import React, {Component} from "react";
import {Card, Form, Input, Button} from "antd";

const FormItem = Form.Item;

export default class FormLogin extends Component {

  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      username: 'Bamboo',
    });
  }

  handleSubmit = (values) => {
    let userInfo = this.formRef.current.getFieldsValue();
    console.log(userInfo);
  };

  render() {
    return (
        <div style={{width:'100%'}}>
          <Card title="登录水平表单" style={{marginTop: 10}}>
            <Form style={{width  : 300}} ref={this.formRef}>
              <FormItem name="username">
                <Input placeholder="请输入用户名"/>
              </FormItem>
              <FormItem name="password">
                <Input type="password" placeholder="请输入密码"/>
              </FormItem>
              <FormItem>
                <Button type="primary" onClick={this.handleSubmit}>登录</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
    );
  }
}
