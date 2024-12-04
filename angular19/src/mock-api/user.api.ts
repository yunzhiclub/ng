import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ApiInjector, MockApiInterface, RequestOptions } from "../../projects/mock-api/src/public-api";
import { Observable } from "rxjs";

export class UserApi implements MockApiInterface {

  /**
   * implement getInjectors() function and return ApiInjector Array.
   */
  getInjectors(): ApiInjector[] {
    return [
      new ApiInjector(
        {
          method: 'DELETE',
          url: 'user/:id',
          description: 'delete user with id',
          // when result type is HttpResponse, the NgMockApi will return the HttpResponse immediate.
          result: new HttpResponse<void>()
        }
      ),
      new ApiInjector({
        method: 'GET',
        url: `user/getCurrentUsername`,
        // when result type is string | number | Object | ... the NgMockApi will return a HttpResponse which contains the result with a 0.5S - 3.0S's delay. 
        result: 'mock user'
      }),
      new ApiInjector({
        method: 'GET',
        url: 'user/login',
        description: '用户登录',
        // the result type is also can be function
        result: () => {
          // can return an Observable<HttpErrorResponse> in the function. 
          return new Observable<HttpErrorResponse>(ob => {
            ob.error(new HttpErrorResponse({status: 401}));
            ob.complete();
          });
        }
      }),
      new ApiInjector (
        {
          method: 'PUT',
          url: `user/:id`,
          // can set params with result's function, the first params type is `{[key: string]: string}`, and the second is RequestOptions. 
          result: (params: {id: string}, options: RequestOptions) => {
              const id = +params.id;          // get path param with params.
              const body = options.body;      // get request body with options.
              body.id = id;
              return new HttpResponse<any>({body});  
              // can return body directly also.
              // return body;
            }
        })
    ];
  }
}