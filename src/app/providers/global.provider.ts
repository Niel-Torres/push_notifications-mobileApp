import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GlobalProvider {

  constructor(public http: HttpClient) { }

  // Sending a GET request to '/clients'
  public  getClients(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  // Sending a POST request to '/clients'
  public  saveClient(url:string, user: any): Observable<any> {
    return this.http.post<any>(url, user, httpOptions);
  }

  // Sending a GET request to '/clients/:id'
  public  getClientById(id: number) {

  }

  // Sending a PUT request to '/clients/:id'
  public  updateClient(user: any){

  }

  // Sending a DELETE request to '/clients/:id'
  public  deleteClientById(id: number) {

  }

}
