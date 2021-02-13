import {makeAutoObservable} from "mobx";

export class CustomCardSpentTimeStore {

  estimationTime: number = 0
  spentTime: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  setEstimationTime(value: number): void {
    this.estimationTime = value
  }

  setSpentTime(value: number): void {
    this.spentTime = value
  }

  get formattedEstimationTime(): string {
    return this.estimationTime.toFixed(1)
  }

  get formattedSpendTime(): string {
    return this.spentTime.toFixed(1)
  }

}