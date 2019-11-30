// TODO //
// 1erre initialisation du local storage? normalement c'est ok
// Variabiliser
// Utilisation du modele?
// Gerer l'appui long sur + et - des chrono pour ajouter ou enlever plus ou moins vite

import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TimerPage } from '../timer/timer';
import { NativeStorage } from '@ionic-native/native-storage';

const INCREMENT_STEP = 5;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private repsNumber = 2;
  private initRepsNumber;
  private workingChain = 3;
  private remainingWorkingRep;
  private workingMinutes = "01";
  private workingSeconds = "00";
  private restingMinutes = "01";
  private restingSeconds = "00";
  private currentReps = 0;
  constructor(platform: Platform, public navCtrl: NavController, private nativeStorage: NativeStorage) {
    // Have to wait for the platform to be ready before using plugin nativeStorage
    platform.ready().then(() => {
      this.nativeStorage.getItem('appPref')
        .then(
          data => this.loadingAppPref(data),
          error => alert(error)
        );
    });
  }

  // Saving app preferences on localStorage
  savingAppPref() {
    this.nativeStorage.setItem('appPref', {
      prefRepsNumber: this.repsNumber, prefWorkingChain: this.workingChain,
      prefWorkingMinutes: this.workingMinutes, prefWorkingSeconds: this.workingSeconds, prefRestingMinutes: this.restingMinutes, prefRestingSeconds: this.restingSeconds
    })
      .then(
        () => console.log('Stored appPref!'),
        error => console.error('Error storing appPref', error)
      );
  }

  // Initialising variable with local appPreference
  loadingAppPref(data) {
    this.repsNumber = data.prefRepsNumber;
    this.workingChain = data.prefWorkingChain;
    this.workingMinutes = data.prefWorkingMinutes;
    this.workingSeconds = data.prefWorkingSeconds;
    this.restingMinutes = data.prefRestingMinutes;
    this.restingSeconds = data.prefRestingSeconds;
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
    this.savingAppPref();
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
    this.savingAppPref();
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
    this.savingAppPref();
  }

  savingMorkingIntervalPref() {
    this.nativeStorage.setItem('appPref', {
      prefWorkingMinutes: this.workingMinutes, prefWorkingSeconds: this.workingSeconds
    })
      .then(
        () => console.log('Stored appPref!'),
        error => console.error('Error storing appPref', error)
      );
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
    this.savingAppPref();
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
    this.savingAppPref();
  }

  savingRestingIntervalPref() {
    this.nativeStorage.setItem('appPref', {
      prefRestingMinutes: this.restingMinutes, prefRestingSeconds: this.restingSeconds
    })
      .then(
        () => console.log('Stored appPref!'),
        error => console.error('Error storing appPref', error)
      );
  }

  changeWorkingChain(value: number) {
    // impossible to have negativ value
    this.workingChain + value >= 1 ? this.workingChain += value : this.workingChain = 1;
    this.savingAppPref();
  }
}
