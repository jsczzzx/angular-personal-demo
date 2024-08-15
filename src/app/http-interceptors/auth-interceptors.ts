import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const authInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authToken = localStorage.getItem('token') || '';

  const authReq = req.clone({
    headers: req.headers.set('Authorization', authToken)
  });
  
  return next(authReq);
};
