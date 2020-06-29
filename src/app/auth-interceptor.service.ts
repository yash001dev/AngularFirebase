import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req:HttpRequest<any>,next:HttpHandler){
    console.log('Request is on its way');
    console.log(req.url);
    const modeifeRequest=req.clone({headers:req.headers.append('Auth','xyz')
    });
    return next.handle(modeifeRequest);

  }
}
