import { useEffect } from 'react';
import axios, { axiosPrivate } from '../api/api';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    // make interceptor for request, so every request will have the token
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {

                // get the token from auth context
                const token = auth?.token;

                // set the token to the request header
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `${token}`;
                }
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    
        // make interceptor for response, so every response will check if the request is unauthorized
        // because the token is expired, we call the refresh token to get the new token
        // and then we call the request again with the new token
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                // get the original request
                const originalRequest = error.config;
                
                // if the original request get response 401 from the server that means the token is expired
                // and we need to get the new token and sent the request again
                if (error.response.status === 401 && !originalRequest.sent) {
                    originalRequest.sent = true;
    
                    try {
                        console.log("Refreshing Token....");
                        // get new token
                        const response = await axios.get('/token', {
                            withCredentials: true
                        });

                        const newToken = response.data.data.token;
                        const user = response.data.data.user;
                        
                        // set new token to auth context
                        setAuth((prevAuth) => (
                            {
                                ...prevAuth,
                                token: newToken,
                                user: user
                            }
                        ));

                        // set new token to the original request header
                        originalRequest.headers['Authorization'] = `${newToken}`;
                        
                        return axiosPrivate(originalRequest);
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
    
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, setAuth]);

    return axiosPrivate;
}

export default useAxiosPrivate;
