import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StudentResultService } from '../services/student-result.service';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.scss'],
})
export class EditResultComponent implements OnInit, OnChanges {
  formData!: FormGroup;
  dataEdited: boolean = false;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private service: StudentResultService
  ) {
    this.formData = this.formBuilder.group({
      rollNo: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      score: ['', [Validators.required]],
    });
    var editData: any = this.route.getCurrentNavigation()?.extras;
    var data = editData.state['data'];
    this.formData.patchValue({
      rollNo: data.RollNo,
      name: data.Name,
      dateOfBirth: data.DOB,
      score: data.Score,
    });
    console.log('form data ', this.formData.value);
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {}
  get rollNo() {
    return <FormControl>this.formData.get('rollNo');
  }
  onEditRecord() {
    var rollNo = this.rollNo.enable();
    var name = this.formData.value.name;
    var dateOfBirth = this.formData.value.dateOfBirth;
    var score = this.formData.value.score;
    console.log('form data when edit record is clicked', this.formData.value);
    if (this.recordValidation(rollNo, name, dateOfBirth, score)) {
      this.service.editStudentResult(this.formData.value).subscribe({
        next: (response) => {
          this.formData.reset();
          this.dataEdited = true;
          console.log('success', response);
        },
        error: (error) => console.log(error),
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
