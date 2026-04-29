import styled from "styled-components";
import React, {useEffect, useState} from "react";
import api from "../api.ts";
import QuizModal from "../components/QuizModal.tsx";
import FeedbackModal from "../components/FeedbackModal.tsx";
import TechnologyModal from "../components/TechnologyModal.tsx";
import type Question from "../model/Question.ts";
import type Technology from "../model/Technology.ts";
import {useParams} from "react-router-dom";

const PageBody = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fff;
`;

const StartQuizButton = styled.button`
    padding: 10px 20px;
    border-radius: 14px;
    font-size: 20px;
    color: #fff;
    background-color: #344966;
    position: absolute;
    right: 20px;
    top: 10px;
`;

const TechnologiesSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    margin-top: 60px;
`;

const TechChip = styled.button`
    padding: 6px 16px;
    border: 2px solid #344966;
    border-radius: 20px;
    background-color: transparent;
    color: #344966;
    font-family: "Jomolhari", serif;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #344966;
        color: #fff;
    }
`;

const JobDetails: React.FC = () => {
    const {jobId} = useParams();
    const jobIdNumber = jobId ? parseInt(jobId, 10) : -1;

    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizModalIsVisible, setQuizModalIsVisible] = useState<boolean>(false);
    const [feedbackModalIsVisible, setFeedbackModalIsVisible] = useState<boolean>(false);

    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [selectedTech, setSelectedTech] = useState<{ name: string; description: string } | null>(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await api.get(`/jobs/${jobIdNumber}`);
                setTechnologies(response.data.technologies || []);
            } catch (error) {
                console.error('Failed to fetch job details:', error);
            }
        };

        if (jobIdNumber !== -1) {
            fetchJobDetails();
        }
    }, [jobIdNumber]);

    const fetchQuiz = async () => {
        try {
            const response = await api.get(`/jobs/${jobIdNumber}/quiz`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Failed to fetch quiz:', error);
        }
    };

    const handleStartQuiz = async () => {
        try {
            await fetchQuiz();
            setQuizModalIsVisible(true);
        } catch (error) {
            console.error('Failed to start quiz:', error);
        }
    };

    const handleTechClick = async (tech: Technology) => {
        try {
            const response = await api.get(`/technologies/${tech.id}`);
            setSelectedTech({name: response.data.name, description: response.data.description});
        } catch (error) {
            console.error('Failed to fetch technology details:', error);
        }
    };

    return (
        <PageBody>
            <StartQuizButton onClick={() => handleStartQuiz()}>Test your knowledge</StartQuizButton>

            {technologies.length > 0 && (
                <TechnologiesSection>
                    {technologies.map(tech => (
                        <TechChip key={tech.id} onClick={() => handleTechClick(tech)}>
                            {tech.name}
                        </TechChip>
                    ))}
                </TechnologiesSection>
            )}

            {selectedTech && (
                <TechnologyModal
                    name={selectedTech.name}
                    description={selectedTech.description}
                    close={() => setSelectedTech(null)}
                />
            )}

            {quizModalIsVisible &&
                <QuizModal questions={questions} close={() => setQuizModalIsVisible(false)} setQuestions={setQuestions}
                           onViewResults={() => setFeedbackModalIsVisible(true)}/>}
            {feedbackModalIsVisible &&
                <FeedbackModal questions={questions} close={() => setFeedbackModalIsVisible(false)}/>}
        </PageBody>
    );
};

export default JobDetails;
