import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentResultService } from '../services/student-result.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  studentFormData!: FormGroup;
  isStudentFound: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private service: StudentResultService,
    private route: Router
  ) {
    this.studentFormData = this.formBuilder.group({
      rollNo: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }
  onFindResult() {
    var rollNo = this.studentFormData.value.rollNo;
    var name = this.studentFormData.value.name;
    if (this.recordValidation(rollNo, name)) {
      this.service.getOneStudentResult(this.studentFormData.value).subscribe({
        next: (response) => {
          //console.log('student data from server ', response);
          if (response.length == 0) {
            this.isStudentFound = false;
          } else {
            this.route.navigate(['/display-result'], {
              state: { data: response },
            });
          }
          this.studentFormData.reset();
        },
        error: (error) => {
          console.log('error ', error);
        },
      });
    }
  }
  onClear() {
    this.studentFormData.reset();
  }
  recordValidation(rollNo: number, name: any): boolean {
    if (rollNo == null || name == '') {
      return false;
    } else {
      return true;
    }
  }
}
