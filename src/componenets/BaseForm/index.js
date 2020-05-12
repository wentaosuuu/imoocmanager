import React, {Component} from "react";
import {Button, Checkbox, Form, Input, Select} from "antd";
import Utils from "../../utils/utils";

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component{

  // handleFilterSumbit = () => {
  //     this.fieldsValue = this.props.form.getFieldsValue();
  //     this.props.filterSubmit(fieldsValue)
  // };
  initFormList = () => {
    const {getFieldDecorator} = this.props.form; //这些方法现在都已经弃用了
    const formList = this.props.formList;
    const formItemList = [];
    if (formList && formList.length>0){
      formList.forEach((item,i)=>{
        let label = item.label;
        let field = item.field;
        let initValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;
        if (item.type === 'INPUT'){
          const INPUT = <FormItem label={label} key={field}>
            <Input type="text" placeholder={placeholder} />
          </FormItem>;
          formItemList.push(INPUT);
        }else if (item.type === 'SELECT'){
          const SELECT = <FormItem label={label} key={field}>
            <Select
              style={{width:width}}
              placeholder={placeholder}
            >
              {Utils.getOptionList(item.list)}
            </Select>
          </FormItem>;
          formItemList.push(SELECT);
        }else if (item.type === 'CHECKBOX'){
          const CHECKBOX = <FormItem label={label} key={field}>
            <Checkbox>
              {label}
            </Checkbox>
          </FormItem>;
          formItemList.push(CHECKBOX);
        }
      })
    }
    return formItemList;
  };
  render() {
    return (
      <Form>
        {this.initFormList()}
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSumbit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

//export default Form.create({})(FilterForm);
