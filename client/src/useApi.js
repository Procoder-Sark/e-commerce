import { useContext } from "react";
import { axiosInstance, REQUEST_TYPES } from "./apiUtils";
import { UserContext } from "./UserContextProvider";


const useApi = (url, type = REQUEST_TYPES.GET) => {
    const {
        userData,
        setUserData,
        message,
        setMessage,
        success,
        setSuccess,
        isLoading,
        setIsLoading,
    } = useContext(UserContext);

    const makeRequest = async (payload, updateCart = false) => {
        try {
            setIsLoading(true);
            setMessage(null);

            // const apiResponse = (await axiosInstance[type](url, payload)).data;
            // console.log('apiResponse', apiResponse);

            let apiResponse;

            if (type === REQUEST_TYPES.DELETE) {
                apiResponse = await axiosInstance.delete(url, {
                    data: payload,
                });
            } else {
                apiResponse = await axiosInstance[type](url, payload);
            }
            console.log('apiResponse', apiResponse);

            // const apiResponse = response.data;


            const { success, message, data = null } = apiResponse.data;

            setSuccess(success);
            setMessage(message);
            if (updateCart) {
                setUserData(userData => ({
                    ...userData,
                    cart: data,
                }));
            } else {
                setUserData(data);
            }


        } catch (error) {
            console.log('Makerequest error', error);
            setSuccess(false);
            setMessage(error.response.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        makeRequest,
        isLoading
    };
};

export default useApi;