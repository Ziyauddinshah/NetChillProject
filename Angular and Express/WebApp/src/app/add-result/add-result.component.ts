import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentResultService } from '../services/student-result.service';
@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent {
  formData: FormGroup;
  dataAdded: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: StudentResultService
  ) {
    this.formData = this.formBuilder.group({
      rollNo: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      score: ['', [Validators.required]],
    });
  }
  onAddRecord() {
    console.log('Data when add record is clicked ', this.formData.value);
    var rollNo = this.formData.value.rollNo;
    var name = this.formData.value.name;
    var dateOfBirth = this.formData.value.dateOfBirth;
    var score = this.formData.value.score;

    if (this.recordValidation(rollNo, name, dateOfBirth, score)) {
      this.service.addStudentResult(this.formData.value).subscribe({
        next: (response) => {
          this.formData.reset();
          this.dataAdded = true;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
          alert('Student already exists');
        },
      });
    } else {
      alert('Something wrong');
    }
  }
  onClear() {
    this.formData.reset();
  }
  recordValidation(
    rollNo: any,
    name: any,
    dateOfBirth: any,
    score: any
  ): boolean {
    if (rollNo == '' || name == '' || dateOfBirth == '' || score == '') {
      return false;
    } else {
      return true;
    }
  }
}
