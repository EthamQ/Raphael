import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { DatesModel } from '../models/dates.model';
import { ParticipantModel } from '../models/participant.model';
import * as moment from 'moment';
import { CreatorModel } from '../models/creator.model';
import { HttpClient } from '@angular/common/http';
import { ServerModel } from '../models/server.model';
import { URLService } from './url-service';
@Injectable()
export class JoinService {

  getURl = '/event/';
  UUID: string;
  postURL = '/participant/';
  votes = [];
  viewNav: string;
  serverData: ServerModel;
  joiner = new ParticipantModel('Your Name');
  dataLoaded: boolean;
  constructor(
    private http: HttpClient,
    private URLService: URLService
  ) {
    moment.locale('en');
    this.dataLoaded = false;
    this.getURl = this.URLService.getServerURL() + this.getURl;
    this.postURL = this.URLService.getServerURL() + this.postURL;
  }
  postData() {
    console.log("in postData: ");
    console.log(this.joiner);
    this.http.post(this.postURL + this.UUID, this.joiner).subscribe(res => console.log(res));

  }
  getData() {
    this.http.get(this.getURl + this.UUID).subscribe(
      (data: any) => {
        const serverData = data.data[0];
        this.serverData = new ServerModel(serverData);
        this.viewNav = '../../view/' + this.UUID;
        this.joiner.dates = [];
        for (let i = 0; i < this.serverData.date.length; i++) {
          let votes = 0;
          for (let j = 0; j < this.serverData.participants.length; j++) {
            if (this.serverData.participants[j].dates[i] === true) {
              votes = votes + 1;
            }
          }
          this.votes.push(votes);
        }
        for (let i = 0; i < this.serverData.date.length; i++) {
          this.joiner.dates.push(false);
        }
      });
  }
}
