import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomModal from "./CustomModal";
import { useParams } from "react-router-dom";

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

const Description = styled.p`
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

// ===================== MODAL COMPONENTS =====================

const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(162, 162, 162, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalBody = styled.div`
    width: 70%;
    max-width: 700px;
    min-height: 40%;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    padding: 50px 40px 30px 40px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const ConfirmModalBody = styled(ModalBody)`
    width: auto;
    min-width: 400px;
    min-height: auto;
    text-align: center;
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

type UserRole = "RECRUITER" | "HIRING_MANAGER";

interface JobPost {
    id: number;
    role: string;
    department: string;
    description: string;
    mustHaveSkills: string[];
    technologies: TechItem[];
    interviewQuestions: string[];
}

interface TechItem {
    name: string;
    description: string;
}




// ===================== MAIN COMPONENT =====================

const JobViewer: React.FC = () => {
    const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
    const userRole: UserRole = "HIRING_MANAGER"; // hardcoded for now, replace with actual user role logic
    const [showTestModal, setShowTestModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [jobPost, setJobPost] = useState<JobPost>({
        id: 1,
        role: "Software Engineer",
        department: "Engineering",
        description:
            "We are looking for a skilled Software Engineer to join our dynamic team. The ideal candidate will have experience in building scalable applications and a passion for technology.",
        mustHaveSkills: ["JavaScript", "React", "Node.js"],
        technologies: [
            { name: "React", description: "A JavaScript library for building user interfaces." },
            { name: "Node.js", description: "A JavaScript runtime built on Chrome's V8 engine." },
            { name: "Docker", description: "A platform for developing, shipping, and running applications in containers." },
        ],
        interviewQuestions: [
            "Can you describe your experience with React and how you've used it in past projects?",
            "How do you manage state in your React applications?",
            "Have you worked with Node.js? If so, can you share an example of a backend service you've built with it?",
            "What is your experience with containerization and Docker?",
        ],
    }); 
    const {id} = useParams();
    // useEffect(() => {
    //     if (id) {
    //         fetchJobPost(Number(id));
    //     }
    // }, [id]);

    // const fetchJobPost = async (jobId: number) => {
    //     // fetch job post data from backend using jobId
    //     // setJobPost(fetchedData);
    // };
    const handleEdit = () => {
        // redirect to edit page
        // window.location.href = `/AddPage/${jobPost.id}`;/
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            //
            // on success → redirect to Dashboard
            window.location.href = "/Dashboard";
        } catch (err) {
            console.error("Delete failed:", err);
            setIsDeleting(false);
        }
    };

    return (
        <PageContainer>
            <Header>
                <Logo>
                    H<span>R</span>elper
                </Logo>
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
                            {jobPost.interviewQuestions.map((q, idx) => (
                                <li key={idx}>{q}</li>
                            ))}
                        </BulletList>
                    </div>
                </LeftColumn>

                <RightColumn>
                    <SectionTitle>About the job</SectionTitle>
                    <Description>{jobPost.description}</Description>

                    <SectionTitle>Must have skills</SectionTitle>
                    <SkillsList>
                        {jobPost.mustHaveSkills.map((skill, idx) => (
                            <li key={idx}>{skill}</li>
                        ))}
                    </SkillsList>

                    <SectionTitle>Technologies</SectionTitle>
                    <TechList>
                        {jobPost.technologies.map((tech, idx) => (
                            <React.Fragment key={tech.name}>
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

            {/* Tech detail modal */}
            {selectedTech && (
                <CustomModal
                    close={() => setSelectedTech(null)}
                    body={
                        <>
                            <ModalTitle>{selectedTech.name}</ModalTitle>
                            <ModalText>{selectedTech.description}</ModalText>
                        </>
                    }
                />
            )}

            {/* Test your knowledge modal */}
            {showTestModal && (
                <CustomModal
                    close={() => setShowTestModal(false)}
                    body={
                        <>
                            <ModalTitle>Test your knowledge</ModalTitle>
                            <ModalText>
                                Here you can test your knowledge for the {jobPost.role} role.
                                {/* plug in your quiz / questions component here */}
                            </ModalText>
                            <ModalActions>
                                <PrimaryButton onClick={() => setShowTestModal(false)}>
                                    Start test
                                </PrimaryButton>
                            </ModalActions>
                        </>
                    }
                />
            )}

            {/* Delete confirm modal */}
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
        </PageContainer>
    );
};

export default JobViewer;