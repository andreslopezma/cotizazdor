import axios from "axios";

export const fetchData = async ({ url }) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteData = async ({ url }) => {
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createData = async ({ url, params }) => {
    try {
        const response = await axios.post(url, transformData(params));
        return response.data;
    } catch (error) {
        throw error;
    }
}

const transformData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(name => {
        formData.append([name], data[name]);
    });
    return formData;
}