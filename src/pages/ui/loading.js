import React, {Component} from "react";
import {Alert, Card, Spin} from "antd";
import './ui.less';
import { LoadingOutlined, RightOutlined, PlusOutlined  } from '@ant-design/icons';

export default class Loading extends Component{
  render() {
    //这个是老版本的写法了
    // const icon = <Icon type="loading" style={{fontSize:24}}/>;

    //这个是解决办法
    const icon = <LoadingOutlined  style={{ fontSize: 24 }} spin />;

    return(
        <div style={{width:'100%'}}>
          <Card title="Spin用法" className="card-wrap">
            <Spin size={"small"} />
            <Spin style={{margin:'0 10px'}}/>
            <Spin size={"large"}/>
            <Spin indicator={icon} style={{marginLeft:10}}/> {/*如果是字符串形式, 就不能省略px*/}
          </Card>

          <Card title="内容遮罩" className="card-wrap">
            <Alert
                message="React"
                description="欢迎来到React实战课程"
                type="info"
            />
            <Spin>
              <Alert
                  message="React"
                  description="欢迎来到React实战课程"
                  type="warning"
              />
            </Spin>
            <Spin tip="加载中...">
              <Alert
                  message="React"
                  description="欢迎来到React实战课程"
                  type="warning"
              />
            </Spin>
            <Spin indicator={icon}>
              <Alert
                  message="React"
                  description="欢迎来到React实战课程"
                  type="warning"
              />
            </Spin>
          </Card>
        </div>
    );
  }
}


