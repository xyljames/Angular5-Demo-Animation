import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class DataService {
  //need to change from private goals=>public
  public goals = new BehaviorSubject<any>([
    "the initial goal",
    "Another silly life goal"
  ]);

  goal = this.goals.asObservable();

  constructor() {}

  changeGoal(goal){
    this.goals.next(goal);
  }
}
