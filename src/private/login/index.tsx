import * as React from 'react';
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const auth = useAuth();
    const location: any = useLocation();
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const [formState, setFormState] = useState<any>({
        email: "",
        password: ""
    });

    let from = location.state?.from?.pathname || "/";

    React.useEffect(() => {
        if (auth.user) navigate(from, { replace: true });
    })

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        let error = false;

        if (formState.email.length < 1 || !validateEmail(formState.email)) {
            setEmailError(true);
            error = true
        }

        if (formState.password.length < 1) {
            setPasswordError(true);
            error = true;
        }

        if (!error) {
            auth.signin(formState.email, formState.password).then((r, e) => {
                navigate(from, { replace: true });
            });
        }
    };

    const handleFormChange = (event: any) => {
        // Reset validation
        if (event.target.name === "email" && validateEmail(event.target.value)) setEmailError(false);
        if (event.target.name === "password") setPasswordError(false);

        const value = event.target.value;

        setFormState({
            ...formState,
            [event.target.name]: value
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xs-12 col-md-6 col-lg-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;