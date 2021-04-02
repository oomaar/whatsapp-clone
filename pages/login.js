import { Button } from "@material-ui/core";
import styled from "styled-components";
import HeadTag from "../HeadTag";
import { auth, provider } from "../lib/firebase";

const Login = () => {
    const signIn = () => auth.signInWithPopup(provider).catch(alert);
    return (
        <Container>
            <HeadTag title="Login" />
            <LoginContainer>
                <Logo src="/logo.png" alt="WhatsApp" />
                <Button onClick={signIn} variant="outlined">Sign in With Google</Button>
            </LoginContainer>
        </Container>
    );
};

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);

    @media (max-width: 350px) {
        padding: 10px;
    }
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;
