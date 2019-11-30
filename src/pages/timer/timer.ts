import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Insomnia } from '@ionic-native/insomnia';
import { NativeAudio } from '@ionic-native/native-audio';
//import { NativeAudio } from '@ionic-native/native-audio'

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
  private readyTimeColor1 = "#FFC107";
  private readyTimeColor2 = "#FFD041";
  private workingTimeColor1 = "#00E676";
  private workingTimeColor2 = "#3CEC96";
  private restTimeColor1 = "#2196F3";
  private restTimeColor2 = "#55AFF6";

  constructor(public navCtrl: NavController, public navParams: NavParams, private insomnia: Insomnia, private nativeAudio: NativeAudio, platform: Platform) {
    platform.ready().then(() => {
      this.preloadSound('three', 'assets/audio/three.mp3');
      this.preloadSound('two', 'assets/audio/two.mp3');
      this.preloadSound('one', 'assets/audio/one.mp3');
      this.preloadSound('zero', 'assets/audio/zero.mp3');
      // Prevent screen to sleep during workout
      this.insomnia.keepAwake();
      this.startTimer();

    });

    this.repsNumber = navParams.get('repsNumber');
    this.initRepsNumber = navParams.get('initRepsNumber');
    this.workingChain = navParams.get('workingChain');
    this.workingMinutes = navParams.get('workingMinutes');
    this.workingSeconds = navParams.get('workingSeconds');
    this.restingMinutes = navParams.get('restingMinutes');
    this.restingSeconds = navParams.get('restingSeconds');
    this.currentReps = navParams.get('currentReps');
    this.remainingWorkingRep = navParams.get('remainingWorkingRep');
    // GetReadyRep
    if (this.currentReps == 0) {
      document.documentElement.style.setProperty('--color1', this.readyTimeColor1);
      document.documentElement.style.setProperty('--color2', this.readyTimeColor2);
      this.currentSentence = "GET READY";
      this.remainingWorkingRep = this.workingChain;
      this.currentMinutes = "00";
      this.currentSeconds = "05";
    } else if (this.remainingWorkingRep == 0) { // we're into resting time
      // Changing color theme 
      document.documentElement.style.setProperty('--color1', this.restTimeColor1);
      document.documentElement.style.setProperty('--color2', this.restTimeColor2);
      this.currentSentence = "REST";
      this.remainingWorkingRep = this.workingChain;
      this.currentMinutes = this.restingMinutes;
      this.currentSeconds = this.restingSeconds;
    } else { // we're into working time
      // Changing color theme 
      document.documentElement.style.setProperty('--color1', this.workingTimeColor1);
      document.documentElement.style.setProperty('--color2', this.workingTimeColor2);
      this.currentSentence = "WORK";
      this.remainingWorkingRep--;
      this.currentMinutes = this.workingMinutes;
      this.currentSeconds = this.workingSeconds;
    }
  }

  /*ngOnInit() {
    // Prevent screen to sleep during workout
    this.insomnia.keepAwake();
    this.startTimer();
  }*/

  goHomePage() {
    // Allow screen to sleep again
    this.insomnia.allowSleepAgain();
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
        if (this.currentReps + 1 == (this.workingChain + 1) * this.initRepsNumber) { // Last timer, going home
          this.goHomePage();
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
    // Playing number voice for the coutdown at 3
    if (this.currentMinutes === "00") {
      switch (this.currentSeconds) {
        case "03": {
          this.playSound("three");
          break;
        }
        case "02": {
          this.playSound("two");
          break;
        }
        case "01": {
          this.playSound("one");
          break;
        }
        case "00": {
          this.playSound("zero");
          break;
        }
        default: break;
      }
    }
  }

  preloadSound(id, soundPath) {
    this.nativeAudio.preloadComplex(id, soundPath, 1, 1, 0).then((success) => {
      console.log("success loading sound : " + id);
    }, (error) => {
      console.log(error);
    });
  }

  playSound(id) {
    this.nativeAudio.play(id).then((success) => {
      console.log("success playing");
    }, (error) => {
      console.log(error);
    });
  }
}
