import { v4 } from 'uuid';
import { TCalendarNotificationType } from '../../../types/types';
import { parseDateToString, parseToDate } from '../../../components/calendar-view/calendar-common';
import Crypto from '../../../bloben-package/utils/encryption';

export type CalendarsStateType = 'calendars';
export const CALENDARS_STATE: string = 'calendars';

/**
 * Private part for encryption
 */
export type CalendarPropsForEncryption = {
  name: string;
};

/**
 * Body to save in server
 */
export type CalendarBodyToSend = {
  id: string;
  data: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  isShared: boolean;
  isPublic: boolean;
  reminders: string | null;
}

type iCalDataType = {
  address: string;
  lastSyncAt: Date;
}

export type CalendarStateType = {
  id: string;
  name: string;
  color: string;
  reminders: TCalendarNotificationType[];
  iCalData: iCalDataType | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isPublic: boolean;
  isShared: boolean;
  isLocal: boolean;
  isSynced: boolean;
};

export default class CalendarStateEntity {
  id: string;
  name: string;
  color: string;
  reminders: TCalendarNotificationType[];
  iCalData: iCalDataType | null = null;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean = false;
  isShared: boolean = false;
  isLocal: boolean;
  isSynced: boolean;

  constructor(data: any, iCalData?: any) {
    const isNotNew: boolean = data.updatedAt;

    this.id = data.id ? data.id : v4();
    this.color = data.color;
    this.reminders = data.reminders;
    this.isShared = data.isShared;
    this.isPublic = data.isPublic;
    this.createdAt = data.createdAt ? parseToDate(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? parseToDate(data.updatedAt) : this.createdAt;
    this.isLocal = !isNotNew;
    this.isSynced = isNotNew;

    if (iCalData) {
      this.name = data.name;
      this.iCalData = iCalData;
    } else {
      this.name = data.name;
    }
  }

  public createFromEncrypted = (encryptedData: any, decryptedData: any) => {
    this.id = encryptedData.id
    this.name = decryptedData.name;
    this.color = encryptedData.color;
    this.reminders = encryptedData.reminders;
    this.createdAt = parseToDate(encryptedData.createdAt);
    this.updatedAt = parseToDate(encryptedData.updatedAt);
    this.isShared = encryptedData.isShared;
    this.isPublic = encryptedData.isPublic;
    this.isLocal = false;
    this.isSynced = true;
  }

  public getStoreObj = () => {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      reminders: this.reminders,
      createdAt: parseToDate(this.createdAt),
      updatedAt: parseToDate(this.updatedAt),
      isShared: this.isShared,
      isPublic: this.isPublic,
      isLocal: false,
      isSynced: true,
    }
  }

  /**
   * Get only private parts of event for encryption
   */
  public getCalendarPropsForEncryption = (): CalendarPropsForEncryption =>
      ({
        name: this.name,
      })

  /**
   * Encrypt calendar with password
   * @param password
   */
  public encryptCalendar = async (password: string): Promise<string> =>
      Crypto.encrypt(this.getCalendarPropsForEncryption(), password)


  public formatBodyToSend = async (password: string): Promise<CalendarBodyToSend> =>
      (
          {
            id: this.id,
            color: this.color,
            data: await this.encryptCalendar(password),
            createdAt: parseDateToString(this.createdAt),
            updatedAt: parseDateToString(this.updatedAt),
            isShared: this.isShared,
            isPublic: this.isPublic,
            reminders: this.reminders.length > 0
                ? JSON.stringify(this.reminders)
                : null,
          }
      )
  public static flagAsSynced = (calendar: CalendarStateEntity): CalendarStateEntity => {
    calendar.isSynced = true;
    calendar.isLocal = false;

    return calendar;
  }
}
