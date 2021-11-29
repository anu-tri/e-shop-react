import apiClient from './clientBasicAuth';

const endpoint = "/auth/login";

const getToken = async (username, password) => {
    let response = await apiClient(username,password).get(endpoint);
    let error, token = '';
    if (!response.ok){error = "Unexpected error please Try again!"};
    if (response.status === 401){error = "Invalid Username/Password combo"};
    if (response.ok){token = response.data.token};
    return {"error":error, token};
};

export default getToken;