import * as React from "react"
import { FormState, FieldState } from "formstate"

import { Store } from "../Store"

function ishex160(s: string): boolean {
  // FIXME: verify is hexadecimal...
  return s.slice(0, 2) === "0x" && s.length === 42
}

export class UserFormState {
  public userName = new FieldState("").validators((val) => {
   // return (isNaN(val) || val <= 0) && "amount must be greater than 0"
   return (val === "" && "User Name must not be empty" )
  })

  public userAddress = new FieldState("").validators((val) => {
   return (val === "" && "address must not be empty") || (!ishex160(val) && "address invalid")
  })

  public form = new FormState({
    userName: this.userName,
    userAddress: this.userAddress,
  })

  constructor(private store: Store) {
  }

  public onSubmitNewUser = async () => {
    const res = await this.form.validate()

    if (res.hasError) {
      console.log("User form errors", this.form.error)
      return
    }

    // kinda ugly...
    const userName = this.userName.$
    const userAddress = this.userAddress.$
    console.log(userName + userAddress)
    console.log("addUser", [userName, userAddress])
    this.store.addUser(userName, userAddress)
  }
}
