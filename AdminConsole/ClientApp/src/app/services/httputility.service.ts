import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class HttputilityService {

 
  uploadObsr: Subscription = new Subscription();

  constructor(private http: HttpClient, private helper: HelperService) {
  }

  private getHeaders(): HttpHeaders {
       return new HttpHeaders({
              'dataType': 'json',
              'Content-Type' : 'application/json'
          });
  }

  private onError(error: any, helper: HelperService) {
      if (error != null && error.status == 403 || error.status == 401) {
          helper.Logout();
      } else helper.stopWorkProgressBar();
  }

  private onComplete(helper: HelperService) {
      helper.stopWorkProgressBar();
  }

  //http post method
  post(url: string, data: any, option?: any, isbg?: boolean): Promise<any> {
      return new Promise((resolve, reject) => {
          if (!url) {
              reject('no data to send');
          }
          try {
            if (!isbg){
              	this.helper.startWorkProgressBar();
          }
              url = environment.serverAddress + "/" + url;
              this.http.post(url, JSON.stringify(data), option ? option : { headers: this.getHeaders() })
                  .subscribe(
                      (res) => {
                          resolve(res);
                      },
                      (err) => {
                          this.onError(err, this.helper);
                          reject(err);
                      },
                      () => {
                            this.helper.stopWorkProgressBar();
                          // console.log(url)
                          this.onComplete(this.helper)
                      }
                  );
          } catch (error) {
              reject(error);
          }
      });
  }

  // http put method
  put(url:string, data?:any, option?:any): Promise<any> {
      return new Promise((resolve, reject) => {
          if (!url) {
              reject('no data to send');
          }
          try {
              this.helper.startWorkProgressBar();
              url = environment.serverAddress + "/" + url;
              this.http.put(url, data, option ? option : { headers: this.getHeaders() })
                  .subscribe(
                      (res) => {
                            this.helper.stopWorkProgressBar();
                          resolve(res);
                      },
                      (err) => {
                          this.onError(err, this.helper);
                          reject(err);
                      },
                      () => {
                          // console.log(url)
                          this.onComplete(this.helper)
                      }
                  );
          } catch (error) {
              reject(error);
          }
      });
  }

  // http get method
  get(url:string, data?:any, headers?:HttpHeaders ): Promise<any> {
      return new Promise((resolve, reject) => {
          if (!url) {
              reject('url not set');
          }
          try {
              this.helper.startWorkProgressBar();
              url = environment.serverAddress + "/" + url;
              var options  = {
                  params: data ? data : {},
                  headers: headers ? headers : this.getHeaders(),
              }
             
              this.http.get(url, options)
                  .subscribe(
                      (res) => {
                            this.helper.stopWorkProgressBar();
                          resolve(res);
                      },
                      (err) => {
                          this.onError(err, this.helper);
                          reject(err);
                      },
                      () => {
                          // console.log(url)
                          this.onComplete(this.helper)
                      }
                  );
          } catch (error) {
              reject(error);
          }
      });
  }

  // http delete method
  delete(url:string, option?:any): Promise<any> {
      return new Promise((resolve, reject) => {
          try {
              this.helper.startWorkProgressBar();
              if (!option) {
                  option = this.getHeaders()
              }
              url = environment.serverAddress + "/" + url;
              this.http.delete(url, option)
                  .subscribe(
                      (res) => {
                          resolve(res);
                      },
                      (err) => {
                          this.onError(err, this.helper);
                          reject(err);
                      },
                      () => {
                          // console.log(url)
                          this.onComplete(this.helper)
                      }
                  );
          } catch (error) {
              reject(error);
          }
      });
  }

  uploadFileWithProgress(method:string, url:string, data:any, headers?:any) {
      let observable = new Observable<{}>(observer => {
          if (!url || !data) {
              observer.error({ error: true, message: 'no data to send' });
          }
          try {
              let sub = this.http.request(new HttpRequest(method, url, data, { reportProgress: true, headers: headers ? headers : this.getHeaders() }))
              this.uploadObsr = sub.subscribe(event => {
                  switch (event.type) {
                      case HttpEventType.Sent:
                          console.log('Request sent!');
                          observer.next({ isProgress: true, data: 0 });
                          break;
                      case HttpEventType.ResponseHeader:
                          console.log('Response header received!');
                          break;
                      case HttpEventType.UploadProgress:
                          // console.log(event.loaded, event)
                          if(event.total){
                            const percentDone = Math.round(100 * event.loaded / event.total);
                            observer.next({ isProgress: true, data: percentDone });
                          }
                          break;
                      case HttpEventType.Response:
                          console.log('Response done', event.body);
                          observer.next({ success: true, data: event.body });
                          break;
                      case HttpEventType.DownloadProgress:
                          console.log('Response done', event);
                          break;
                  }
              }, error => {
                  observer.error(error);
              });

          } catch (error) {
              observer.error(error);
          }
      });
      return observable;
  }

  sendRequest(method:string, url:string, data:any, headers?:any) {
      return new Promise((resolve, reject) => {
          try {
              this.helper.startWorkProgressBar();
              this.http.request(new HttpRequest(method, url, data, { headers: headers ? headers : this.getHeaders() }))
                  .subscribe(res => {
                      resolve(res);
                  }, err => {
                      this.onError(err, this.helper);
                      reject(err);
                  }, () => {
                      this.onComplete(this.helper)
                  });
          } catch (error) {
              console.error('Live api call ERROR : ', error);
          }
      })
  }

  multipeApiCalls(url: any[], options?:any, temp?:any): Promise<any> {
      return new Promise((resolve, reject) => {
          if (url.length == 0) {
              reject('no data to send');
          }
          let arr:Promise<Object>[] = [];
          url.forEach((ele) => {
              let subURL: any
              if (ele['Type'] == 'GET') {
                  subURL = this.http.get(environment.serverAddress + "/" + ele.URL).toPromise()
              } else if (ele['Type'] == 'POST') {
                  subURL = this.http.post(environment.serverAddress + "/" + ele.URL, ele.Data).toPromise()
              } else if (ele['Type'] == 'PUT') {
                  subURL = this.http.put(environment.serverAddress + "/" + ele.URL, ele.Data).toPromise()
              }
              arr.push(subURL);
          })
          // console.log(arr)
          try {
              this.helper.startWorkProgressBar();
              forkJoin(arr).subscribe(
                  (res) => {
                      resolve(res);
                  },
                  (err) => {
                      this.onError(err, this.helper);
                      reject(err);
                  },
                  () => {
                      this.onComplete(this.helper)
                  }
              );
          } catch (error) {
              reject(error);
          }
      });
  }

  
}
