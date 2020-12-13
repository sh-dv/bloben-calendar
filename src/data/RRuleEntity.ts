export type rRule = {
  freq: string;
  wkst: string;
  count: number;
  interval: number;
  until: string;
  dtstart: string;
  dtend: string;
};

export default class RRuleEntity {
  freq: string;
  wkst: string;
  count: number;
  interval: number;
  until: string;
  dtstart: string;
  dtend: string;

  constructor(data: rRule) {
    const {freq, wkst, count, interval, until, dtstart, dtend} = data;

    this.freq = freq.toUpperCase();
    this.wkst = wkst;
    this.count = count;
    this.interval = interval;
    this.until = until;
    this.dtstart = dtstart;
    this.dtend = dtend;
  }

  /**
   * Parse JSON rRule obj to string rRule
   */
  public parseToString = (): string =>
      `DTSTART:${this.dtstart}\n
    RRULE:FREQ=${this.freq};
    ${this.count ? `COUNT=${this.count};` : ''}
    ${this.interval ? `INTERVAL=${this.interval};` : ''}
    ${this.until ? `UNTIL=${this.until}` : ''}`

  // TODO parseFromString
}
