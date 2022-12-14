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
    this.data={age:this.age,gender:this.gender,played:this.played,genderDes:this.genderDes,nationality:this.nationality,expLevel:this.expLevel,input:this.input,inputDes:this.inputDes}
    localStorage.setItem("userData",JSON.stringify(this.data))
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.data={age:this.age,gender:this.gender,played:this.played,genderDes:this.genderDes,nationality:this.nationality,expLevel:this.expLevel,input:this.input,inputDes:this.inputDes}
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
  inputDes:string='';
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
  ageOptions: any[] = [{name:'18 - 24', key: '1A'}, {name: '25 - 31', key: '1B'}, {name: '32 - 38', key: '1C'}, {name: '39 - 45', key: '1D'}, {name: '46 - 52', key: '1E'},{name: '53 - 59', key: '1F'},{name: '60 and above', key: 'G'}];
  genderOptions: any[] = [{name:'Male', key: '2A'}, {name: 'Female', key: '2B'}, {name: 'Non-Binary', key: '2C'}, {name: 'Prefer not to disclose', key: '2D'},{name: 'Self-describe', key: '2E'}];
  isPlayedOptions: any[]=[{name:'Yes', key: '4A'}, {name: 'No', key: '4B'}]
  inputOptions: any[] = [{name:'Keyboard', key: '5A'}, {name: 'Gamepad', key: '5B'}, {name: 'Touchscreen', key: '5C'}, {name: 'Other', key: '5D'}];
  constructor(private router:Router) { 
    this.lastPage=localStorage.getItem("currentPage")
    if (this.lastPage!="home") {
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
    this.genderDes='';
    this.nationality='';
    this.played='';
    this.expLevel='';
    this.input='';
    this.inputDes='';
    }
    else{
    this.age=this.data.age==null?'':this.data.age;
    this.gender=this.data.gender==null?'':this.data.gender;
    this.genderDes=this.data.genderDes==null?'':this.data.genderDes;
    this.nationality=this.data.nationality==null?'':this.data.nationality;
    this.played=this.data.played==null?'':this.data.played;
    this.expLevel=this.data.expLevel==null?'':this.data.expLevel;
    this.input=this.data.input==null?'':this.data.input;
    this.inputDes=this.data.inputDes==null?'':this.data.inputDes;
    }
  }
  nextPage(){
    this.data={age:this.age,gender:this.gender,genderDes:this.genderDes,nationality:this.nationality,played:this.played,expLevel:this.expLevel,input:this.input,inputDes:this.inputDes}
    localStorage.setItem("userData",JSON.stringify(this.data))
    this.router.navigate(["tutInstructions"]);
  }
}
