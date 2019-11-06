import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage{

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    alert("INIT du timer");
}

  goHomePage(){
    this.navCtrl.setRoot(HomePage);
  }
}
