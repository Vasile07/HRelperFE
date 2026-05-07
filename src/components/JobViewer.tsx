import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import api from "../api";
import CustomModal from "./CustomModal";
import type Question from "../model/Question.ts";
import QuizModal from "./QuizModal.tsx";
import FeedbackModal from "./FeedbackModal.tsx";
import TechnologyModal from "./TechnologyModal.tsx";
import type Technology from "../model/Technology.ts";
import extractRoleFromJwt from "../extractRoleFromJwt.ts";

// ===================== STYLED COMPONENTS =====================

const PageContainer = styled.div`
    min-height: 100vh;
    background-color: #fff;
    padding: 30px 50px;
    box-sizing: border-box;
    font-family: 'Georgia', 'Times New Roman', serif;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Logo = styled.h1`
    font-size: 42px;
    color: black;
    margin: 0;
    font-weight: 400;

    span {
        color: #344966;
    }
`;

const HeaderActions = styled.div`
    display: flex;
    gap: 12px;
`;

const PrimaryButton = styled.button`
    background-color: #344966;
    color: #fff;
    border: none;
    border-radius: 25px;
    padding: 14px 28px;
    font-size: 16px;
    font-family: 'Georgia', serif;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #2A3B53;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const SecondaryButton = styled.button`
    background-color: #FAE9D2;
    color: #344966;
    border: none;
    border-radius: 25px;
    padding: 14px 28px;
    font-size: 16px;
    font-family: 'Georgia', serif;
    cursor: pointer;
    letter-spacing: 1px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #F2DDBE;
    }

    &:disabled {
        opacity: 0.6;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 40px;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const RoleCard = styled.div`
    background-color: #FAE9D2;
    padding: 35px 25px;
    text-align: center;
`;

const RoleTitle = styled.h2`
    font-size: 36px;
    color: #1A1A1A;
    margin: 0 0 8px 0;
    font-weight: 400;
`;

const RoleDepartment = styled.p`
    font-size: 22px;
    color: #1A1A1A;
    margin: 0;
`;

const InterviewGuideHeader = styled.div`
    background-color: #344966;
    color: #fff;
    padding: 14px 25px;
    font-size: 26px;
    font-family: 'Georgia', serif;
`;

const BulletList = styled.ul`
    list-style: disc;
    padding-left: 25px;
    margin: 20px 0 0 0;

    li {
        font-size: 18px;
        color: #1A1A1A;
        margin-bottom: 12px;
        line-height: 1.4;
    }
`;

const RightColumn = styled.div`
    background-color: #EDEDED;
    padding: 35px 40px;
    border-radius: 4px;
`;

const SectionTitle = styled.h3`
    font-size: 28px;
    color: #1A1A1A;
    margin: 0 0 12px 0;
    font-weight: 400;
`;

const DescriptionText = styled.p`
    font-size: 18px;
    color: #1A1A1A;
    line-height: 1.5;
    margin: 0 0 30px 0;
`;

const SkillsList = styled.ul`
    list-style: disc;
    padding-left: 25px;
    margin: 0 0 30px 0;

    li {
        font-size: 18px;
        color: #1A1A1A;
        margin-bottom: 8px;
    }
`;

const TechList = styled.div`
    font-size: 18px;
    color: #344966;
`;

const TechLink = styled.span`
    color: #344966;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
        color: #5A7AA8;
    }
`;

const TechSeparator = styled.span`
    margin: 0 8px;
    color: #344966;
`;

const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(162, 162, 162, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ConfirmModalBody = styled.div`
    width: auto;
    min-width: 400px;
    background-color: #fff;
    border-radius: 8px;
    padding: 50px 40px 30px 40px;
    text-align: center;
    box-sizing: border-box;
`;

const ModalTitle = styled.h2`
    color: #344966;
    font-family: 'Georgia', serif;
    margin: 0 0 20px 0;
    font-size: 28px;
`;

const ModalText = styled.p`
    color: #1A1A1A;
    font-family: 'Georgia', serif;
    font-size: 18px;
    line-height: 1.5;
    margin: 0 0 25px 0;
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
`;

const DangerButton = styled(PrimaryButton)`
    background-color: #B0413E;

    &:hover {
        background-color: #8E3431;
    }
`;

// ===================== TYPES =====================

interface JobPost {
    jobId: number;
    role: string;
    department: string;
    description: string;
    skills: string[];
    technologies: Technology[];
    guides: string[];
}

// ===================== MAIN COMPONENT =====================

const JobViewer: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [jobPost, setJobPost] = useState<JobPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
    const [showTestModal, setShowTestModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [questions, setQuestions] = useState<Question[]>([])
    const [quizModalIsVisible, setQuizModalIsVisible] = useState<boolean>(false)
    const [feedbackModalIsVisible, setFeedbackModalIsVisible] = useState<boolean>(false)

    const userRole: string = extractRoleFromJwt();

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await api.get<JobPost>(`/jobs/${id}`);
                setJobPost(response.data);
            } catch (err) {
                console.error("Axios fetch error:", err);
                alert("Failed to load job details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchJobData();
    }, [id]);

    useEffect(() => {
        if (!jobPost) return;

        const fetchTechnologyDetails = async () => {
            for (const tech of jobPost.technologies) {
                const index = jobPost.technologies.indexOf(tech);
                try {
                    const response = await api.get(`/technologies/${tech.id}`);
                    setJobPost(prevJobPost => {
                        if (!prevJobPost) return prevJobPost;

                        const updatedTechnologies = [...prevJobPost.technologies];
                        updatedTechnologies[index] = response.data;

                        return {
                            ...prevJobPost,
                            technologies: updatedTechnologies
                        };
                    });
                } catch (error) {
                    console.error(`Failed to fetch technology ${tech.id}:`, error);
                }
            }
        };

        fetchTechnologyDetails();
    }, [jobPost?.jobId]);

    useEffect(() => {
        if (selectedTech && jobPost) {
            const updatedTech = jobPost.technologies.find(t => t.id === selectedTech.id);
            if (updatedTech) {
                setSelectedTech(updatedTech);
            }
        }
    }, [jobPost?.technologies]);

    const handleEdit = () => {
        navigate(`/edit-job/${id}`);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            await api.delete(`/jobs/${id}`);
            navigate("/Dashboard");
        } catch (err) {
            console.error("Axios delete error:", err);
            alert("Could not delete job. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const fetchQuiz = async () => {
        try {
            const response = await api.get(`/jobs/${id}/quiz`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Failed to fetch quiz:', error);
        }
    };

    const handleStartQuiz = async () => {
        try {
            await fetchQuiz();
            setShowTestModal(false)
            setQuizModalIsVisible(true);
        } catch (error) {
            console.error('Failed to start quiz:', error);
        }
    };

    if (loading) return <PageContainer>Loading Job Details...</PageContainer>;
    if (!jobPost) return <PageContainer>Job not found or error loading data.</PageContainer>;

    return (
        <PageContainer>
            <Header>
                <Logo>H<span>R</span>elper</Logo>
                <HeaderActions>
                    {userRole === "RECRUITER" && (
                        <PrimaryButton onClick={() => setShowTestModal(true)}>
                            Test your knowledge
                        </PrimaryButton>
                    )}
                    {userRole === "HIRING_MANAGER" && (
                        <>
                            <SecondaryButton onClick={handleEdit}>EDIT</SecondaryButton>
                            <PrimaryButton onClick={() => setShowDeleteConfirm(true)}>
                                DELETE
                            </PrimaryButton>
                        </>
                    )}
                </HeaderActions>
            </Header>

            <Content>
                <LeftColumn>
                    <RoleCard>
                        <RoleTitle>{jobPost.role}</RoleTitle>
                        <RoleDepartment>Department: {jobPost.department}</RoleDepartment>
                    </RoleCard>

                    <div>
                        <InterviewGuideHeader>Interview Guide</InterviewGuideHeader>
                        <BulletList>
                            {jobPost.guides.map((guide, idx) => (
                                <li key={idx}>{guide}</li>
                            ))}
                        </BulletList>
                    </div>
                </LeftColumn>

                <RightColumn>
                    <SectionTitle>About the job</SectionTitle>
                    <DescriptionText>{jobPost.description}</DescriptionText>

                    <SectionTitle>Must have skills</SectionTitle>
                    <SkillsList>
                        {jobPost.skills.map((skill, idx) => (
                            <li key={idx}>{skill}</li>
                        ))}
                    </SkillsList>

                    <SectionTitle>Technologies</SectionTitle>
                    <TechList>
                        {jobPost.technologies.map((tech, idx) => (
                            <React.Fragment key={tech.id}>
                                <TechLink onClick={() => setSelectedTech(tech)}>
                                    {tech.name}
                                </TechLink>
                                {idx < jobPost.technologies.length - 1 && (
                                    <TechSeparator>|</TechSeparator>
                                )}
                            </React.Fragment>
                        ))}
                    </TechList>
                </RightColumn>
            </Content>

            {showTestModal && (
                <CustomModal
                    close={() => setShowTestModal(false)}
                    body={
                        <>
                            <ModalTitle>Test your knowledge</ModalTitle>
                            <ModalText>
                                Prepare for the {jobPost.role} interview by testing your technical knowledge.
                            </ModalText>
                            <ModalActions>
                                <PrimaryButton onClick={() => handleStartQuiz()}>
                                    Start test
                                </PrimaryButton>
                            </ModalActions>
                        </>
                    }
                />
            )}

            {showDeleteConfirm && (
                <ModalOverlay onClick={() => !isDeleting && setShowDeleteConfirm(false)}>
                    <ConfirmModalBody onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>Confirm delete</ModalTitle>
                        <ModalText>
                            Are you sure you want to delete the <b>{jobPost.role}</b> job post?
                            This action cannot be undone.
                        </ModalText>
                        <ModalActions>
                            <SecondaryButton
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </SecondaryButton>
                            <DangerButton onClick={handleDeleteConfirm} disabled={isDeleting}>
                                {isDeleting ? "Deleting..." : "Delete"}
                            </DangerButton>
                        </ModalActions>
                    </ConfirmModalBody>
                </ModalOverlay>
            )}

            {quizModalIsVisible &&
                <QuizModal questions={questions} close={() => setQuizModalIsVisible(false)} setQuestions={setQuestions}
                           onViewResults={() => setFeedbackModalIsVisible(true)}></QuizModal>}
            {feedbackModalIsVisible &&
                <FeedbackModal questions={questions} close={() => setFeedbackModalIsVisible(false)}/>}

            {selectedTech && (
                <TechnologyModal
                    tech={selectedTech}
                    close={() => setSelectedTech(null)}
                />
            )}
        </PageContainer>
    );
};

export default JobViewer;