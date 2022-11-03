import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.data = { question1: this.question1, question2: this.question2, question3: this.question3, question4: this.question4, mode: this.currentMode }
    localStorage.setItem(`${this.currentMode}Data`, JSON.stringify(this.data))
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.data = { question1: this.question1, question2: this.question2, question3: this.question3, question4: this.question4, mode: this.currentMode }
    localStorage.setItem(`${this.currentMode}Data`, JSON.stringify(this.data))
  }
  lastPage: string;
  music: string;
  data: any = {}
  justifyOptions = [
    { key: '', value: '' },
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '', value: '' },
  ];
  radioOptions: any[] = [{ name: 'Yes', key: 'A' }, { name: 'No', key: 'B' }]
  currentMode: string;
  question1: String;
  question2: String;
  question3: String;
  question4: String;

  constructor(private router: Router, private http: HttpClient) {
    this.lastPage = localStorage.getItem("currentPage");
    this.currentMode = localStorage.getItem("currentMode")
    if (this.lastPage != "tetris") {
      this.router.navigate([this.lastPage]);
    }
  }

  ngOnInit(): void {
    localStorage.setItem("currentPage", "feedback");
    console.log(this.currentMode);
    this.data = JSON.parse(localStorage.getItem(`${this.currentMode}Data`));
    if (this.data == null) {
      this.question1 = '';
      this.question2 = '';
      this.question3 = '';
      this.question4 = '';
    }
    else {
      this.question1 = this.data.question1 == null ? '' : this.data.question1;
      this.question2 = this.data.question2 == null ? '' : this.data.question2;
      this.question3 = this.data.question3 == null ? '' : this.data.question3;
      this.question4 = this.data.question4 == null ? '' : this.data.question4;
    }
  }
  submitFeedback() {
    this.data = { question1: this.question1, question2: this.question2, question3: this.question3, question4: this.question4, mode: this.currentMode }
    localStorage.setItem(`${this.currentMode}Data`, JSON.stringify(this.data))
    if (JSON.parse(localStorage.getItem("modes")).length == 0) {
      this.submitData()
    }
    else {
      localStorage.setItem("isModeSelected", "false");
      localStorage.setItem("afterFeedbackSubmit", "true");
      this.router.navigate(['instructions']);
    }
  }
  submitData() {
    const surveyData = {
      "info": JSON.parse(localStorage.getItem("userData")),
      "feedback": [JSON.parse(localStorage.getItem("music1Data")),JSON.parse(localStorage.getItem("music2Data")),JSON.parse(localStorage.getItem("withoutMusicData"))],
      "gameScore": JSON.parse(localStorage.getItem("score"))
    }
    this.http.post("http://localhost:3000/gameResponse", surveyData).subscribe(
      (res) => {
        this.router.navigate(['thankyou']);
      }
    )
  }
}
