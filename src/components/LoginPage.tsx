import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api";
import loginImage from "../assets/tipi_tipe_care_se_uita.png";

// ===================== STYLED COMPONENTS =====================

const PageContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: #FAE9D2;
    border: 2px solid #344966;
    box-sizing: border-box;
    overflow: hidden;
`;

const LeftSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 12%;
`;

const RightSide = styled.div`
    flex: 1;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
`;

const Title = styled.h1`
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 64px;
    color: #344966;
    margin: 0 0 70px 0;
    font-weight: 400;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Label = styled.label`
    color: #344966;
    font-size: 16px;
    font-family: 'Georgia', serif;
`;

const Input = styled.input`
    background-color: #D9D9D9;
    border: none;
    border-radius: 20px;
    height: 36px;
    padding: 0 20px;
    outline: none;
    font-size: 16px;
    color: #344966;

    &:focus {
        background-color: #CCCCCC;
    }
`;

const LoginButton = styled.button`
    background-color: #344966;
    color: #fff;
    border: none;
    border-radius: 30px;
    height: 55px;
    font-size: 22px;
    font-family: 'Georgia', serif;
    letter-spacing: 3px;
    margin-top: 30px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #2A3B53;
    }
    
    &:disabled {
        background-color: #7a869a;
        cursor: not-allowed;
    }
`;

const RegisterLink = styled.div`
    margin-top: 18px;
    color: #344966;
    font-size: 14px;
    font-family: 'Georgia', serif;

    a {
        color: #344966;
        text-decoration: underline;
        margin-left: 5px;
    }
`;

// ===================== MAIN COMPONENT =====================

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post("/users/login", {
                email: email,
                password: password,
            });

            // 3. Axios stores the JSON response in the 'data' property automatically
            const { token } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                navigate("/dashboard");
            }
        } catch (error : any)  {
            // 4. Axios error handling
            // If the server responded with a status outside of the 2xx range
            if (error.response) {
                alert(error.response.data.message || "Invalid email or password.");
            } else {
                alert("Could not connect to the server. Please try again later.");
            }
            console.error("Login Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer>
            <LeftSide>
                <Title>HRelper</Title>
                <Form onSubmit={handleSubmit}>
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Field>
                    <LoginButton type="submit" disabled={isLoading}>
                        {isLoading ? "LOGGING IN..." : "LOGIN"}
                    </LoginButton>
                </Form>
                <RegisterLink>
                    Don't have an account?<a href="/register">Register here</a>
                </RegisterLink>
            </LeftSide>
            <RightSide>
                <LoginImage src={loginImage} alt="Login" />
            </RightSide>
        </PageContainer>
    );
};

export default LoginPage;