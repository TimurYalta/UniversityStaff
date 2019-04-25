import { 
	CREATE_NEW_TEST,
	SET_ID,
	CHANGE_NAME,
	ADD_QUESTION,
	SAVE_QUESTION, 
	DELETE_QUESTION,
	SEND_TEST,    
	PUT_QUESTIONS
} from '../constants/ActionTypes';
import {QUESTION_TYPES} from '../constants/Constants';

// The initial state of the App
const initialState = {
	id:'',
	name:'',
	educationalProgram:'',
	questions:[]
};

function testCreationReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_NEW_TEST:
			// Delete prefixed '@' from the github username
			return {
                ...state,
                name: action.payload.name,
            };
		case SET_ID:
            return {
                ...state,
                id: action.payload
            }; 
		case CHANGE_NAME:
            return {
                ...state,
                name: action.payload
            }; 
            
		case ADD_QUESTION:
			const newQuestion = {
				type: QUESTION_TYPES.TEXT,
				description: '',
				variants: [],
				right:'',
				isCreated:false
			};
            return {
                ...state,
                questions: [...state.questions, newQuestion],
			};
			
		case SAVE_QUESTION:
			let newQuestions = [...state.questions];
			newQuestions[action.payload.questionNumber] = {
				...action.payload.question,
				isCreated:true
			};
            return {
                ...state,
                questions: newQuestions
			}; 
			
		case DELETE_QUESTION:
			let questions = [...state.questions];
			questions.splice(action.payload, 1);
            return {
                ...state,
                questions: questions
			};
		
		case PUT_QUESTIONS:
			return {
				id: action.payload.testId,
				name: action.payload.title,
				questions: action.payload.questions
			}
            
		case SEND_TEST:
			return initialState;
            
		default:
			return state;
	}
}

export default testCreationReducer;