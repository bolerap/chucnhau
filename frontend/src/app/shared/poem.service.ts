import 'rxjs/add/operator/toPromise';

import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";

import {Poem} from './poem';

@Injectable()
export class PoemService {
  // Properties
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'api/v1/card';
  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {
  }

  // Act with remote server
  generate(poem: Poem): Promise<any> {
    return this.http.post(this.url, JSON.stringify(poem), {headers: this.headers})
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

}
