import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  private currentSentence;
  private initRepsNumber;
  private remainingWorkingRep;
  private currentReps;
  private repsNumber;
  private workingChain;
  private currentMinutes;
  private currentSeconds;
  private workingMinutes;
  private workingSeconds;
  private restingMinutes;
  private restingSeconds;
  interval;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.repsNumber = navParams.get('repsNumber');
    this.initRepsNumber = navParams.get('initRepsNumber');
    this.workingChain = navParams.get('workingChain');
    this.workingMinutes = navParams.get('workingMinutes');
    this.workingSeconds = navParams.get('workingSeconds');
    this.restingMinutes = navParams.get('restingMinutes');
    this.restingSeconds = navParams.get('restingSeconds');
    this.currentReps = navParams.get('currentReps');
    this.remainingWorkingRep = navParams.get('remainingWorkingRep');
    //alert(this.currentReps + '/' + this.workingChain + '=' + this.currentReps / this.workingChain);
    //alert('RemainingWork = '+ this.remainingWorkingRep);
    // GetReadyRep
    if (this.currentReps == 0) {
      this.currentSentence = "GET READY";
      this.remainingWorkingRep = this.workingChain;
      this.currentMinutes = "00";
      this.currentSeconds = "05";
    } else if (this.remainingWorkingRep == 0) { // we're into resting time
      this.currentSentence = "REST";
      this.remainingWorkingRep = this.workingChain;
      this.currentMinutes = this.restingMinutes;
      this.currentSeconds = this.restingSeconds;
    } else { // we're into working time
      this.currentSentence = "WORK";
      this.remainingWorkingRep--;
      this.currentMinutes = this.workingMinutes;
      this.currentSeconds = this.workingSeconds;
    }
  }

  ngOnInit() {
    this.startTimer();
  }

  goHomePage() {
    clearInterval(this.interval);
    this.navCtrl.setRoot(HomePage);
  }

  goToNextTimerPage() {
    clearInterval(this.interval);
    this.currentReps++;
    this.navCtrl.push(TimerPage, {
      repsNumber: this.repsNumber,
      initRepsNumber: this.initRepsNumber,
      workingChain: this.workingChain,
      workingMinutes: this.workingMinutes,
      workingSeconds: this.workingSeconds,
      restingMinutes: this.restingMinutes,
      restingSeconds: this.restingSeconds,
      currentReps: this.currentReps,
      remainingWorkingRep: this.remainingWorkingRep
    });
  }

  /* Starting timer, refreshed every seconds */
  startTimer() {
    this.interval = setInterval(() => {
      // End of timer
      if (this.currentMinutes === "00" && this.currentSeconds === "00") {
        //alert(this.currentReps + 1 + '==' + (this.workingChain + 1) + '*' + this.initRepsNumber);
        if (this.currentReps + 1 == (this.workingChain + 1) * this.initRepsNumber) { // Last timer, going home
          clearInterval(this.interval);
          this.navCtrl.setRoot(HomePage);
        } else { // Going to next timer
          if (this.currentSentence == "REST") {
            this.repsNumber--;
          }
          this.goToNextTimerPage();
        }
      } else {
        this.removeWorkInterval();
      }
    }, 1000)
  }

  removeWorkInterval() {
    let tmpSeconds = parseInt(this.currentSeconds) - 1;
    if (tmpSeconds < 0) {
      // Impossible to go below 00:00
      if (this.currentMinutes === "00") {
        return;
      } else { // removing one minute
        tmpSeconds = 59;
        let tmpMinutes = parseInt(this.currentMinutes) - 1;
        // Format minutes for always having 2 digit
        this.currentMinutes = ("0" + tmpMinutes).slice(-2);
      }
    }
    // Format seconds for always having 2 digit
    this.currentSeconds = ("0" + tmpSeconds).slice(-2);
  }
}
