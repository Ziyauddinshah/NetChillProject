import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentResultService } from '../services/student-result.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  totalRecord: number = 0;
  studentResult: any;
  isRecordDeleted: boolean = false;
  constructor(
    public httpClient: HttpClient,
    private route: Router,
    private service: StudentResultService
  ) {}
  ngOnInit(): void {
    this.getResult();
  }
  getResult() {
    this.service.getAllStudentResult().subscribe((response: any) => {
      this.studentResult = response;
      this.totalRecord = this.studentResult.length;
      console.log('student result ', this.studentResult);
    });
  }
  editResult(data: any) {
    this.route.navigate(['/edit-result'], { state: { data: data } });
  }
  deleteResult(data: any) {
    if (confirm('Do you want to delete this?')) {
      this.service.deleteStudentResult(data.RollNo).subscribe(() => {
        this.getResult();
        this.isRecordDeleted = true;
        //alert('Record Deleted Successfully');
      });
    }
  }
  addResult() {
    this.route.navigate(['/add-result']);
  }
}
