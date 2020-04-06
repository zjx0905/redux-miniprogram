import { ConnectComponent } from "redux-miniprogram";
Component(ConnectComponent((state) => ({
    todoList: state.todoList,
}))({}));
