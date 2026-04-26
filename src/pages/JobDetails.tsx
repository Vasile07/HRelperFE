import styled from "styled-components";
import React, {useState} from "react";
import api from "../api.ts";
import QuizModal from "../components/QuizModal.tsx";
import FeedbackModal from "../components/FeedbackModal.tsx";
import type Question from "../model/Question.ts";

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

const JobDetails: React.FC = () => {

    const [questions, setQuestions] = useState<Question[]>([])
    const [quizModalIsVisible, setQuizModalIsVisible] = useState<boolean>(false)
    const [feedbackModalIsVisible, setFeedbackModalIsVisible] = useState<boolean>(false)
    const jobId = 1;

    const fetchQuiz = async () => {
        try {
            const response = await api.get(`/jobs/${jobId}/quiz`);
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

    return (
        <PageBody>
            <StartQuizButton onClick={() => handleStartQuiz()}>Test your knowledge</StartQuizButton>
            {quizModalIsVisible &&
                <QuizModal questions={questions} close={() => setQuizModalIsVisible(false)} setQuestions={setQuestions}
                           onViewResults={() => setFeedbackModalIsVisible(true)}></QuizModal>}
            {feedbackModalIsVisible &&
                <FeedbackModal questions={questions} close={() => setFeedbackModalIsVisible(false)}/>}
        </PageBody>
    )
}

export default JobDetails