import { useState } from "react";

const useForm = (initState) => {
    const [formulario, setFormulario] = useState(initState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    return {
        handleInputChange,
        setFormulario,
        formulario
    }

}

export default useForm;