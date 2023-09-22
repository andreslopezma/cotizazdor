import { useState } from "react";

const useForm = (initState) => {
    const [formulario, setFormulario] = useState(initState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const handleInputMulti = ({ target }) => {
        const { selectedOptions } = target;
        let movies = [];
        for (var i = 0; i < selectedOptions.length; i++) {
            const { value } = selectedOptions.item(i);
            movies.push(value);
        }
        setFormulario({ ...formulario, 'movies': movies });
    }

    return {
        handleInputChange,
        handleInputMulti,
        setFormulario,
        formulario
    }

}

export default useForm;