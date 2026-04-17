import QuizModal from "../components/QuizModal.tsx";
import {useState} from "react";

const Quiz = () => {

    const [questions, setQuestions] = useState([
        {
            question: "What technology is essential for this role?",
            answers: [
                {
                    text: "Java",
                    correct: false,
                    isSelected: false
                },
                {
                    text: "HTML",
                    correct: true,
                    isSelected: false
                },
                {
                    text: "C++",
                    correct: false,
                    isSelected: true
                },
                {
                    text: "Python",
                    correct: true,
                    isSelected: false
                }
            ]
        },
        {
            question: "What technology is essential for this role?",
            answers: [
                {
                    text: "Java",
                    correct: true,
                    isSelected: false
                },
                {
                    text: "HTML",
                    correct: true,
                    isSelected: false
                },
                {
                    text: "C++",
                    correct: true,
                    isSelected: false
                },
                {
                    text: "Python",
                    correct: true,
                    isSelected: false
                }
            ]
        }
    ])

    return (
        <div style={{width: "100%", height: "100%", backgroundColor: "red"}}>
            <QuizModal questions={questions} close={() => {
            }} setQuestions={setQuestions} onViewResults={() => {
            }}></QuizModal>
            {/*<FeedbackModal questions={questions} close={() => {}}/>*/}
        </div>
    )
}

export default Quiz