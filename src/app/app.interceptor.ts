import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';


const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router, private status: HTTPStatus) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authReq = req;
    this.status.setHttpStatus(true);

    return next.handle(authReq).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['user']);
          }
        }
        return  throwError(error);//Observable.throw(error);
      }),
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }

}
