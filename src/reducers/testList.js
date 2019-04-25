import {GET_TESTS} from '../constants/ActionTypes';

const initialState = [
	// {
	// 	id:'123',
	// 	name:"Hueviy test",
	// },
	// {
	// 	id:'456',
	// 	name: 'Pizdatiy test'
	// },
	// {
	// 	id:'poshli nahui',
	// 	name: 'sosat'
	// }
];


function testListReducer(state = initialState, action) {
	switch (action.type) {
        case GET_TESTS:
            return action.payload||[];
		default:
			return state;
	}
}

export default testListReducer;