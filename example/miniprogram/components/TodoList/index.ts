// components/TodoList/index.js
import { Dispatch } from "redux";
import { ConnectComponent } from "redux-miniprogram";
import { ConnectState } from "miniprogram/store";

interface ConnectStore {
  inputValue: string;
  dispatch: Dispatch;
}

Component(
  ConnectComponent<ConnectStore>((state: ConnectState) => ({
    todoList: state.todoList,
  }))({})
);
