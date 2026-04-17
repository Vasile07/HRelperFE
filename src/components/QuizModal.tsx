import type Question from "../model/Question.ts";
import styled from "styled-components";
import React, {useState} from "react";
import type Answer from "../model/Answer.ts";
import CustomModal from "./CustomModal.tsx";

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

const Button = styled.button`
    position: absolute;
    background-color: #344966;
    border-radius: 20px;
    width: 180px;
    padding: 15px 0;
    bottom: 5px;
    font-size: 1rem;
    font-family: "Jomolhari", serif;
`;

const ResultBody = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const ScoreBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const ScoreText = styled.p`
    color: #000;
    font-size: 3.5rem;
    font-family: "Jomolhari", serif;
`;

const ScoreReviewText = styled.p`
    color: #000;
    font-size: 1.5rem;
    font-family: "Jomolhari", serif;
`;


const QuizModal: React.FC<{
    questions: Question[],
    setQuestions: (newValue: Question[]) => void,
    onViewResults: () => void,
    close: () => void
}> = ({questions, setQuestions, onViewResults, close}) => {

    const [questionNumber, setQuestionNumber] = useState(0)

    const [display, setDisplay] = useState<"quiz" | "result">("quiz")

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
        setDisplay("result")
    }

    const correctAnswers = () => {
        return questions.map(q => q.answers)
            .filter(answers => answers.map(a => a.correct === a.isSelected)
                .reduce((prev, current) => prev && current, true))
            .length
    }

    const QuizContent = (
        <>
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
                <Button style={{left: 5}}
                        onClick={() => navigate("prev")}
                >
                    PREVIOUS
                </Button>
            }
            <Button style={{
                right: 5,
                ...(questionNumber === questions.length - 1 && {
                    backgroundColor: "#969E3D",
                }),
            }}
                    onClick={() => questionNumber === (questions.length - 1) ? submitQuestioner() : navigate("next")}
            >
                {questionNumber === (questions.length - 1) ? "FINISH" : "NEXT"}
            </Button>
        </>
    )

    const ResultContent = (
        <ResultBody>
            <ContentWrapper>
                <Title>Congratulations</Title>
            </ContentWrapper>
            <ContentWrapper>
                <ScoreBody>
                    <ScoreText>{correctAnswers()}/{questions.length}</ScoreText>
                    <ScoreReviewText>Keep up the good work!</ScoreReviewText>
                </ScoreBody>
            </ContentWrapper>
            <ContentWrapper>
                <Button onClick={() => onViewResults()} style={{position: "relative"}}>View results</Button>
            </ContentWrapper>
        </ResultBody>
    )

    return (
        <CustomModal body={display === "quiz" ? QuizContent : ResultContent} close={close}/>
    )
}

export default QuizModal