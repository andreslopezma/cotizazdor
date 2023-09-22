import { useState } from "react";
import { createData } from "../services/dataService";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useCreate = (endpoint, reload) => {
    const native = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sendData = async (params) => {
        try {
            const result = await createData({ url: `${BASE_URL}${endpoint}`, params });
            setResponse(result);
            enqueueSnackbar(result.message, { variant: 'success' });
            native(reload);
        } catch ({ response }) {
            const { data } = response;
            enqueueSnackbar(data.error, { variant: 'error' });
            setError(data.error);
        } finally {
            setLoading(false);
        }
    }

    return { response, loading, error, sendData };
}

export default useCreate;