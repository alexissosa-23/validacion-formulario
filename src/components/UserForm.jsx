import React, { useReducer } from 'react';
import './UserForm.css';

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

const formReducer = (state, action) => {
    switch(action.type) {
        case 'SET_FIRST_NAME':
            return {
                ...state,
                firstName: {
                    value: action.payload,
                    error: action.payload.length < 2 ? 'First Name must be at least 2 characters' : null
                }
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                lastName: {
                    value: action.payload,
                    error: action.payload.length < 2 ? 'Last Name must be at least 2 characters' : null
                }
            };
        case 'SET_EMAIL':
            const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.payload) ? null : 'Email is not valid';
            return {
                ...state,
                email: {
                    value: action.payload,
                    error: emailError
                }
            };
        default:
            return state;
    }
};

const UserForm = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", state);
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label>First Name:</label>
                <input 
                    type="text" 
                    value={state.firstName.value}
                    onChange={(e) => dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })}
                />
                {state.firstName.error && <p className="error">{state.firstName.error}</p>}
            </div>
            <div className="form-group">
                <label>Last Name:</label>
                <input 
                    type="text" 
                    value={state.lastName.value}
                    onChange={(e) => dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })}
                />
                {state.lastName.error && <p className="error">{state.lastName.error}</p>}
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input 
                    type="email" 
                    value={state.email.value}
                    onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                />
                {state.email.error && <p className="error">{state.email.error}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserForm;
