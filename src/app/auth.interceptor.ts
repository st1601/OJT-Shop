import { SerService } from './service/ser.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private serService: SerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.serService.isLogIn()) {
      let authRequest = request.clone({
        setHeaders: {
          authorization: 'Bearer ' + this.serService.getToken(),
        },
      });

      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
