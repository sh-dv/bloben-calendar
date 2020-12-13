import Crypto from '../bloben-package/utils/encryption';
import { reduxStore } from '../App';
import { setAllEvents, setEvents, setEventsAreFetching, setEventsLastSync } from '../redux/actions';
import { cloneDeep } from './common';
import EventStateEntity from '../data/entities/state/event.entity';
import {  findInArrayWithIndex } from './filter/findInArray';
import { EventResultDTO } from '../data/types';
import eventsLastSynced from '../redux/reducers/eventsLastSynced';
import { logger } from '../bloben-package/utils/common';

const decryptEvent = async (cryptoPassword: string, item: EventResultDTO): Promise<EventStateEntity> => {
    logger('CRYPTO', cryptoPassword)

    const eventResultDTO: EventResultDTO = item;
    const decryptedData: any = await Crypto.decrypt(
        eventResultDTO.data,
        cryptoPassword
    );

    const finalForm: any = {
        ...eventResultDTO,
        ...decryptedData,
    };
    const newEvent: EventStateEntity = new EventStateEntity(finalForm);

    return newEvent.getReduxStateObj();
}

export const decryptAllEvents = async (
    data: any
): Promise<void> => {
    const store: any = reduxStore.getState();
    const cryptoPassword: any = store.cryptoPassword;
    let allEventsClone: any = cloneDeep(store.allEvents);
    // Handle new, updated and deleted events
    if (store.eventsLastSynced) {
        logger('data', data)

        for (let j = 0; j < data.length; j += 1) {
            const newItem: any = await decryptEvent(cryptoPassword, data[j]);

            // Filter deleted events
            if (newItem.deletedAt) {
                allEventsClone = allEventsClone.filter((event: any) =>
                                                           event.id !== newItem.id
                )
            } else {

                if (allEventsClone.length === 0) {
                    allEventsClone.push(newItem);
                } else {
                    // Event is either new or needs update
                    allEventsClone.map((event: any, index: number) => {
                        if (event.id === newItem.id) {
                            return newItem;
                        }

                        // Event not found, push it
                        if (index + 1 === allEventsClone.length) {
                            allEventsClone.push(newItem)
                        }
                    })
                }

            }

            if (j + 1 === data.length) {
                reduxStore.dispatch(setAllEvents(allEventsClone));
            }
        }
    } else {
        const result: any = [];

        if (data && data.length > 0) {
            for (const item of data) {
                const eventResultDTO: EventResultDTO = item;
                const simpleEventObj: EventStateEntity = await decryptEvent(cryptoPassword, eventResultDTO);

                result.push(simpleEventObj);
            }
        }
        reduxStore.dispatch(setAllEvents(result));
    }

    reduxStore.dispatch(setEventsLastSync(new Date()));
}

export const decryptEvents = async (
    data: any
): Promise<void> => {

    const store: any = reduxStore.getState();
    // Clone state
    const stateClone: any = cloneDeep(store.events);

    const cryptoPassword: any = store.cryptoPassword;

    if (!data || data.length === 0) {
        return;
    }
    const objEntries: any = Object.entries(data);

    // Prepare day arrays
    for (let i = 0; i < data.length; i++) {
        // Decrypt events
        const decryptedEvents: any = [];

        // // Add day to allDays for Agenda view
        // if (agendaDays.indexOf(key) === -1) {
        //   agendaDays.push(key);
        // }
        const eventResultDTO: EventResultDTO = data[i];
        const decryptedData: any = await Crypto.decrypt(
            eventResultDTO.data,
            cryptoPassword
        );

        const finalForm: any = {
            ...eventResultDTO,
            ...decryptedData,
        };
        const newEvent: EventStateEntity = new EventStateEntity(finalForm);
        const simpleEventObj: EventStateEntity = newEvent.getReduxStateObj();

        // Get datekey
        const dateKey: string = newEvent.getDateKey();

        const eventsArray: any[] = stateClone[dateKey];
        // Check if there is date in redux store with event datekey
        // Datekey exists, add new item or update existing
        if (eventsArray && eventsArray.length > 0) {

            const itemInState: any = await findInArrayWithIndex(eventsArray, simpleEventObj);
            // Item exists, update it
            if (itemInState.children) {
                stateClone[dateKey][itemInState.index] = simpleEventObj;
                if (i + 1 === data.length) {
                    reduxStore.dispatch(setEvents(stateClone));
                    reduxStore.dispatch(setEventsAreFetching(false));
                }
            } else {
                eventsArray.push(simpleEventObj);
                if (i + 1 === data.length) {
                    reduxStore.dispatch(setEvents(stateClone));
                    reduxStore.dispatch(setEventsAreFetching(false));

                }
            }
        } else {
            stateClone[dateKey] = []
            stateClone[dateKey].push(simpleEventObj);
            if (i + 1 === data.length) {
                reduxStore.dispatch(setEvents(stateClone));
                reduxStore.dispatch(setEventsAreFetching(false));
            }
        }
    }

    // TODO add to cache??
};
