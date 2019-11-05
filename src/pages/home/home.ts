import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private count=5;
  private minutes = 0;
  private seconds = 0;

  constructor(public navCtrl: NavController) {
    
  }

  changeWorkInterval(value: number) {
    //let tmpSeconds = this.seconds+value;
    //this.seconds=tmpSeconds.toFixed(2);
    this.seconds+=value;
  }  
}
