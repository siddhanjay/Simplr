import * as React from "react"
import { FormState, FieldState } from "formstate"

import { Store } from "../Store"


export class FundFormState {
  public fundAmount = new FieldState("").validators((val) => {
   // return (isNaN(val) || val <= 0) && "amount must be greater than 0"
   return (val === "" && "amount must not be empty" )
  })



  public form = new FormState({
    fundAmount: this.fundAmount,
  })

  constructor(private store: Store) {
  }

  public onSubmitFunds = async () => {
    const res = await this.form.validate()

    if (res.hasError) {
      console.log("Fund form errors", this.form.error)
      return
    }

    // kinda ugly...
    const fundAmount = this.fundAmount.$
    this.store.fundContract(fundAmount)
  }
}
