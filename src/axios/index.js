import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from "antd";

export default class Axios {
  static jsonp(options){
    return new Promise((resolve, reject)=>{
      JsonP(options.url,{
        param:'callback'
      }, function (err,response) {
        if (response.status == 'success'){
          resolve(response);
        }else {
          reject(response.message);
        }
      })
    })
  }

  static ajax(options){
    let loading;
    if (options.data && options.data.isShowLoading !== false){
      loading = document.getElementById("ajaxLoading");
      loading.style.display = 'block';
    }
    //Promise封装是面试可定会问到的
    //回答: Promise里面会接收一个回调函数, 里面有2个参数 resolve 和 reject, 成功时和失败时返回
    return new Promise((resolve,reject)=>{
      let baseApi = 'http://106.12.220.186:4000/api';
      axios({
        url: options.url,
        method:'get',
        baseURL:baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then((response)=>{
        if (options.data && options.data.isShowLoading !== false){
          loading = document.getElementById("ajaxLoading");
          loading.style.display = 'none';
        }
        if (response.status == '200'){
          let res = response.data;
          if (res.code == '0'){
            resolve(res);
          }else {
            Modal.info({
              title: "提示",
              content: res.msg
            })
          }
        }else {
          reject(response.data);
        }
      })
    });
  }

}
