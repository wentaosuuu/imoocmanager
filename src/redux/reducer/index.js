// Reducer 数据处理
import {type} from "../action";

const initialState = {
  menuName:'首页'
};

export default (state = initialState, action) => {
  switch (action) {
    case type.SWITCH_MENU:
      return {
        ...state, // 把原有的对象解构出来
        menuName: action.menuName
      }
      break;
    default:
      break;
  }
}
