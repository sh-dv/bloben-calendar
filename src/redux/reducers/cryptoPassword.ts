
const cryptoPassword = (state: any = '', action: any) => {
    switch (action.type) {
        case 'SET_CRYPTO_PASSWORD':
            return action.payload;
        default:
            return state;
    }
}

export default cryptoPassword;
