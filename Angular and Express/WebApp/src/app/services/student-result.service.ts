import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentResultService {
  data: any = {
    rollNo: 0,
    name: '',
  };
  url: string = 'http://localhost:3000';
  constructor(public httpClient: HttpClient) {}
  getAllStudentResult(): Observable<any> {
    return this.httpClient.get(`${this.url}/get-all`);
  }
  deleteStudentResult(rollNo: number): Observable<any> {
    return this.httpClient.get(`${this.url}/remove/${rollNo}`);
  }
  addStudentResult(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.url}/add-result`, formData);
  }
  editStudentResult(formData: FormData) {
    //console.log('data to update ', formData);
    return this.httpClient.put(`${this.url}/edit-result`, formData);
  }
  getOneStudentResult(studentFormData: any): Observable<any> {
    var rollNo = studentFormData.rollNo;
    var name = studentFormData.name;
    //console.log('data at student-result service ', studentFormData);
    return this.httpClient.get(`${this.url}/student-result/${rollNo}/${name}`);
  }
}
