import { GET_PROGRAMS } from '../constants/ActionTypes';

const initialState = [
    // {
    //     id: '',
    //     title: 'asdasd'
    // },
    // {
    //     id: '',
    //     title: '1234'
    // },
    // {
    //     id: '',
    //     title: '32133'
    // },
];


function programListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROGRAMS:
            return action.payload||[];
        default:
            return state;
    }
}

export default programListReducer;