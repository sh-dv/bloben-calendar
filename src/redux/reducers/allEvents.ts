import { cloneDeep } from '../../utils/common';

const allEvents = (state: any = [], action: any) => {
    switch (action.type) {
        case 'SET_ALL_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

export default allEvents;
