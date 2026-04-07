export const ACTIONS = {
    NAME_CHANGE: "NAME_CHANGE",
    USERNAME_CHANGE: "USERNAME_CHANGE",
    EMAIL_CHANGE: "EMAIL_CHANGE",
    PASSWORD_CHANGE: "PASSWORD_CHANGE"
};

export const initialState= {
    name: { value: "", isValid: false},
    username: { value: "", isValid: false},
    email: { value: "", isValid: false},
    password: {
        valid: "",
        validations: {
            hasLowerCase:  false,
            hasUpperCase: false,
            hasNumber: false,
            hasSpecialChar: false,
            minLength: false,
        },
    },
};

const NAME_PATTERN = /^[A-Za-z\s]{3,}$/;
const USERNAME_PATTERN = /^[A-Za-z0-9]{3,}&/;
const EMAIL_PATTERN = /^(?<Username>[a-z]\w+\.?\_?\w+)@(?<Domain>\w+)\.(?<TLD>[a-z]{2,3})$/;

export const signupReducer = (state= initialState , action) => {
    const { type, payload } =action;

    switch (type) {
        case ACTIONS.NAME_CHANGE:
            const isNameValid = NAME_PATTERN.test(payload);
            return{
                ...state,
                name: { value: payload, isValid: isNameValid} 
            };

        case ACTIONS.USERNAME_CHANGE:
            const isUsernameValid = USERNAME_PATTERN.test(payload);
            return{
                ...state,
                name: { value: payload, isValid: isUsernameValid}  
            };
         
        case ACTIONS.EMAIL_CHANGE:
            const isEmailValid = EMAIL_PATTERN.test(payload);
            return{
                ...state,
                name: { value: payload, isValid: isEmailValid} 
            };  
            
        case ACTIONS.PASSWORD_CHANGE:
            const password = payload;
            const hasLowerCase = /[a-z]/.test(password);
            const hasUpperCase = /[A-Z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*()?]/.test(password);
            const minLength = password.length >=8 ; 
            
            return { 
                ...state,
                password: {
                    value: password,
                    validations: {
                        hasLowerCase,
                        hasUpperCase,
                        hasNumber,
                        hasSpecialChar,
                        minLength,
                    },
                },
            };
    }
};