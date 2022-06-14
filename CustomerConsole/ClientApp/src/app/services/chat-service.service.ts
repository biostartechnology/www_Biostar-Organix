import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppconstantsService } from './appconstants.service';
import { HttputilityService } from './httputility.service';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http: HttputilityService) { }
  getUserMessages(userid:any)  {
    return this.http.get(AppconstantsService.homeAPIs.chatAPI + '/' + userid);
  }

  SendReplyMessage(params:any) {
    this.http.post(AppconstantsService.homeAPIs.chatAPI,params);
  }

  getAllUserMessages() {
    return this.http.get(AppconstantsService.homeAPIs.chatAPI);
  }
}
