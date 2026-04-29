import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: replace with real fetch from backend when jobs are available

interface MockJob {
    jobId: number;
    department: string;
    role: string;
}

const MOCK_JOBS: MockJob[] = [
    { jobId: 1, department: "IT", role: "Software Developer" },
    { jobId: 2, department: "IT", role: "Software Developer" },
    { jobId: 3, department: "IT", role: "Software Developer" },
    { jobId: 4, department: "IT", role: "Software Developer" },
    { jobId: 5, department: "IT", role: "Software Developer" },
    { jobId: 6, department: "IT", role: "Software Developer" },
];

// TODO: replace with real auth/session check
const IS_HIRING_MANAGER = true;

// ─── Page Layout ──────────────────────────────────────────────────────────────

const Page = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
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

// profile icon — clicking redirects to /profile
const ProfileIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.6rem;
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
    padding: 40px 60px 100px 60px;
    flex: 1;
`;

const PageTitle = styled.h2`
    font-family: "Jomolhari", serif;
    font-size: 2.5rem;
    color: #000;
    margin: 0 0 40px 0;
`;

// ─── Job grid ─────────────────────────────────────────────────────────────────

// 3 cards per row — change repeat(3, ...) to repeat(2, ...) etc. if needed
const JobGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    width: 100%;
    max-width: 1200px;
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

// white info box overlaid on the top-left of the card
const CardInfo = styled.div`
    position: absolute;
    top: 16px;
    left: 16px;
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
    margin: 0;
    margin-top: 4px;
`;

// ─── Add job button (Hiring Manager only) ─────────────────────────────────────

// position: fixed keeps it always bottom-right regardless of scroll
// change bottom/right values to reposition it
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

                <JobGrid>
                    {MOCK_JOBS.map(job => (
                        <JobCard
                            key={job.jobId}
                            onClick={() => navigate(`/JobDetails/${job.jobId}`)}
                        >
                            <CardImage src={heroImage} alt={job.role} />
                            <CardInfo>
                                <CardDepartment>{job.department}</CardDepartment>
                                <CardRole>{job.role}</CardRole>
                                <CardLink>See job details →</CardLink>
                            </CardInfo>
                        </JobCard>
                    ))}
                </JobGrid>
            </Body>

            {/* Only visible for Hiring Managers — swap IS_HIRING_MANAGER with real role check later */}
            {IS_HIRING_MANAGER && (
                <AddJobButton onClick={() => navigate("/AddJobPost")}>
                    +
                </AddJobButton>
            )}
        </Page>
    );
};

export default DiscoverJobPageDashboard;