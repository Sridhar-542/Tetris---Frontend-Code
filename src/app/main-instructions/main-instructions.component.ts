import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-instructions',
  templateUrl: './main-instructions.component.html',
  styleUrls: ['./main-instructions.component.css']
})
export class MainInstructionsComponent implements OnInit {
  lastPage: string;

  constructor(private router:Router) { 
    this.lastPage=localStorage.getItem("currentPage")
    if (this.lastPage!="home") {
      if (this.lastPage!=null) {
        this.router.navigate([this.lastPage]); 
        // &&JSON.parse(localStorage.getItem("modes"))?.length!=0
      } 
    }
  }

  ngOnInit(): void {
    localStorage.setItem("currentPage","gameInstr")

  }
  nextPage(){
    this.router.navigate(["info"]); 
  }
}
