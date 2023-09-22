import { useEffect, useState } from "react";
import { fetchData } from "../services/dataService";

const useFetch = (endpoint) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const result = await fetchData({ url: `${BASE_URL}${endpoint}` });
            setData(result.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error};
}

export default useFetch;