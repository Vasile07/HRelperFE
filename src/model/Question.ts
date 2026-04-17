import type Answer from "./Answer.ts";

export default interface Question{
    question : string,
    answers: Answer[]
}