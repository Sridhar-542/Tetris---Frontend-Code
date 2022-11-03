import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demographic-info',
  templateUrl: './demographic-info.component.html',
  styleUrls: ['./demographic-info.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class DemographicInfoComponent implements OnInit {
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.data={age:this.age,gender:this.gender,played:this.played,genderDes:this.genderDes,nationality:this.nationality,expLevel:this.expLevel,input:this.input}
    localStorage.setItem("userData",JSON.stringify(this.data))
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.data={age:this.age,gender:this.gender,played:this.played,genderDes:this.genderDes,nationality:this.nationality,expLevel:this.expLevel,input:this.input}
    localStorage.setItem("userData",JSON.stringify(this.data))
  }
  lastPage: string;
  age:string;
  gender:string;
  played:string;
  genderDes:string='';
  nationality:string='';
  expLevel:string='';
  input:string='';
  data:any={};
  justifyOptions = [
    { key: '', value: '' },
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
    { key: '', value: '' },
  ];
  ageOptions: any[] = [{name:'18 - 24', key: 'A'}, {name: '25 - 31', key: 'B'}, {name: '32 - 38', key: 'C'}, {name: '39 - 45', key: 'D'}, {name: '46 - 52', key: 'E'},{name: '53 - 59', key: 'F'},{name: '60 and above', key: 'G'}];
  genderOptions: any[] = [{name:'Male', key: 'A'}, {name: 'Female', key: 'B'}, {name: 'Binary', key: 'C'}, {name: 'Prefer not to disclose', key: 'D'},{name: 'Self-describe', key: 'E'}];
  isPlayedOptions: any[]=[{name:'Yes', key: 'A'}, {name: 'No', key: 'B'}]
  inputOptions: any[] = [{name:'Keyboard', key: 'A'}, {name: 'Gamepad', key: 'B'}, {name: 'Touchscreen', key: 'C'}, {name: 'Other', key: 'D'}];
  constructor(private router:Router) { 
    this.lastPage=localStorage.getItem("currentPage")
    if (this.lastPage!="gameInstr") {
      this.router.navigate([this.lastPage]);  
    }
  }
  ngOnInit(): void {
    localStorage.setItem("modes",JSON.stringify(["music1","music2","withoutMusic","music1","music2","withoutMusic"]))
    localStorage.setItem("currentPage","info")
    this.data=JSON.parse(localStorage.getItem("userData"));
    if (this.data==null) {
      this.age='';
    this.gender='';
    this.played='';
    this.genderDes='';
    this.nationality='';
    this.expLevel='';
    this.input='';
    }
    else{
    this.age=this.data.age==null?'':this.data.age;
    this.gender=this.data.gender==null?'':this.data.gender;
    this.input=this.data.input==null?'':this.data.input;
    this.expLevel=this.data.expLevel==null?'':this.data.expLevel;
    this.nationality=this.data.nationality==null?'':this.data.nationality;
    this.genderDes=this.data.genderDes==null?'':this.data.genderDes;
    this.played=this.data.played==null?'':this.data.played;
    }
  }
  nextPage(){
    this.data={age:this.age,gender:this.gender,played:this.played,genderDes:this.genderDes,nationality:this.nationality,expLevel:this.expLevel,input:this.input}
    localStorage.setItem("userData",JSON.stringify(this.data))
    this.router.navigate(["tutInstructions"]);
  }
}
