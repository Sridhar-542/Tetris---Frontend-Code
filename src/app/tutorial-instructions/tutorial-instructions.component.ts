import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-instructions',
  templateUrl: './tutorial-instructions.component.html',
  styleUrls: ['./tutorial-instructions.component.css']
})
export class TutorialInstructionsComponent implements OnInit {
  lastPage: string;

  constructor(private router:Router) { 
    this.lastPage=localStorage.getItem("currentPage")
    if (this.lastPage!="info") {
      this.router.navigate([this.lastPage]);  
    }
  }

  ngOnInit(): void {
    localStorage.setItem("currentPage","tutInstructions");
    localStorage.setItem("isTutorial","true")

  }
  nextPage(){
    this.router.navigate(["tetris"]); 
  }
}
