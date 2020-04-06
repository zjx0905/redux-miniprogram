/*
 * @Author: early-autumn
 * @Date: 2020-04-06 17:27:23
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-06 23:41:19
 */
import { createStore } from "redux";
let id = 0;
const initState = {
    inputValue: "",
    todoList: [],
};
const store = createStore((state = initState, action) => {
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
});
export default store;
