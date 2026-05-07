import type Question from "../model/Question.ts";
import styled from "styled-components";
import React from "react";
import type Answer from "../model/Answer.ts";
import extractRoleFromJwt from "../extractRoleFromJwt.ts";
import {UserRole} from "../constants/UserRole.tsx";

const Modal = styled.div`
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
    //max-width: 600px;
    height: 100%;
    background-color: #fff;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;


    padding-left: 70px;
`;

const ExitButton = styled.button`
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: #344966;
    border-radius: 20px;
    width: 100px;
    padding: 10px 0;
    font-size: 1rem;
    font-family: "Jomolhari", serif;

`;

const Title = styled.p`
    color: #000;
    font-family: "Jomolhari", serif;
    font-size: 3rem;
    margin: 30px 0 100px;
`;

const QuestionText = styled.p`
    font-family: "Jomolhari", serif;
    color: #000;
    font-size: 1rem;
`;

const AnswersColumn = styled.div`
    margin-left: 20px;
`;

const AnswerRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    margin-bottom: 5px;
`;

const AnswerText = styled.p`
    font-family: "Jomolhari", serif;
    color: #000;
    font-size: 1rem;
`;

const OptionCorrectnessBox = styled.div<{
    isSelected: boolean;
    isCorrect: boolean;
}>`
    width: 20px;
    height: 20px;
    aspect-ratio: 1;
    border: 2px solid #000;

    background-color: ${({isCorrect, isSelected}) =>
            isCorrect
                    ? "#969E3D"
                    : isSelected
                            ? "#A90A14"
                            : "transparent"};
`;

const FeedbackBody = styled.div`
    display: flex;
    flex: 1;
    //margin-left: 30px;
    flex-direction: column;
    gap: 60px;
    overflow-y: auto;
    width: 100%;

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

    /* Firefox scrollbar */
    scrollbar-width: thin;
    scrollbar-color: #344966 transparent;
`


const FeedbackModal: React.FC<{
    questions: Question[],
    close: () => void
}> = ({questions, close}) => {

    if (extractRoleFromJwt() !== UserRole.Recruiter)
        close();

    const getAnswerRow = (answer: Answer) => {
        return (
            <AnswerRow key={answer.text}>
                <OptionCorrectnessBox isCorrect={answer.correct} isSelected={answer.isSelected}/>
                <AnswerText>{answer.text}</AnswerText>
            </AnswerRow>
        )
    }

    return (
        <Modal>
            <ModalBody>
                <Title>Feedback</Title>
                <FeedbackBody>
                    {
                        questions.map(question => (
                            <div style={{display: "flex", flexDirection: "column", gap: 15}} key={question.question}>
                                <QuestionText>{question.question}</QuestionText>
                                <AnswersColumn>
                                    {
                                        question.answers.map(answer => getAnswerRow(answer))
                                    }
                                </AnswersColumn>
                            </div>
                        ))
                    }
                </FeedbackBody>

                <ExitButton onClick={() => close()}>BACK</ExitButton>
            </ModalBody>
        </Modal>
    )
}

export default FeedbackModal