import {HttpEvent} from '@angular/common/http';
import {Subscriber} from 'rxjs/internal/Subscriber';

export interface MockObservableInterface {
  next<T>(data: T, subject: Subscriber<HttpEvent<T>>): void;
}
