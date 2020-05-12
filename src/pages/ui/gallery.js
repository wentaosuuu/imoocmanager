import React, {Component} from "react";
import {Card, Col, Modal, Row} from "antd";

export default class Gallery extends Component{

  state = {
    visible: false
  };

  handleOpenGallery = (imgSrc) => {
    this.setState({
      visible: true,
      currentImg: '/gallery/'+imgSrc
    })
  };

  render() {

    const imgs = [
      ['1.png','2.png','3.png','4.png', '5.png'],
      ['6.png','7.png','8.png','9.png', '10.png'],
      ['11.png','12.png','13.png','14.png', '15.png'],
      ['16.png','17.png','18.png','19.png', '20.png'],
      ['21.png','22.png','23.png','24.png', '25.png'],
    ];

    //map后面如果只有一个表达式, 可以省略大括号, 否则不能省略
    //这里有2个map就是做一个两层的循环
    const imgList = imgs.map((list)=>
        list.map((item)=>
          <Card
              style={{marginBottom:'10'}}
              cover={<img src={'/gallery/'+item} /> }
              onClick={() => this.handleOpenGallery(item)}
          >
            {/*设置卡片封面信息*/}
            <Card.Meta
              title="React Admin"
              description="I Love Imooc"
            />
          </Card>
    ));

    return(
      <div className="card-wrap">
        <Row gutter={10}> {/*gutter是设置水平方向间隙*/}
          <Col md={5}>
            {imgList[0]}
          </Col>
          <Col md={5}>
            {imgList[1]}
          </Col>
          <Col md={5}>
            {imgList[2]}
          </Col>
          <Col md={5}>
            {imgList[3]}
          </Col>
          <Col md={4}> {/*只能有24个栅格, 所有最后一个只能是4*/}
            {imgList[4]}
          </Col>
        </Row>
        <Modal
          title="图片画廊"
          visible={this.state.visible}
          onCancel={()=>{
            this.setState({
              visible: false
            })
          }}
          footer={null} //取消页脚
        >
          {<img src={this.state.currentImg} alt="" style={{width:'100%'}} />}
        </Modal>
      </div>
    );
  }
}
