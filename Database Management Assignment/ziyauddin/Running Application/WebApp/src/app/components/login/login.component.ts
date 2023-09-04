import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  routeData: any;
  message: string = '';
  loginResponse: any;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.formData = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit(): void {}
  getAll() {
    this.userService.getAllUsers().subscribe((res) => console.log(res));
  }
  onLogin() {
    var email = this.formData.value.email;
    var password = this.formData.value.password;
    if (this.validation(email, password)) {
      this.userService.login(this.formData.value).subscribe({
        next: (response: string | any[]) => {
          this.loginResponse = response;
          if (this.loginResponse.data.length > 0) {
            localStorage.setItem(
              'Key',
              JSON.stringify(this.loginResponse.data[0])
            );
            localStorage.setItem(
              'jwtToken',
              JSON.stringify(this.loginResponse.jwtToken)
            );
            this.route.navigate(['/home']);
          } else {
            this.message = this.loginResponse.message;
            console.log(this.message);
          }
        },
        error: (error: any) => {
          console.log('error ', error);
        },
      });
      this.formData.reset();
    }
  }
  onClear() {
    this.formData.reset();
  }
  validation(email: string, password: string) {
    if (
      email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}') &&
      password.length >= 5
    ) {
      return true;
    } else {
      return false;
    }
  }
  forgetPassword() {
    this.route.navigate(['/forget-password']);
  }
}
