import styled from "@emotion/styled";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [userNameError, setUserNameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            navigate('/');
        }
    }, [])



    const handleSignIn = (e: FormEvent) => {
        e.preventDefault();

        // get username and password from form
        // send to server
        // if success
        // navigate to dashboard
        // else
        // show error message
        setError('');
        setUserNameError('');
        setPasswordError('');
        // username is name of input
        // password is name of input


        const username = (e.target as HTMLFormElement)?.username?.value;
        const password = (e.target as HTMLFormElement)?.password?.value;

        // check user name and password not empty
        if (!username) {
            setUserNameError('Username is required');
        }
        if (!password) {
            setPasswordError('Password is required');
        }
        if (!!username || !!password) {


            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('isAuthenticated', 'true')
                navigate('/');
            } else {
                setError('Invalid username or password');
            }

        }
        return


    }

    return (
        <Container>
            <h1>Sign In</h1>


            <Form onSubmit={handleSignIn}>
                {error && <ErrorAlert>{error}</ErrorAlert>}
                <input
                    name="username"
                    type="text" placeholder="username" />
                <ErrorHintInput>{userNameError}</ErrorHintInput>
                <input
                    name="password"
                    type="password" placeholder="password" />
                <ErrorHintInput>{passwordError}</ErrorHintInput>
                <button type="submit">Login</button>
            </Form>

            <Hint>Don't have an account? <a href="#">Sign Up</a></Hint>
            <Hint>Forgot Password? <a href="#">Reset Password</a></Hint>


        </Container>

    )
}



export default Login;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: ${props => props.theme.colors.gray[100]};
`;

const Form = styled.form`
    display: flex;
    position: relative;
    padding: ${props => props.theme.spacing[6]};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    border-radius: ${props => props.theme.borderRadius['lg']};
    margin-bottom: ${props => props.theme.spacing[6]};
    input {
        width: 100%;
        height: 55px;
        padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
        border-radius: ${props => props.theme.borderRadius['lg']};
        font-size: ${props => props.theme.fontSize['lg']};
        border: 1px solid ${props => props.theme.colors.gray[200]};
        background-color: ${props => props.theme.colors.gray[200]};
        outline: none;
        &:focus {
            border: 1px solid ${props => props.theme.colors.blue[500]};
        }
    }
    button {
        width: 100%;
        height: 55px;
        background-color: ${props => props.theme.colors.indigo[500]};
        color: ${props => props.theme.colors.white};
        border-radius: ${props => props.theme.borderRadius['md']};
        border: 1px solid ${props => props.theme.colors.indigo[500]};
        font-size: ${props => props.theme.fontSize['lg']};
        border: none;
        outline: none;
        cursor: pointer;
        &:hover {
            background-color: ${props => props.theme.colors.indigo[600]};
        }
    }
`;



const Hint = styled.p`
    font-size: ${props => props.theme.fontSize['base']};
    color: ${props => props.theme.colors.gray[400]};
    margin-bottom: ${props => props.theme.spacing[4]};
    a {
        color: ${props => props.theme.colors.blue[600]};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;



const ErrorHintInput = styled.p`
   font-size: ${props => props.theme.fontSize['sm']};
   color: ${props => props.theme.colors.red[400]};
   width: 100%;
   margin-bottom: ${props => props.theme.spacing[2]};
    text-align: left;
    margin-top: ${props => props.theme.spacing[1]};
    margin-left: ${props => props.theme.spacing[1]};
 
`;

const ErrorAlert = styled.div`
    width: 100%;
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    border-radius: ${props => props.theme.borderRadius['md']};
    background-color: ${props => props.theme.colors.red[100]};
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.red[600]};
    font-size: ${props => props.theme.fontSize['sm']};
    text-align: left;
    margin-top: ${props => props.theme.spacing[1]};
    margin-left: ${props => props.theme.spacing[1]};
`;
