import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/Requests/UserModel';
import { ResultWithData } from '../Models/Responses/ResultWithData';
import { UserDetails } from '../Models/Responses/UserDetails';
import { ResultWithoutData } from '../Models/Responses/ResultWithoutData';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = environment.baseURL;
  constructor(private http: HttpClient) { }

  create(user: UserModel): Observable<ResultWithData<UserModel>> {
    return this.http.post<ResultWithData<UserModel>>(`${this.apiBaseUrl}/api/users`, user);
  }

  getAll(status?: string): Observable<ResultWithData<UserDetails>> {
    let url = `${this.apiBaseUrl}/api/users`;
    if (status) {
      url += `?status=${status}`;
    }

    return this.http.get<ResultWithData<UserDetails>>(url);
  }

  getUserById(id: number): Observable<ResultWithData<UserModel>> {
    return this.http.get<ResultWithData<UserModel>>(`${this.apiBaseUrl}/api/users/${id}`);
  }

  update(user: UserModel, id: number): Observable<ResultWithData<UserModel>> {
    return this.http.put<ResultWithData<UserModel>>(`${this.apiBaseUrl}/api/users/${id}`, user);
  }

  delete(id:number):Observable<ResultWithoutData>{
    return this.http.delete<ResultWithoutData>(`${this.apiBaseUrl}/api/users/${id}`);
  }
}
