/*
 * @Author: early-autumn
 * @Date: 2020-04-06 17:27:23
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 23:41:19
 */
import { createStore, Store, AnyAction } from "redux";

export interface TodoItem {
  id: number;
  state: boolean;
  value: string;
}

export interface ConnectState {
  inputValue: string;
  todoList: TodoItem[];
}

let id = 0;

const initState: ConnectState = {
  inputValue: "",
  todoList: [],
};

const store: Store<ConnectState> = createStore(
  (state: ConnectState = initState, action: AnyAction) => {
    switch (action.type) {
      case "SAVE_INPUT_VALUE":
        return {
          ...state,
          inputValue: action.payload,
        };

      case "ADD_TODO":
        return {
          ...state,
          todoList: [
            {
              id: ++id,
              state: false,
              value: action.payload,
            },
            ...state.todoList,
          ],
        };

      case "CHANGE_TODO":
        return {
          ...state,
          todoList: state.todoList.map((item) => {
            if (item.id === action.payload) {
              item.state = !item.state;
            }

            return { ...item };
          }),
        };

      default:
        return state;
    }
  }
);

export default store;
