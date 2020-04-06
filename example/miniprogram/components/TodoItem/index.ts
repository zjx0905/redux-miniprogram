// components/TodoItem/index.js
import { Dispatch } from "redux";
import { ConnectComponent } from "redux-miniprogram";

interface ConnectStore {
  dispatch: Dispatch;
}

Component(
  ConnectComponent<ConnectStore>()({
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
  })
);
