import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

function useLogin(dataUser) {
    // const navigate = useNavigate();

    return useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                const profile = await res.json();
                dataUser(profile);
            } catch (err) {
                console.error('Error fetching Google profile:', err);
            }
        },
        onError: (err) => console.error('Google Login Failed:', err),
    });
}

export default useLogin;
