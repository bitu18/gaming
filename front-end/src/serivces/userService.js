import httpRequest from '~/untils/httpRequest';

export const userLoginByEmail = async (payload) => {
    try {
        const res = await httpRequest.post('/auth/login', payload);
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

export const userSignupByEmail = async (payload) => {
    try {
        const res = await httpRequest.post('/auth/register', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const verifyEmail = async (email, code) => {
   try {
        const res = await httpRequest.post('/auth/verify-email', { email, code });
        return res.data;
   } catch(error) {
         throw error;
   }
}

export const userSignupByGoogle = async (data) => {
    try {
        const res = await httpRequest.post('/create-new-user-by-google', data); // direct, not wrapped in { data }
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
        const res = await httpRequest.get('/user/profile');
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


export const getProfile = async (data) => {

}
