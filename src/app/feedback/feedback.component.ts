import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [MessageService]
})

export class FeedbackComponent implements OnInit {
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.extractSelectedData();
    localStorage.setItem(`${this.currentMode}Data`, JSON.stringify(this.data))
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.extractSelectedData();
    localStorage.setItem(`${this.currentMode}Data`, JSON.stringify(this.data))
  }
  selectedCategory: any
  lastPage: string;
  music: string;
  data: any = {};
  isBtnClicked:boolean;
  data1 = [
    { key: 'General_ques_I', value: 'I like the song that was played during the game' },
    { key: 'General_ques_II', value: 'I enjoyed listening to the background music' },
    { key: 'General_ques_III', value: 'The background music went well with the game' },
    { key: 'General_ques_IV', value: 'I am satisfied with my overall experience in playing the game' },
    { key: 'General_ques_V', value: 'I am satisfied with my overall performance in playing the game' },
    { key: 'PXI_Meaning_I', value: 'Playing the game was meaningful to me' },
    { key: 'PXI_Meaning_II', value: 'The game felt relevant to me' },
    { key: 'PXI_Meaning_III', value: 'Playing this game was valuable to me' },
    { key: 'PXI_Mastery_I', value: 'I felt I was good at playing this game' },
    { key: 'PXI_Mastery_II', value: 'I felt capable while playing the game' },
    { key: 'PXI_Mastery_III', value: 'I felt a sense of mastery playing this game' },
    { key: 'PXI_Autonomy_I', value: 'I felt free to play the game in my own way' },
    { key: 'PXI_Autonomy_II', value: 'I felt like I had choices regarding how I wanted to play this game' },
    { key: 'PXI_Autonomy_III', value: 'I felt a sense of freedom about how I wanted to play this game' },
    { key: 'PXI_Immersion_I', value: 'I was no longer aware of my surroundings while I was playing' },
    { key: 'PXI_Immersion_II', value: 'I was immersed in the game' },
    { key: 'PXI_Immersion_III', value: 'I was fully focused on the game' },
    { key: 'PXI_Challenge_I', value: 'The game was not too easy and not too hard to play' },
    { key: 'PXI_Challenge_II', value: 'The game was challenging but not too challenging' },
    { key: 'PXI_Challenge_III', value: 'The challenges in the game were at the right level of difficulty for me' },
    { key: 'IMI_Enjoyment_I', value: 'I enjoyed playing the game very much' },
    { key: 'IMI_Enjoyment_II', value: 'This game was fun to play' },
    { key: 'IMI_Enjoyment_III', value: 'I thought the game was very boring' },
    { key: 'IMI_Enjoyment_IV', value: 'The game did not hold my attention at all' },
    { key: 'IMI_Enjoyment_V', value: 'I would describe this game as very interesting' },
    { key: 'IMI_Enjoyment_VI', value: 'I thought this game was quite enjoyable' },
    { key: 'IMI_Enjoyment_VII', value: 'While I was playing this game, I was thinking about how much I enjoyed it' },
    { key: 'General_ques_VI', value: 'The background music had an impact on my game performance' },
    { key: 'Follow_up_for_General_ques_VI', value: 'In what way it had an impact on your game performance?' },
  ]
  data2 = [
    { key: 'General_ques_I', value: 'I am satisfied with my overall experience in playing the game' },
    { key: 'General_ques_II', value: 'I am satisfied with my overall performance in playing the game' },
    { key: 'PXI_Meaning_I', value: 'Playing the game was meaningful to me' },
    { key: 'PXI_Meaning_II', value: 'The game felt relevant to me' },
    { key: 'PXI_Meaning_III', value: 'Playing this game was valuable to me' },
    { key: 'PXI_Mastery_I', value: 'I felt I was good at playing this game' },
    { key: 'PXI_Mastery_II', value: 'I felt capable while playing the game' },
    { key: 'PXI_Mastery_III', value: 'I felt a sense of mastery playing this game' },
    { key: 'PXI_Autonomy_I', value: 'I felt free to play the game in my own way' },
    { key: 'PXI_Autonomy_II', value: 'I felt like I had choices regarding how I wanted to play this game' },
    { key: 'PXI_Autonomy_III', value: 'I felt a sense of freedom about how I wanted to play this game' },
    { key: 'PXI_Immersion_I', value: 'I was no longer aware of my surroundings while I was playing' },
    { key: 'PXI_Immersion_II', value: 'I was immersed in the game' },
    { key: 'PXI_Immersion_III', value: 'I was fully focused on the game' },
    { key: 'PXI_Challenge_I', value: 'The game was not too easy and not too hard to play' },
    { key: 'PXI_Challenge_II', value: 'The game was challenging but not too challenging' },
    { key: 'PXI_Challenge_III', value: 'The challenges in the game were at the right level of difficulty for me' },
    { key: 'IMI_Enjoyment_I', value: 'I enjoyed playing the game very much' },
    { key: 'IMI_Enjoyment_II', value: 'This game was fun to play' },
    { key: 'IMI_Enjoyment_III', value: 'I thought the game was very boring' },
    { key: 'IMI_Enjoyment_IV', value: 'The game did not hold my attention at all' },
    { key: 'IMI_Enjoyment_V', value: 'I would describe this game as very interesting' },
    { key: 'IMI_Enjoyment_VI', value: 'I thought this game was quite enjoyable' },
    { key: 'IMI_Enjoyment_VII', value: 'While I was playing this game, I was thinking about how much I enjoyed it' },
  ]
  justifyOptions: any[] = [
    { name: 'Strongly Disagree', key: '1' },
    { name: 'Disagree', key: '2' },
    { name: 'Somewhat Disagree', key: '3' },
    { name: 'Neither Agree nor Disagree', key: '4' },
    { name: 'Somewhat Agree ', key: '5' },
    { name: 'Agree', key: '6' },
    { name: 'Strongly Agree', key: '7' }];

  radioOptions: any[] = [{ name: 'Yes', key: 'A' }, { name: 'No', key: 'B' }]
  currentMode: string;
  question1: String;
  question2: String;
  question3: String;
  question4: String;
  withMusicQuestions: withMusic[] = [];
  withOutMusicQuestions: withMusic[] = [];
  constructor(private router: Router, private http: HttpClient, private messageService: MessageService) {
    this.lastPage = localStorage.getItem("currentPage");
    this.currentMode = localStorage.getItem("currentMode")
    if (this.lastPage != "tetris") {
      this.router.navigate([this.lastPage]);
    }
    //for dynamic ng model
    //Music
    for (let index = 0; index < 28; index++) {
      let selectQue = this.data1[Math.floor(Math.random() * (this.data1.length - 1))];
      let temp = new withMusic();
      temp.key = selectQue.key;
      temp.value = selectQue.value;
      this.withMusicQuestions.push(temp);
      this.data1.splice(this.data1.indexOf(selectQue), 1)
      if (selectQue.key === 'General_ques_VI') {
        let temp1 = new withMusic();
        temp1.key = this.data1[this.data1.length - 1].key;
        temp1.value = this.data1[this.data1.length - 1].value;
        this.data1.splice(this.data1.length - 1, 1)
        this.withMusicQuestions.push(temp1);
      }
    }
    //With out music
    for (let index = 0; index < 24; index++) {
      let selectQue = this.data2[Math.floor(Math.random() * this.data2.length)];
      let temp = new withMusic();
      temp.key = selectQue.key;
      temp.value = selectQue.value;
      this.data2.splice(this.data2.indexOf(selectQue), 1)
      this.withOutMusicQuestions.push(temp);
    }
  }

  ngOnInit(): void {
    this.isBtnClicked=false;
    localStorage.setItem("currentPage", "feedback");
    this.data = JSON.parse(localStorage.getItem(`${this.currentMode}Data`));
    //Patching on refresh/Back navigation
    if (this.data != null) {
      if (this.currentMode != 'withoutMusic') {
        this.withMusicQuestions.forEach((res, index) => {
          this.withMusicQuestions[index]['selectedOption'] = this.data[res?.key];
        })
      } else {
        this.withOutMusicQuestions.forEach((res, index) => {
          this.withOutMusicQuestions[index]['selectedOption'] = this.data[res?.key];
        })
      }
    }
  }
  //To format an object with user selected Data
  extractSelectedData() {
    this.data = { mode: this.currentMode };
    if (this.currentMode != 'withoutMusic') {
      this.withMusicQuestions.map((res) => {
        this.data[res.key] = res.selectedOption.trim();
      })
    } else {
      this.withOutMusicQuestions.map((res) => {
        this.data[res.key] = res.selectedOption.trim();
      })
    }
  }
  submitFeedback() {
    this.isBtnClicked=true;
    //need to add mode
    this.extractSelectedData();
    //To show answer all quetions alert
    //Cheking all questions answered or not
    let isAllSelected = false;
    let temp = Object.values(this.data)
    // )
    if (this.data?.mode == 'withoutMusic') {
      temp.every(function (element) {
        if (element == undefined || element == '' || element == null) {
          isAllSelected = false;
          return false
        }
        else {
          isAllSelected = true;
          return true
        }
      }
      )
    }
    else {
      let impactQueAns=this.data?.General_ques_VI
      this.withMusicQuestions.every(
        function (element, index) {
          // return true
          if (element.selectedOption == undefined || element.selectedOption.trim() == '' || element.selectedOption == null) {
            if (element.key == 'Follow_up_for_General_ques_VI' && impactQueAns != '6' && impactQueAns != '7') {
              isAllSelected = true;
              return true
            } else {
              isAllSelected = false;
              return false
            }
          } else {
            isAllSelected = true;
            return true
          }
        }
      )
    }
    if (!isAllSelected) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please answer all questions' });
    } else {
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
  }
  submitData() {
    const surveyData = {
      "info": JSON.parse(localStorage.getItem("userData")),
      "feedback": [JSON.parse(localStorage.getItem("music1Data")), JSON.parse(localStorage.getItem("music2Data")), JSON.parse(localStorage.getItem("withoutMusicData"))],
      "gameScore": JSON.parse(localStorage.getItem("score"))
    }
    this.http.post("http://localhost:3000/gameResponse", surveyData).subscribe(
      (res) => {
        this.router.navigate(['thankyou']);
      }
    )
  }
}
export class withMusic {
  key: string;
  value: string;
  selectedOption: string = '';
}