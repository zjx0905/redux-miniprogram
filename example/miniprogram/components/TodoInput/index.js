import { ConnectComponent } from "redux-miniprogram";
Component(ConnectComponent((state) => ({
    inputValue: state.inputValue,
}))({
    methods: {
        handleInputValueChange(e) {
            this.store.dispatch({
                type: "SAVE_INPUT_VALUE",
                payload: e.detail.value,
            });
        },
        handleAddTodo() {
            if (this.store.inputValue === "") {
                return;
            }
            this.store.dispatch({
                type: "ADD_TODO",
                payload: this.store.inputValue,
            });
            this.store.dispatch({
                type: "SAVE_INPUT_VALUE",
                payload: "",
            });
        },
    },
}));
