import * as React from "react"
import { inject, observer } from "mobx-react"
import * as cx from "classnames"

import { PaymentFormState } from "./PaymentFormState"
import { Store } from "../Store"

@inject("store") @observer
export class PaymentForm extends React.Component<{ store?: Store }, {}> {
  public data = new PaymentFormState(this.props.store!)

  public render() {
    const {
      paymentTitle,
      paymentAmount,
      paymentAddress,
      paymentPayees,
      paymentNotes,
      onSubmit,
    } = this.data

    const {
      hasError,
    } = this.data.form

    return (
      <div>
        <div className="field">
          <label className="label">Payment Title</label>
          <div className="control">
            <input className={cx("input", { "is-danger": paymentTitle.hasError })} type="text" placeholder="Cab"
              onChange={(e) => paymentTitle.onChange(e.target.value)}
            />
          </div>
          {paymentTitle.hasError &&
            <p className="help is-danger">{paymentTitle.error}</p>
          }
        </div>

        <div className="field">
          <label className="label">Payment Amount</label>
          <div className="control">
            <input className={cx("input", { "is-danger": paymentAmount.hasError })} type="text" placeholder="Alice"
              onChange={(e) => paymentAmount.onChange(e.target.value)}
            />
          </div>
          {paymentAmount.hasError &&
            <p className="help is-danger">{paymentAmount.error}</p>
          }
        </div>

        <div className="field">
          <label className="label">Payment Address</label>
          <div className="control">
            <input className={cx("input", { "is-danger": paymentAddress.hasError })} type="text" placeholder="Alice"
              onChange={(e) => paymentAddress.onChange(e.target.value)}
            />
          </div>
          {paymentAddress.hasError &&
            <p className="help is-danger">{paymentAddress.error}</p>
          }
        </div>

        <div className="field">
          <label className="label">Payment Payees</label>
          <div className="control">
            <input className={cx("input", { "is-danger": paymentPayees.hasError })} type="text" placeholder="Alice"
              onChange={(e) => paymentPayees.onChange(e.target.value)}
            />
          </div>
          {paymentPayees.hasError &&
            <p className="help is-danger">{paymentPayees.error}</p>
          }
        </div>

        <div className="field">
          <label className="label">Payment Notes</label>
          <div className="control">
            <input className={cx("input", { "is-danger": paymentNotes.hasError })} type="text" placeholder="Alice"
              onChange={(e) => paymentNotes.onChange(e.target.value)}
            />
          </div>
          {paymentNotes.hasError &&
            <p className="help is-danger">{paymentNotes.error}</p>
          }
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={onSubmit}>
              Make Payment
            </button>
          </div>
          {/* <div className="control">
            <button className="button is-text">Cancel</button>
          </div> */}
        </div>
      </div>
    )
  }
}
