// @ts-ignore
import ICAL from 'ical.js'
import axios, { AxiosResponse } from 'axios';

// tslint:disable-next-line:no-unnecessary-class
export default class ICalService {
    static headers: any = {
        credentials: 'Access-Control-Allow-Origin'
    }

    static getReq(url: string) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.google.com/calendar/ical/en.uk%23holiday%40group.v.calendar.google.com/public/basic.ics', true);

        xhr.setRequestHeader('credentials', 'Access-Control-Allow-Origin');
        // xhr.setRequestHeader("Content-Type", "application/json");
        xhr.withCredentials = true;

        xhr.send(null)

        return xhr;
    }

    static async getCalendar(url: string): Promise<any> {
        ICalService.getReq(url)


        // const xmlHttp: any = new XMLHttpRequest();
        // xmlHttp.open('GET', url, false); // false for synchronous request
        // xmlHttp.send(null);
        //
        // console.log(xmlHttp.responseText);
        //
        // return xmlHttp.responseText;
        // const calendarData: AxiosResponse = await axios.get(url, {headers: {
        //         credentials: 'Access-Control-Allow-Origin',
        //         withCredentials: true
        // }});

        // const jcalData: any = ICAL.parse(calendarData.data);
    }

}
