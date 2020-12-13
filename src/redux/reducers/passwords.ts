
const passwords = (state: any = [], action: any) => {
    switch (action.type) {
        case 'SET_PASSWORDS':
            return action.payload;
        case 'ADD_PASSWORD':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default passwords;
