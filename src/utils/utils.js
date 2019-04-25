import { QUESTION_TYPES } from "../constants/Constants";

export const parseQuestionFromJSON = (question) => {
    switch(question.type) {
        case QUESTION_TYPES.TEXT:
            return {
                type: QUESTION_TYPES.TEXT,
                description: question.description,
                right: question.answer,
                isCreated:true
            }
        case QUESTION_TYPES.RADIO:
            return {
                type: QUESTION_TYPES.RADIO,
                description: question.description,
                variants: question.variants.map((el)=>{return el.text }),
                right: question.answer.map((el)=>{return el-1}),
                isCreated:true
            }
        case QUESTION_TYPES.CHECK:
            return {
                type: QUESTION_TYPES.CHECK,
                description: question.description,
                variants: question.variants.map((el)=>{return el.text }),
                right: question.answer.map((el)=>{return el-1}),
                isCreated:true
            }
    }
}

export const parseQuestionToJSON = (question) => {
    switch(question.type) {
        case QUESTION_TYPES.TEXT:
            return {
                type: QUESTION_TYPES.TEXT,
                description: question.description,
                answer: question.right,
                weight: 1
            }
        case QUESTION_TYPES.CHECK:
        case QUESTION_TYPES.RADIO:
            return {
                type: question.type,
                description: question.description,
                variants: {
                    correct: question.variants
                    .map((el) => {
                        return {
                            text: el.text
                        }
                    })
                    .filter(
                        (el,iedx)=>{
                            return question.right.includes(iedx)
                        }
                    ),
                    other: question.variants
                    .map((el) => {
                        return {
                            text:el.text
                        }
                    })
                    .filter(
                        (el,iedx)=>{
                            return !question.right.includes(iedx)
                        }
                    )
                },
                weight: 1
            }
    }
}