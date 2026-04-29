import React, { useState } from "react";
import styled from "styled-components";

// ─── Page Layout ──────────────────────────────────────────────────────────────

const RegisterPage = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    background-color: #344966;
    align-items: center;
    overflow: hidden;
`;

// flex: 1 = ~1/3 of page for the brand title
const BrandSide = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// font-size controls title size — increase/decrease here
const BrandText = styled.h1`
    color: #ffffff;
    font-size: 6rem;
    font-family: "Jomolhari", serif;
    margin: 0;
`;

// the "R" is different color
const BrandR = styled.span`
    color: #ffeedb;
`;

// flex: 2 = ~2/3 of page for the card side
const FormSide = styled.div`
    flex: 2;
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 20px 40px 20px 0;
`;

// ─── Card ─────────────────────────────────────────────────────────────────────

// padding controls inner spacing — border-radius controls corner roundness
const Card = styled.div`
    background-color: #ffeedb;
    border-radius: 20px;
    padding: 50px 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow-y: auto;
`;

const CardTitle = styled.h2`
    font-family: "Jomolhari", serif;
    font-size: 2rem;
    color: #000;
    margin: 0;
`;

// ─── Fields ───────────────────────────────────────────────────────────────────

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const FieldInput = styled.input`
    background-color: transparent;
    color: #000;
    border: none;
    border-bottom: 2px solid #344966;
    outline: none;
    font-size: 1.2rem;
    padding: 6px 4px;
    font-family: "Jomolhari", serif;

    &::placeholder {
        color: #555;
    }

    &:focus {
        border-bottom: 2px solid #000;
    }
`;

const ErrorText = styled.p`
    color: #c0392b;
    font-size: 0.8rem;
    margin: 0;
`;

// ─── Password hints ───────────────────────────────────────────────────────────

const PasswordHints = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 6px;
`;

const HintTitle = styled.p`
    font-size: 0.8rem;
    font-weight: bold;
    color: #333;
    margin: 0;
`;

const HintItem = styled.p<{ met: boolean }>`
    font-size: 0.8rem;
    color: ${({ met }) => (met ? "#2e7d32" : "#555")};
    margin: 0;

    &::before {
        content: "✓ ";
    }
`;

// ─── Role checkboxes ──────────────────────────────────────────────────────────

const RoleSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const RoleLabel = styled.p`
    font-family: "Jomolhari", serif;
    font-size: 1.3rem;
    color: #000;
    margin: 0;
`;

const RoleOptions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
`;

const RoleOption = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Jomolhari", serif;
    font-size: 1.1rem;
    color: #000;
    cursor: pointer;
`;

const RoleCheckbox = styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: #344966;
`;

// ─── Submit ───────────────────────────────────────────────────────────────────

const SignUpButton = styled.button`
    width: 50%;
    align-self: left;
    padding: 16px;
    background-color: #344966;
    color: #fff;
    border: none;
    border-radius: 30px;
    font-size: 1.3rem;
    font-family: "Jomolhari", serif;
    letter-spacing: 2px;
    cursor: pointer;

    &:hover {
        background-color: #263650;
    }
`;

// ─── Component ────────────────────────────────────────────────────────────────

type Role = "hiringManager" | "recruiter" | null;

interface RegisterForm {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: Role;
}

interface FormErrors {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    role?: string;
}

const RegisterNewAccount: React.FC = () => {
    const [form, setForm] = useState<RegisterForm>({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: null,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const updateField = <K extends keyof RegisterForm>(field: K, value: RegisterForm[K]) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const passwordChecks = {
        length: form.password.length >= 8,
        mixedCase: /[a-z]/.test(form.password) && /[A-Z]/.test(form.password),
        hasNumber: /\d/.test(form.password),
        hasSpecial: /[^a-zA-Z0-9]/.test(form.password),
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.surname.trim()) newErrors.surname = "Surname is required.";
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email.";
        }
        if (!form.password) {
            newErrors.password = "Password is required.";
        } else if (!Object.values(passwordChecks).every(Boolean)) {
            newErrors.password = "Password does not meet all requirements.";
        }
        if (!form.role) newErrors.role = "Please select a role.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = () => {
        if (!validate()) return;
        // TODO: wire up to backend register endpoint
        console.log("Registering:", form);
    };

    return (
        <RegisterPage>
            <BrandSide>
                <BrandText>H<BrandR>R</BrandR>elper</BrandText>
            </BrandSide>
            <FormSide>
                <Card>
                    <CardTitle>Create Account</CardTitle>

                    <FieldWrapper>
                        <FieldInput
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={e => updateField("name", e.target.value)}
                        />
                        {errors.name && <ErrorText>{errors.name}</ErrorText>}
                    </FieldWrapper>

                    <FieldWrapper>
                        <FieldInput
                            type="text"
                            placeholder="Surname"
                            value={form.surname}
                            onChange={e => updateField("surname", e.target.value)}
                        />
                        {errors.surname && <ErrorText>{errors.surname}</ErrorText>}
                    </FieldWrapper>

                    <FieldWrapper>
                        <FieldInput
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={e => updateField("email", e.target.value)}
                        />
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}
                    </FieldWrapper>

                    <FieldWrapper>
                        <FieldInput
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={e => updateField("password", e.target.value)}
                        />
                        <PasswordHints>
                            <HintTitle>Password should:</HintTitle>
                            <HintItem met={passwordChecks.length}>Be at least 8 characters</HintItem>
                            <HintItem met={passwordChecks.mixedCase}>Be a mixture of lower and upper cases</HintItem>
                            <HintItem met={passwordChecks.hasNumber}>Contain numbers</HintItem>
                            <HintItem met={passwordChecks.hasSpecial}>Contain special characters</HintItem>
                        </PasswordHints>
                        {errors.password && <ErrorText>{errors.password}</ErrorText>}
                    </FieldWrapper>

                    <RoleSection>
                        <RoleLabel>Select your role</RoleLabel>
                        <RoleOptions>
                            <RoleOption>
                                <RoleCheckbox
                                    type="checkbox"
                                    checked={form.role === "hiringManager"}
                                    onChange={() => updateField("role", form.role === "hiringManager" ? null : "hiringManager")}
                                />
                                Hiring Manager
                            </RoleOption>
                            <RoleOption>
                                <RoleCheckbox
                                    type="checkbox"
                                    checked={form.role === "recruiter"}
                                    onChange={() => updateField("role", form.role === "recruiter" ? null : "recruiter")}
                                />
                                Recruiter
                            </RoleOption>
                        </RoleOptions>
                        {errors.role && <ErrorText>{errors.role}</ErrorText>}
                    </RoleSection>

                    <SignUpButton onClick={handleSignUp}>SIGN UP</SignUpButton>
                </Card>
            </FormSide>
        </RegisterPage>
    );
};

export default RegisterNewAccount;