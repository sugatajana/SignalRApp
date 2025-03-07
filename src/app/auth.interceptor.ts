import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment/environment';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastService } from './services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const toastr = inject(ToastService);
  const loginUrl = `${environment.baseURL}/api/Login`;

  if (req.url === loginUrl)
    return next(req);

  const token = localStorage.getItem('token')

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(authReq).pipe(
    tap({
      next: (event: any) => {
        if (event.body && event.body.isValid === false) {
          toastr.showError(event.body.errorMessage);
        }
      },
      error: (error) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          router.navigate(['/login']);
        }
      }
    })
  );
};
