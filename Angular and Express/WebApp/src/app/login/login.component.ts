import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input('data') loginAs!: string;
  loginType: any;
  formData: FormGroup;
  routeData: any;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    this.routeData = this.route.getCurrentNavigation()?.extras;
    this.loginType = this.routeData.state['userType'];
    //console.log('Login As ', this.loginType);
  }
  ngOnInit(): void {}
  onLogin() {
    var email = this.formData.value.email;
    var password = this.formData.value.password;
    if (this.validation(email, password)) {
      this.authService.login(this.formData.value, this.loginType);
      if (this.loginType == 'student') {
        this.route.navigate(['/student']);
      } else {
        this.route.navigate(['/teacher']);
      }
      this.formData.reset();
    }
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
}
