import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  formData: FormGroup;
  message: string = '';
  constructor(
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
    });
  }
  onSubmit() {
    this.userService.forgetPassword(this.formData.value).subscribe((res) => {
      if (res) {
        this.message = res.message;
      }
    });
    this.formData.reset();
  }
}
