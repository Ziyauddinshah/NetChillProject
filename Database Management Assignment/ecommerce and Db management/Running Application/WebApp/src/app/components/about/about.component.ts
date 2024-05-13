import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  selectedFile: File | undefined;
  uploadedImagePath: string = '';
  constructor(private httpClient: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    // Receiving notifications from the server
  }
  onSubmit() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    console.log(formData);
    // this.httpClient
    //   .post('http://localhost:3000/inventory/upload', formData)
    //   .subscribe({
    //     next: (response: any) => {
    //       this.uploadedImagePath = response.imagePath;
    //       console.log(this.uploadedImagePath);
    //       console.log('Image uploaded successfully');
    //     },
    //     error: (error: any) => {
    //       console.error('Error uploading image:', error);
    //     },
    //   });
  }
}
