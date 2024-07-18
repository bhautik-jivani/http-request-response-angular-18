import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptores(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    // const req = request.clone({
    //     headers: request.headers.set('X-Debug', 'TESTING')
    // })
    console.log('[Outgoing Request]');
    console.log(request);
    // console.log(req)
    // return next(req);
    return next(request).pipe(
        tap({
            next: event => {
                if (event.type === HttpEventType.Response) {
                    console.log('[Incoming Response]');
                    console.log(event.type);
                    console.log(event.body);
                }
            }
        })
    );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptores]))],
}).catch((err) => console.error(err));
