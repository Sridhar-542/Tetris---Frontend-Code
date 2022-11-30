import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomSeedService {
  seedString="Saarbrücken"
  rand:any;

  constructor() { 
    this.setString();
  }
  
setString(){
  this.rand = require('random-seed').create(this.seedString);
}
  randomSeed(){
     return this.rand(100)/100;
  }
}
