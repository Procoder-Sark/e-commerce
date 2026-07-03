import { useContext } from "react";
import { axiosInstance, REQUEST_TYPES } from "./apiUtils";
import { UserContext } from "./UserContextProvider";


const useApi = (url, type = REQUEST_TYPES.GET) => {
    const {
        username,
        setUsername,
        message,
        setMessage,
        success,
        setSuccess,
        isLoading,
        setIsLoading,
    } = useContext(UserContext);

    const makeRequest = async (payload) => {
        try {
            setIsLoading(true);
            setMessage(null);
            
            const apiResponse = (await axiosInstance[type](url, payload)).data;
            console.log('apiResponse', apiResponse);
            const { success, message, data = null } = apiResponse;

            setSuccess(success);
            setMessage(message);
            setUsername(data);
            
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
        isLoading};
};

export default useApi;