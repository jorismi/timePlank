// TODO //
// Changer de couleur entre les phases
// Faire un screen de fin (récap?)
// Ajouter du son à la fin des rep
// Variabiliser
// Utilisation du modele?
// Gerer l'appui long sur + et - des chrono pour ajouter ou enlever plus ou moins vite

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimerPage } from '../timer/timer';

const INCREMENT_STEP = 5;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private repsNumber = 2;
  private initRepsNumber;
  private workingChain = 3;
  remainingWorkingRep;
  private workingMinutes = "01";
  private workingSeconds = "00";
  private restingMinutes = "01";
  private restingSeconds = "00";
  private currentReps = 0;
  constructor(public navCtrl: NavController) {
  }

  goToTimerPage() {
    this.navCtrl.push(TimerPage, {
      repsNumber: this.repsNumber,
      initRepsNumber: this.repsNumber,
      workingChain: this.workingChain,
      workingMinutes: this.workingMinutes,
      workingSeconds: this.workingSeconds,
      restingMinutes: this.restingMinutes,
      restingSeconds: this.restingSeconds,
      currentReps: this.currentReps,
      remainingWorkingRep: this.remainingWorkingRep
    });
  }

  changeRepsNumber(value: number) {
    // impossible to have less than 1
    this.repsNumber + value >= 1 ? this.repsNumber += value : this.repsNumber = 1;
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
    this.workingChain + value >= 1 ? this.workingChain += value : this.workingChain = 1;
  }
}
