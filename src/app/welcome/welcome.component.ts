import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  display:boolean;
  lastPage: string;
  // page:number=1;
  checked:boolean;
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
    localStorage.setItem("currentPage","home")
  }
  enableButton(data){
   this.checked=data.checked;
  }
  nextPage(){
    this.router.navigate(["info"]); 
  }
}
