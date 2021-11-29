import apiClientWithToken from './clientTokenAuth'

const endpoint = "/api/item";

export const getItems = async (token) =>{
    //const response = await apiClientWithToken(token).get(endpoint)
    const response = await apiClientWithToken(token).get("/products")
    if (400 <= response.status && response.status < 500){return 400;}
    if (500 <= response.status && response.status < 600){return 500;}
    if (response.ok){return response.data.items}
    return
}

export const getItemsByCat = async (token,id)=>{
    const response = await apiClientWithToken(token).get(endpoint+'/category/'+id)
    if (400 <= response.status && response.status < 500){return 400;}
    if (500 <= response.status && response.status < 600){return 500;}
    if (response.ok){return response.data.items}
    return
}

export const getItem = async (token,id)=>{
    const response = await apiClientWithToken(token).get(endpoint+'/'+id)
    if (400 <= response.status && response.status < 500){return 400;}
    if (500 <= response.status && response.status < 600){return 500;}
    if (response.ok){return response.data}
    return
}

export const postItem = async (token, data)=>{
    const response= await apiClientWithToken(token).post(endpoint, data);
    if (response.ok){return true}else{return false}
}

export const putItem = async (token, id, data)=>{
    const response= await apiClientWithToken(token).put(endpoint+"/"+id, data);
    if (response.ok){return true}else{return false}
}

export const deleteItem = async (token, id)=>{
    const response= await apiClientWithToken(token).delete(endpoint+"/"+id);
    if (response.ok){return true}else{return false}
}
