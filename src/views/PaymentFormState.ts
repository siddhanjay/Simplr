import * as React from "react"
import { FormState, FieldState } from "formstate"

import { Store } from "../Store"

function ishex160(s: string): boolean {
  // FIXME: verify is hexadecimal...
  return s.slice(0, 2) === "0x" && s.length === 42
}
export class PaymentFormState {
  public paymentTitle = new FieldState("").validators((val) => {
   // return (isNaN(val) || val <= 0) && "amount must be greater than 0"
   return (val === "" && "Payment Title must not be empty" )
  })

  public paymentAmount = new FieldState("").validators((val) => {
   // return (val === "" && "address must not be empty") || (!ishex160(val) && "address invalid")
   return (val === "" && "Payment amount must not be empty" )
  })
  public paymentAddress = new FieldState("").validators((val) => {
   // return (isNaN(val) || val <= 0) && "amount must be greater than 0"
   return (val === "" && "address must not be empty") || (!ishex160(val) && "address invalid")
  })

  public paymentPayees = new FieldState("").validators((val) => {
   // return (val === "" && "address must not be empty") || (!ishex160(val) && "address invalid")
   return (val === "" && "Payment amount must not be empty" )
  })
  public paymentNotes = new FieldState("").validators((val) => {
   // return (isNaN(val) || val <= 0) && "amount must be greater than 0"
   return (val === "" && "Payment Title must not be empty" )
  })

  public form = new FormState({
      paymentTitle: this.paymentTitle,
      paymentAmount: this.paymentAmount,
      paymentAddress: this.paymentAddress,
      paymentPayees: this.paymentPayees,
      paymentNotes: this.paymentNotes,
  })

  constructor(private store: Store) {
  }

  public onSubmit = async () => {
    const res = await this.form.validate()

    if (res.hasError) {
      console.log("mint form errors", this.form.error)
      return
    }

    // kinda ugly...

    const paymentTitle = this.paymentTitle.$
    const paymentAmount = this.paymentAmount.$
    const paymentAddress = this.paymentAddress.$
    const paymentPayees = this.paymentPayees.$
    const paymentNotes = this.paymentNotes.$

    console.log("makePayment", [paymentTitle, paymentAmount, paymentAddress, paymentPayees, paymentNotes])
    this.store.makePayment(paymentTitle, paymentAmount, paymentAddress, paymentPayees, paymentNotes)
  }
}
