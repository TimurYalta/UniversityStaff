import { 
    GET_APPLICATION,
    MODIFY_APPLICATION
} from '../constants/ActionTypes'

const initialState = {
    // id: 1,
    // test_attempts: [
    //     {
    //         id: 1,
    //         test_id:2,
    //         grade: 14.5
    //     },
    //     {
    //         id: 2,
    //         test_id:3,
    //         grade: 74.5
    //     }
    // ],
    // candidate: {
    //     id: 1,
    //     name: "Mikhail Fadeev"
    // },
    // history:[
    //     {
    //         type: "initial",
    //         changed: 12345678
    //     },
    //     {
    //         type: "accepted",
    //         changed: 12345678,
    //         interviewer:21342,
    //         comment:'loh',
    //         reason: "Tupoi",
    //         fixable: false
    //     }
    // ]
    id: "",
    test_attempts: [
    ],
    candidate: {
        id: '',
        name: ''
    },
    history:[
        
    ]
};

function candidateApplication(state = initialState, action) {
    switch(action.type) {
        case GET_APPLICATION:
            return action.payload;
        case MODIFY_APPLICATION:
            return initialState;
        default:
            return state;
    }
}

export default candidateApplication;