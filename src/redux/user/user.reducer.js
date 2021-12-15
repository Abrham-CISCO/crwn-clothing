const INITIAL_STATE = {
    currentUser: null
}
//default value state = INITIAL_STATE
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return{
                ...state, currentUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;