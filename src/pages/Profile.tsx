import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import bgImage from "../assets/add-page-decoration-image.jpg";
import extractRoleFromJwt from "../extractRoleFromJwt.ts";
import convertTokenToJwt from "../convertTokenToJwt.ts";

// ─── Model ────────────────────────────────────────────────────────────────────

interface UserProfile {
    name: string;
    email: string;
    type: "hiring_manager" | "recruiter";
}

const formatRole = (type: UserProfile["type"]): string =>
    type.replace("_", " ")

// ─── Page Layout ──────────────────────────────────────────────────────────────

const Page = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
`;

const Background = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
`;

// ─── Back Button ──────────────────────────────────────────────────────────────

const BackButton = styled.button`
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 2;
    padding: 8px 28px;
    background-color: rgba(255, 255, 255, 0.82);
    border: none;
    border-radius: 20px;
    font-family: "Jomolhari", serif;
    font-size: 0.95rem;
    color: #344966;
    letter-spacing: 1px;
    cursor: pointer;

    &:hover {
        background-color: #ffffff;
    }
`;

// ─── Profile Card ─────────────────────────────────────────────────────────────

const ProfileCard = styled.div`
    position: relative;
    z-index: 1;
    margin-left: 10%;
    background: rgba(255, 255, 255, 0.42);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.65);
    padding: 52px 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    min-width: 280px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
`;

const AvatarCircle = styled.div`
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
`;

const UserName = styled.h2`
    font-family: "Jomolhari", serif;
    font-size: 1.5rem;
    color: #000;
    margin: 0;
    text-align: center;
`;

const UserEmail = styled.p`
    font-family: "Jomolhari", serif;
    font-size: 0.9rem;
    color: #333;
    margin: 0;
    text-align: center;
`;

const RoleBadge = styled.p`
    font-family: "Jomolhari", serif;
    font-size: 1.1rem;
    font-weight: bolder;
    color: #344966;
    letter-spacing: 1.5px;
    margin: 4px 0 8px;
    text-align: center;
`;

// ─── Logout Button ────────────────────────────────────────────────────────────

const LogoutButton = styled.button`
    width: 100%;
    padding: 13px;
    background-color: #344966;
    color: #fff;
    border: none;
    border-radius: 28px;
    font-family: "Jomolhari", serif;
    font-size: 1rem;
    letter-spacing: 2px;
    cursor: pointer;
    margin-top: 6px;

    &:hover {
        background-color: #263650;
    }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const idToken = localStorage.getItem("idToken")
        const role = extractRoleFromJwt()
        console.log(role)
        if (idToken) {
            const idTokenJwt = convertTokenToJwt(idToken)
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser({
                name: idTokenJwt.getField("name"),
                email: idTokenJwt.getField("email"),
                type: role,
            })
        }

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Login");
    };

    return (
        <Page>
            <Background src={bgImage} alt=""/>

            <BackButton onClick={() => navigate(-1)}>BACK</BackButton>

            <ProfileCard>
                <AvatarCircle>
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="#344966" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="7" r="4"/>
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                </AvatarCircle>

                <UserName>{user?.name ?? ""}</UserName>
                <UserEmail>{user?.email ?? ""}</UserEmail>
                <RoleBadge>{user ? formatRole(user.type) : ""}</RoleBadge>

                <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
            </ProfileCard>
        </Page>
    );
};

export default Profile;
