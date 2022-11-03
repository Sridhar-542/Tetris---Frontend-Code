import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  lastPage: string;

  constructor(private router:Router) { 
    let isTutorial=this.lastPage=localStorage.getItem("isTutorial")
    this.lastPage=localStorage.getItem("currentPage")
    if (this.lastPage=="tetris"&&isTutorial=="true") {
      localStorage.setItem("afterFeedbackSubmit","false")
      // localStorage.setItem("isTutorial","false")
      localStorage.setItem("isModeSelected", "false");
    }
    else if(this.lastPage!="info"&&(localStorage.getItem("afterFeedbackSubmit")=="false"||localStorage.getItem("afterFeedbackSubmit")==null)) {
        this.router.navigate([this.lastPage]);  
    }
    else{
      localStorage.setItem("afterFeedbackSubmit","false")
    }
  }
  ngOnInit(): void {
    localStorage.setItem("currentPage","instructions")
  }
  nextPage(){
    localStorage.setItem("isTutorial","false")
    this.router.navigate(["tetris"]); 
  }
}
