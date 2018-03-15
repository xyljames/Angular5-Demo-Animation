import { Component, OnInit } from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from "@angular/animations";
import { DataService } from "../data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger("goals", [
      transition("*=>*", [
        query(":enter", style({ opacity: 0 }), { optional: true }),
        query(
          ":enter",
          stagger("300ms", [
            animate(
              ".6s ease-in",
              keyframes([
                style({ opacity: 0, transform: "translateY(-75%)", offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: "translateY(35px)",
                  offset: 0.3
                }),
                style({ opacity: 1, transform: "translateY(0)", offset: 1 })
              ])
            )
          ]),
          { optional: true }
        ),

        query(
          ":leave",
          stagger("300ms", [
            animate(
              ".6s ease-in",
              keyframes([
                style({ opacity: 1, transform: "translateY(0)", offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: "translateY(35px)",
                  offset: 0.3
                }),
                style({ opacity: 0, transform: "translateY(-75%)", offset: 1 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount: number ;
  btnText: string = "Add an item";
  goalText: string = "";
  goals = ["Buy a Yacht!", "Goooo Japan"];

  constructor(private data: DataService) {}

  removeItem(i) {
    this.goals.splice(i, 1);
    this.data.changeGoal(this.goals);
  }

  addItem() {
    if (this.goalText.length != 0) {
      this.goals.push(this.goalText);
      this.goalText = " ";
      this.itemCount = this.goals.length;
      this.data.changeGoal(this.goals);
    } else {
      alert("you enter a empty value");
    }
  }

  ngOnInit() {
    this.itemCount = this.goals.length;
    this.data.goal.subscribe(res => this.goals = res);
    this.data.changeGoal(this.goals);
  }
}
