import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class WebService {
    url = 'http://localhost/API/';
    //url = 'http://umnspa.janssenrahardja.xyz/umnspa/';
    
    
    constructor(private http: Http) {
    }

    post(link : string, body : string, headers: Headers)
    {
        let _headers = headers;
        if(!headers){
            _headers = new Headers({ 'Content-Type': 'application/json' });
        }
        let options = new RequestOptions({ headers: _headers });
        return this.http.post(link, body, options);
    }

    get(link : string, headers: Headers){
        if(headers == null){
            return this.http.get(link);
        } else {
            let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.ArrayBuffer });
            return this.http.get(link, options);
        }
    }

    put(link: string, headers: Headers, body: any, range: string){
        let options = new RequestOptions({ headers: headers });
        return this.http.put(link, body, options);
    }
}