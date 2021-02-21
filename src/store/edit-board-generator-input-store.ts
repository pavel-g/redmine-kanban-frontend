import {makeAutoObservable} from "mobx";
import {EditBoardGeneratorTypeEnum} from "../enums/edit-board-generator-type-enum";
import {IsNumberInString} from "../function/is-number-in-string";

export class EditBoardGeneratorInputStore {

  value: string = ""

  constructor() {
    makeAutoObservable(this)
  }

  setValue(value: string): void {
    this.value = value
  }

  get type(): EditBoardGeneratorTypeEnum {
    if (typeof this.value !== 'string' || this.value === '') {
      return EditBoardGeneratorTypeEnum.NONE
    } else if (this.rootOrNull !== null) {
      return EditBoardGeneratorTypeEnum.ROOT
    } else if (this.listOrNull !== null) {
      return EditBoardGeneratorTypeEnum.LIST
    }
    return EditBoardGeneratorTypeEnum.ERROR
  }

  get listOrNull(): number[]|null {
    const items = this.value
      .split(/[,; ]/)
      .filter(item => Boolean(item))
    const res: number[] = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (IsNumberInString(item)) {
        res.push(+item)
      } else {
        return null
      }
    }
    return res
  }

  get rootOrNull(): number|null {
    return (IsNumberInString(this.value)) ? +this.value : null
  }

  get buttonLabel(): string {
    if (this.type === EditBoardGeneratorTypeEnum.ROOT) {
      return 'Сгенерировать от корня'
    } else if (this.type === EditBoardGeneratorTypeEnum.LIST) {
      return 'Сгенерировать для списка'
    } else {
      return 'Сгенерировать ...'
    }
  }

  get buttonDisabled(): boolean {
    return (
      this.type === EditBoardGeneratorTypeEnum.NONE ||
      this.type === EditBoardGeneratorTypeEnum.ERROR
    )
  }

}

export const editBoardGeneratorInputStore = new EditBoardGeneratorInputStore()