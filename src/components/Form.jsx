//  Hooks
import { cloneElement, useState } from 'react';

// Mui
import { Button } from '@mui/material';

export default function Form({ children, onSubmit, button, cancel, onCancel }) {
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

    const handleCancel = () => {
        onCancel();
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            {children.map(input => cloneElement(input, { key: input.props.id, updateValue: handleValueUpdate }))}
            {cancel && (
                <>
                    <Button className='form-button' variant='contained' color='cancel' onClick={handleCancel}>
                        Cancel
                    </Button>
                    <div style={{ display: 'inline-block', paddingInline: '1%' }} />
                </>
            )}
            <Button className='form-button' type='submit' variant='contained' color='secondary' disabled={isDisabled()}>
                {button}
            </Button>
        </form>
    );
}
