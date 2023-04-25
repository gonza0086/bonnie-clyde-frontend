//  Hooks
import { cloneElement, useState } from 'react';

// Mui
import { Button } from '@mui/material';

export default function Form({ children, onSubmit }) {
    const initializeValueObject = () => {
        let initialIsValidObject = {};
        let initialValueObject = {};

        children.forEach(input => {
            initialIsValidObject[input.props.id] = input.props.required === undefined;
            initialValueObject[input.props.id] = '';
        });

        return { initialIsValidObject, initialValueObject };
    };

    const { initialValueObject, initialIsValidObject } = initializeValueObject();
    const [values, setValues] = useState(initialValueObject);
    const [isValid, setIsValid] = useState(initialIsValidObject);

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(values);
    };

    const handleValueUpdate = (id, newValue, isValueValid) => {
        setValues(prevValues => ({ ...prevValues, [id]: newValue }));
        setIsValid(prevIsValid => ({ ...prevIsValid, [id]: isValueValid }));
    };

    const isDisabled = () => {
        return Object.values(isValid).includes(false);
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            {children.map(input => cloneElement(input, { key: input.props.id, updateValue: handleValueUpdate }))}
            <Button className='form-button' type='submit' variant='contained' color='secondary' disabled={isDisabled()}>
                Signup
            </Button>
        </form>
    );
}
