import httpRequest from '~/untils/httpRequest';

export const userLoginByEmail = async (email, password) => {
    try {
        const res = await httpRequest.post('/login-by-gmail', {
            email,
            password,
        });

        return res.data;
    } catch (error) {
        throw error;
    }
};

export const userLoginByGoogle = async (googleId, email) => {
    try {
        const res = await httpRequest.post('/login-by-google', {
            googleId,
            email,
        });

        return res.data;
    } catch (error) {
        throw error;
    }
};

export const userSignupByEmail = async (data) => {
    try {
        const res = await httpRequest.post('/create-new-user-by-gmail', data); // direct, not wrapped in { data }
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const userSignupByGoogle = async (data) => {
    try {
        const res = await httpRequest.post('/create-new-user-by-google', data); // direct, not wrapped in { data }
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const checkExistedEmail = async (email) => {
    try {
        const res = await httpRequest.post('/check-email-exists', { email });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const sendCodeToConfirm = async (email) => {
    try {
        const res = await httpRequest.post('/send-code', { email });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const verifyCode = async (email, code) => {
    try {
        const res = await httpRequest.post('/verify-code', { email, code });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getInforUser = async () => {
    try {
        const res = await httpRequest.get('/user/get-user');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserInfor = async (data) => {
    try {
        const res = await httpRequest.put(`/user/update-user`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUserAccount = async () => {
    try {
        const res = await httpRequest.delete('/user/delete-user');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const userLogout = async () => {
    try {
        const res = await httpRequest.post('/user/logout');
        return res.data;
    } catch (error) {
        throw error;
    }
};
