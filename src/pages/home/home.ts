// TODO //
// Faire page du timer (Chrono + Pause)
// Gerer changement de page lors de l'appui sur play (NavPush)
// Gerer les changements de pages Working -> rest
// Gerer l'appui long sur + et - des chrono pour ajouter ou enlever plus ou moins vite

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

const INCREMENT_STEP = 5;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private repsNumber = 3;
  private workingChain = 3;
  private workingMinutes = "00";
  private workingSeconds = "00";
  private restingMinutes = "00";
  private restingSeconds = "00";
  constructor(public navCtrl: NavController) {

  }

  changeRepsNumber(value: number) {
    // impossible to have negativ value
    this.repsNumber + value >= 0 ? this.repsNumber += value : this.repsNumber = 0;
  }

  addWorkInterval() {
    let tmpSeconds = parseInt(this.workingSeconds) + INCREMENT_STEP;
    // adding one minute
    if (tmpSeconds > 59) {
      tmpSeconds = 0;
      let tmpMinutes = parseInt(this.workingMinutes) + 1;
      // Format minutes for always having 2 digit
      this.workingMinutes = ("0" + tmpMinutes).slice(-2);
      tmpSeconds = 0;
    }
    // Format seconds for always having 2 digit
    this.workingSeconds = ("0" + tmpSeconds).slice(-2);
  }

  removeWorkInterval() {
    let tmpSeconds = parseInt(this.workingSeconds) - INCREMENT_STEP;
    if (tmpSeconds < 0) {
      // Impossible to go below 00:00
      if (this.workingMinutes === "00") {
        return;
      } else { // removing one minute
        tmpSeconds = 60 - INCREMENT_STEP;
        let tmpMinutes = parseInt(this.workingMinutes) - 1;
        // Format minutes for always having 2 digit
        this.workingMinutes = ("0" + tmpMinutes).slice(-2);
      }
    }
    // Format seconds for always having 2 digit
    this.workingSeconds = ("0" + tmpSeconds).slice(-2);
  }

  addRestInterval() {
    let tmpSeconds = parseInt(this.restingSeconds) + INCREMENT_STEP;
    // adding one minute
    if (tmpSeconds > 59) {
      tmpSeconds = 0;
      let tmpMinutes = parseInt(this.restingMinutes) + 1;
      // Format minutes for always having 2 digit
      this.restingMinutes = ("0" + tmpMinutes).slice(-2);
      tmpSeconds = 0;
    }
    // Format seconds for always having 2 digit
    this.restingSeconds = ("0" + tmpSeconds).slice(-2);
  }

  removeRestInterval() {
    let tmpSeconds = parseInt(this.restingSeconds) - INCREMENT_STEP;
    if (tmpSeconds < 0) {
      // Impossible to go below 00:00
      if (this.restingMinutes === "00") {
        return;
      } else { // removing one minute
        tmpSeconds = 60 - INCREMENT_STEP;
        let tmpMinutes = parseInt(this.restingMinutes) - 1;
        // Format minutes for always having 2 digit
        this.restingMinutes = ("0" + tmpMinutes).slice(-2);
      }
    }
    // Format seconds for always having 2 digit
    this.restingSeconds = ("0" + tmpSeconds).slice(-2);
  }

  changeWorkingChain(value: number) {
    // impossible to have negativ value
    this.workingChain + value >= 0 ? this.workingChain += value : this.workingChain = 0;
  }

  goToNextPage(){
    alert("PLAY!!");
  }
}
