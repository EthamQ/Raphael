import { Injectable } from '@angular/core';
import {EventModel} from '../models/event.model';
import {HttpClient} from '@angular/common/http';
import {CreatorModel} from '../models/creator.model';
import {DatesModel} from '../models/dates.model';
import {TimeselectionModel} from '../models/timeselection.model';
import * as moment from 'moment';
import { ServerDataService } from './serverDataService';


@Injectable()

export class CreateService {
  postURL = '/event/new';
  adminID: string;
  joinID: string;
  creator: CreatorModel;
  timeSelection: Array<TimeselectionModel> = [];
  event: EventModel;
  detailsBool = false;
  calendarBool = false;
  summaryBool = false;
  serverResponse: any;
  progress = 10;
  constructor(
    private http: HttpClient,
    private serverDataService: ServerDataService
  ) {
    this.event = new EventModel();
    this.creator = new CreatorModel('dummy@web.de');
    this.postURL = this.serverDataService.getServerURL() + this.postURL;
  }
  postData() {
    console.log(this.postURL);
    this.http.post(this.postURL, this.event).subscribe((data: any) => {
      console.log(data);
      this.adminID = data.data[0].creator.adminUUID;
      this.joinID = '10.150.133.137:4200/join/' + data.data[0].uuid;
    });

  }
  setDetails() {
    this.detailsBool = true;
    this.progress += 30;

  }
  setCalendar() {
    console.log("setCalendar()");
    for (let i = 0; i < this.timeSelection.length; i++) {
      this.event.date.push(this.timeSelection[i].parseToTimeStamp());
    }
    this.event.creator = this.creator;
    this.calendarBool = true;
    this.progress += 30;
    this.postData();
  }
}
