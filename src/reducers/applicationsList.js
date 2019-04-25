import { 
    GET_APPLICATIONS
} from '../constants/ActionTypes'

//Initial state
const initialState = [
    // {
    //     id: 1,
    //     program: {id:1, title:"CS Bachelor"},
    //     candidate: {id:1, name:"Mikhail Fadeev"},
    //     status : {
    //         type: "rejected",
    //         changed: 12345678,
    //         reason: "Tupoi",
    //         fixable: false
    //     }
    // },
    // {
    //     id: 2,
    //     program: {id:1, title:"CS Bachelor"},
    //     candidate: {id:1, name:"Mikhail Fadeev"},
    //     status : {
    //         type: "initial",
    //         changed: 12345678
    //     }
    // },
    // {
    //     id: 3,
    //     program: {id:1, title:"CS Bachelor"},
    //     candidate: {id:1, name:"Mikhail Fadeev"},
    //     status : {
    //         type: "review",
    //         changed: 12345678
    //     }
    // },
    // {
    //     id: 4,
    //     program: {id:1, title:"CS Bachelor"},
    //     candidate: {id:1, name:"Mikhail Fadeev"},
    //     status : {
    //         type: "interview",
    //         changed: 12345678,
    //         date: 13245678,
    //         interviewew: 1
    //     }
    // },
    // {
    //     id: 5,
    //     program: {id:1, title:"CS Bachelor"},
    //     candidate: {id:1, name:"Mikhail Fadeev"},
    //     status : {
    //         type: "accepted",
    //         changed: 12345678,
    //         comment: "Tupoi",
    //         interviewer: 1
    //     }
    // }
];

function applicationsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_APPLICATIONS:
            return action.payload||state;
        default:
            return state;
    }
}

export default applicationsReducer;