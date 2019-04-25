import { CREATE_PROGRAM, SET_PROGRAM_ID,CHANGE_PROGRAM_TITLE, ADD_TEST_TO_PROGRAM, DELETE_TEST_FROM_PROGRAM, SAVE_PROGRAM, CLEAR_PROGRAM, GET_PROGRAM } from "../constants/ActionTypes";

// The initial state of the App
const initialState = {
	id: '',
	title: '',
	tests: [],
};

function programReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_PROGRAM:
			return {
				...state,
				title: action.payload.name
			};
		case SET_PROGRAM_ID:
			return {
				...state,
				id: action.payload
			};
		case CHANGE_PROGRAM_TITLE:
		return{
			...state,
			name:action.payload
		};
		case ADD_TEST_TO_PROGRAM:
			return {
				...state,
				tests: [...state.tests, action.payload]
			};
		case GET_PROGRAM:
			return action.payload;
		case DELETE_TEST_FROM_PROGRAM:
			let tests = state.tests.filter((el) => { return el.id == action.payload });
			return { ...state, tests };
		case CLEAR_PROGRAM:
			return initialState;
		case SAVE_PROGRAM:
			return initialState;
		default:
			return state;
	}
}

export default programReducer;
