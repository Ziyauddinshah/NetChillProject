import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formData: FormGroup;
  dataAdded: boolean = false;
  message1: string = '';
  message2: string = '';
  dataAdded1: boolean = false;
  dataAdded2: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.formData = this.formBuilder.group({
      userType: ['', [Validators.required]],
      name: ['', [Validators.required]],
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
  onAddRecord() {
    console.log('Data when add record is clicked ', this.formData.value);
    var name = this.formData.value.name;
    var email = this.formData.value.email;
    var password = this.formData.value.password;

    if (this.recordValidation(name, email, password)) {
      this.userService.register(this.formData.value).subscribe({
        next: (response: any) => {
          if (response.message1 && response.message2) {
            this.formData.reset();
            this.dataAdded1 = true;
            this.dataAdded2 = false;
            this.message1 = response.message1;
            this.message2 = response.message2;
            //console.log(response.message1, response.message2);
          } else {
            this.dataAdded2 = true;
            this.dataAdded1 = false;
            this.message1 = response.message1;
            //console.log(response.message1);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else {
      alert('Something wrong');
    }
  }
  onClear() {
    this.formData.reset();
  }
  recordValidation(name: any, email: any, password: any): boolean {
    if (
      name.length >= 1 &&
      email.match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}') &&
      password.length >= 5
    ) {
      return true;
    } else {
      return false;
    }
  }
}
