// 引入createStore 创建 store

import {createStore} from 'redux';
import reducer from './../reducer';
//import {composeWithDevTools} from "redux-devtools-extension";

export default (prevState) => createStore(reducer, prevState)

