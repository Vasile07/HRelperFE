import type Question from "../model/Question.ts";
import styled from "styled-components";
import React, {useState} from "react";
import type Answer from "../model/Answer.ts";

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
    height: 60%;
    background-color: #fff;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ExitButton = styled.button`
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: #344966;

`;

const Title = styled.p`
    color: #000;
    font-family: "Jomolhari", serif;
    font-size: 3rem;
    margin: 30px auto;
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
`;

const AnswerText = styled.p`
    font-family: "Jomolhari", serif;
    color: #000;
    font-size: 1rem;
`;

const NavButton = styled.button`
    position: absolute;
    background-color: #344966;
    border-radius: 20px;
    width: 180px;
    padding: 15px 0;
    bottom: 5px;
    font-size: 1rem;
    font-family: "Jomolhari", serif;
`;


const QuizModal: React.FC<{
    questions: Question[],
    setQuestions: (newValue: Question[]) => void,
    close: () => void
}> = ({questions, setQuestions, close}) => {

    const [questionNumber, setQuestionNumber] = useState(0)

    const checkAnswer = (answer: Answer) => {
        setQuestions(questions.map((q, index) => {
            if (index != questionNumber)
                return q;
            return {
                question: q.question,
                answers: q.answers.map(a => {
                    if (a.text != answer.text)
                        return a;
                    return {
                        ...answer,
                        isSelected: !answer.isSelected,
                    }
                })
            }
        }))
    }

    const getAnswerRow = (answer: Answer) => {
        return (
            <AnswerRow>
                <input type="checkbox" style={{accentColor: "#344966", height: "100%", aspectRatio: 1}}
                       checked={answer.isSelected} onClick={() => checkAnswer(answer)}/>
                <AnswerText>{answer.text}</AnswerText>
            </AnswerRow>
        )
    }

    const navigate = (direction: "next" | "prev") => {
        switch (direction) {
            case "next":
                setQuestionNumber(questionNumber === (questions.length - 1) ? (questions.length - 1) : questionNumber + 1)
                break
            case "prev":
                setQuestionNumber(questionNumber === 0 ? 0 : questionNumber - 1)
                break
        }
    }

    const submitQuestioner = () => {

    }

    return (
        <Modal>
            <ModalBody>
                {
                    questionNumber < questions.length &&
                    <div style={{
                        display: "flex",
                        flex: 1,
                        margin: 30,
                        flexDirection: "column",
                        justifyContent: "space-evenly"
                    }}>
                        <Title>Question {questionNumber + 1}</Title>
                        <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                            <QuestionText>{questions[questionNumber].question}</QuestionText>
                            <AnswersColumn>
                                {
                                    questions[questionNumber].answers.map(answer => getAnswerRow(answer))
                                }
                            </AnswersColumn>
                        </div>
                    </div>
                }
                {
                    questionNumber !== 0 &&
                    <NavButton style={{left: 5}}
                               onClick={() => navigate("prev")}
                    >
                        PREVIOUS
                    </NavButton>
                }
                <NavButton style={{
                    right: 5,
                    ...(questionNumber === questions.length - 1 && {
                        backgroundColor: "#969E3D",
                    }),
                }}
                           onClick={() => questionNumber === (questions.length - 1) ? submitQuestioner() : navigate("next")}
                >
                    {questionNumber === (questions.length - 1) ? "FINISH" : "NEXT"}
                </NavButton>

                <ExitButton onClick={() => close()}>✕</ExitButton>
            </ModalBody>
        </Modal>
    )
}

export default QuizModal