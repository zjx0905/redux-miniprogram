// app.ts
import { Provider } from "redux-miniprogram";
import store from "./store/index";
App(Provider(store)({}));
