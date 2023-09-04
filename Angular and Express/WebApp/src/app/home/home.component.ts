import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StudentResultService } from '../services/student-result.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  studentResult: any;
  constructor(
    private route: Router,
    public httpClient: HttpClient,
    public service: StudentResultService
  ) {}
  ngOnInit() {}
  onloginAs(userType: string): void {
    //this.getDataFromServer();
    this.route.navigate(['/login'], { state: { userType: userType } });
  }

  // getDataFromServer() {
  //   if (this.userType == 'student') {
  //     return this.httpClient
  //       .get('http://localhost:3000/users')
  //       .subscribe((response) => {
  //         console.warn(response);
  //       });
  //   } else {
  //     return this.httpClient
  //       .get('http://localhost:3000')
  //       .subscribe((response) => {
  //         this.studentResult = response;
  //         console.log(response);
  //       });
  //   }
  // }
}
