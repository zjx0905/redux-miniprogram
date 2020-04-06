import { ConnectComponent } from "redux-miniprogram";
Component(ConnectComponent()({
    properties: {
        item: Object,
    },
    methods: {
        handleStateChange() {
            this.store.dispatch({
                type: "CHANGE_TODO",
                payload: this.data.item.id,
            });
        },
    },
}));
