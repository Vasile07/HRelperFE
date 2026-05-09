import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import jobsBackground from "../assets/jobBackground.png";
import api from "../api";
import extractRoleFromJwt from "../extractRoleFromJwt.ts";
import {UserRole} from "../constants/UserRole.tsx";
import LoadingComponent from "../components/LoadingComponent.tsx";

// ─── Types ────────────────────────────────────────────────────────────────────

interface JobHeader {
    jobId: number;
    role: string;
    department: string;
}

const IS_HIRING_MANAGER = extractRoleFromJwt() === UserRole.HiringManager;

// ─── Page Layout ──────────────────────────────────────────────────────────────

const Page = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #ffeedb;
`;

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #344966;
    padding: 16px 32px;
`;

const HeaderBrand = styled.h1`
    flex: 1;
    color: #ffffff;
    font-size: 2.5rem;
    font-family: "Jomolhari", serif;
    margin: 0;
`;

const HeaderR = styled.span`
    color: #ffeedb;
`;

const ProfileIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #344966;

    &:hover {
        background-color: #ffeedb;
    }
`;

// ─── Body ─────────────────────────────────────────────────────────────────────

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 20px 60px 0 60px;

    flex: 1;
    min-height: 0; /* IMPORTANT */
`;

const PageTitle = styled.h2`
    font-family: "Jomolhari", serif;
    font-size: 2.5rem;
    color: #000;
    margin: 0 0 40px 0;
`;

// shown while loading or on error
const StatusText = styled.p`
    font-family: "Jomolhari", serif;
    font-size: 1.2rem;
    color: #555;
`;

// ─── Job grid ─────────────────────────────────────────────────────────────────

const JobGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    width: 100%;
    max-width: 1200px;

    flex: 1;
    min-height: 0;

    overflow-y: auto;

    padding-right: 8px;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #344966;
        border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #2a3a52;
    }

    scrollbar-width: thin;
    scrollbar-color: #344966 transparent;
`;


// ─── Job card ─────────────────────────────────────────────────────────────────

const JobCard = styled.div`
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    height: 220px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const CardInfo = styled.div`
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    background-color: rgba(255, 255, 255, 0.92);
    border-radius: 10px;
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const CardDepartment = styled.p`
    font-family: "Jomolhari", serif;
    font-size: 1.1rem;
    color: #000;
    margin: 0;
`;

const CardRole = styled.p`
    font-family: "Jomolhari", serif;
    font-size: 0.95rem;
    color: #000;
    margin: 0;
`;

const CardLink = styled.p`
    font-size: 0.8rem;
    color: #344966;
`;

// ─── Add job button ───────────────────────────────────────────────────────────

const AddJobButton = styled.button`
    position: fixed;
    bottom: 36px;
    right: 36px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #344966;
    color: #fff;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);

    &:hover {
        background-color: #263650;
    }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const DiscoverJobPageDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<JobHeader[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<JobHeader[]>("/jobs")
            .then(res => setJobs(res.data))
            .catch(() => setError("Could not load job posts. Please try again later."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Page>
            <Header>
                <HeaderBrand>
                    H<HeaderR>R</HeaderR>elper
                </HeaderBrand>
                <ProfileIcon onClick={() => navigate("/profile")}>
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="#344966" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                </ProfileIcon>
            </Header>

            <Body>
                <PageTitle>Discover job posts</PageTitle>

                {/* loading state */}
                {loading && <LoadingComponent color={"#FFEEDB"}/>}

                {/* error state */}
                {!loading && error && <StatusText style={{ color: "#c0392b" }}>{error}</StatusText>}

                {/* empty state */}
                {!loading && !error && jobs.length === 0 && (
                    <StatusText>No job posts available yet.</StatusText>
                )}

                {/* job grid */}
                {!loading && !error && jobs.length > 0 && (
                    <JobGrid>
                        {jobs.map(job => (
                            <JobCard
                                key={job.jobId}
                                onClick={() => navigate(`/JobViewer/${job.jobId}`)}
                            >
                                <CardImage src={jobsBackground} alt={job.role}/>
                                <CardInfo>
                                    <CardDepartment>{job.department}</CardDepartment>
                                    <CardRole>{job.role}</CardRole>
                                    <CardLink>See job details →</CardLink>
                                </CardInfo>
                            </JobCard>
                        ))}
                    </JobGrid>
                )}
            </Body>

            {IS_HIRING_MANAGER && (
                <AddJobButton onClick={() => navigate("/ManageJobPost")}>
                    +
                </AddJobButton>
            )}
        </Page>
    );
};

export default DiscoverJobPageDashboard;