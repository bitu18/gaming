import { logInReducer } from './reducerStore';
const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
    reducer: {
        userLogin: logInReducer,
    },
});

export default store;
