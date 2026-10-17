const { createSlice } = require('@reduxjs/toolkit');

const logInSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: true,
    },

    reducers: {
        setLogin: (state, action) => {},
    },
});

export const { setLogin } = logInSlice.actions;
export default logInSlice.reducer;
