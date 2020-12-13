// @ts-ignore
// @ts-ignore

import axios, { AxiosResponse } from 'axios';
import Client from '../utils/webauthn/Client';
import { logger } from '../bloben-package/utils/common';

// tslint:disable-next-line:no-unnecessary-class
export default class WebAuthn {
    static headers: any = {
        credentials: 'Access-Control-Allow-Origin'
    }

    static register = () => {
        const client = new Client();
        client.register({ name: 'asdad', username: 'asdasd' }).then((response) => {
            logger('Register response: ', response)
        }).catch((error) => {
            logger('Register error: ', error)
        })
    }

    static login = () => {
        const client = new Client();
        client.login({ username: 'asdasd' }).then((response) => {
            logger('Login response: ', response)
        }).catch((error) => {
            logger('Login error: ', error)
        })
    }

    static getReq(url: string) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.google.com/calendar/ical/en.uk%23holiday%40group.v.calendar.google.com/public/basic.ics', true);

        xhr.setRequestHeader('credentials', 'Access-Control-Allow-Origin');
        // xhr.setRequestHeader("Content-Type", "application/json");
        xhr.withCredentials = true;

        xhr.send(null)

        logger(xhr)

        return xhr;
    }

}
