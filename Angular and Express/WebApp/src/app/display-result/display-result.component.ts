import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss'],
})
export class DisplayResultComponent implements OnInit {
  Data: any = [];
  constructor(private route: Router) {
    var studentData: any = this.route.getCurrentNavigation()?.extras;
    var displayData = studentData.state['data'];
    this.Data = displayData;
    console.log('display student search data ', displayData);
  }
  ngOnInit(): void {}
}
