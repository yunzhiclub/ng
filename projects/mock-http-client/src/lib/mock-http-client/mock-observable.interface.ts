import {HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs';

export interface MockObservableInterface {
  next<T>(data: T, subject: Subject<HttpResponse<T>>): void;
}
