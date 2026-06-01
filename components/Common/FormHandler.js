function ValidateForm(prop, value, Model, validation, ValidationErrors, setValidationErrors, setIsValidForm) {
    let isValid = true;
    let isPropValid = true;

    for (const item in validation) {
        let validationItem = validation[item];
        let validateError = validationItem.Validate(item === prop ? value : Model[item]);
        if (validateError) {
            isValid = false;
            if (item === prop) {
                setValidationErrors(err => [...err, validateError]);
                isPropValid = false;
                break;
            }
            else {
                let errors = ValidationErrors.filter(f => f.PropertyName !== prop);
                if (errors) {
                    setValidationErrors(errors);
                }
            }
        }
        else {
            let errors = ValidationErrors.filter(f => f.PropertyName !== prop);
            if (errors) {
                setValidationErrors(errors);
            }
        }
    }

    if (setIsValidForm) {
        setIsValidForm(isValid);
    }

    return isPropValid;
}

const KeyPress = (e, callbackFn) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (callbackFn) {
            callbackFn();
        }
    }
}

function SetError(prop, ValidationErrors) {
    if (!ValidationErrors || ValidationErrors.length === 0) {
        return { IsError: false, ErrorMessage: '' }
    }

    let validError = ValidationErrors.filter(f => f.PropertyName === prop);
    if (!validError || validError.length === 0) {
        return { IsError: false, ErrorMessage: '' }
    }

    return { IsError: true, ...validError.pop() };
}

const setFormTextValues = (prop, dataType, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm) => {
    let val;

    if (event.target.value) {
        try {
            switch (dataType) {
                case 'int':
                    val = parseInt(event.target.value);
                    break;
                case 'float':
                    val = parseFloat(event.target.value);
                    break;
                default:
                    val = event.target.value.toString();

            }
        }
        catch {
            val = undefined;
        }
    }

    if (!val) {
        val = event.target.value;
    }

    ValidateForm(prop, val, Model, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    setModel({ ...Model, [prop]: val });
};

const setFormCheckValues = (prop, event, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm) => {
    ValidateForm(prop, event.target.checked, Model, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    setModel({ ...Model, [prop]: event.target.checked });
};

const setFormDateValues = (prop, newDate, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm) => {
    ValidateForm(prop, newDate ? newDate.toString() : null, Model, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    setModel({ ...Model, [prop]: newDate ? newDate.toString() : null });
};

const setFormAutoCompleteValues = (prop, value, Model, setModel, validation, ValidationErrors, setValidationErrors, setIsValidForm) => {
    let id = value ? value.Id : 0;
    ValidateForm(prop, id, Model, validation, ValidationErrors, setValidationErrors, setIsValidForm);
    setModel({ ...Model, [prop]: value });
};

export const FormHandler = {
    ValidateForm, KeyPress, SetError,
    setFormTextValues, setFormCheckValues, setFormDateValues,
    setFormAutoCompleteValues
};