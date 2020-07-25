import { useState } from 'react';
import { without } from 'lodash';


const getErrorMessage = (element) => {
    const elementDisplayName = element.dataset.displayName || element.name;
    let errorMessage;
    if (element.validity.valueMissing) {
        errorMessage = `${elementDisplayName} is required`;
    } else if (element.validity.typeMismatch) {
        errorMessage = `Please provide a valid ${element.type}`;
    } else {
        errorMessage = `Invalid ${elementDisplayName}`;
    }
    return errorMessage;
}

export const useCKSForm = (initialValue = {}) => {
    const [formData, setFormData] = useState({ ...initialValue });
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setFormData({ ...initialValue })
    }

    const validate = (form) => {
        const isFormValid = form.checkValidity();
        const formErrors = isFormValid ? undefined : [...form.elements]
            .filter(element => Boolean(element.name))
            .filter(element => !element.checkValidity())
            .reduce((errors, element) => ({ ...errors, [element.name]: getErrorMessage(element) }), {});

        if (formErrors) {
            setErrors(formErrors);
            return false;
        } else {
            setErrors({});
            return true;
        }
    }

    const onChangeField = (event) => {
        if (event.target.name) {
            const targetType = (event.target.type || 'UNKNOWN').toUpperCase();
            if (targetType === "CHECKBOX") {
                const checked = event.target.checked;
                const nextValue = (checked)
                    ? [...formData[event.target.name], event.target.value]
                    : without(formData[event.target.name], event.target.value);
                setFormData({ ...formData, [event.target.name]: nextValue });
            } else {
                setFormData({ ...formData, [event.target.name]: event.target.value });
            }
        }
    }
    return {
        formData,
        onChangeField,
        resetForm,
        validate,
        errors,
        setErrors
    }
}