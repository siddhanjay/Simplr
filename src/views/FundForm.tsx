import * as React from "react"
import { inject, observer } from "mobx-react"
import * as cx from "classnames"

import { FundFormState } from "./FundFormState"
import { Store } from "../Store"

@inject("store") @observer
export class FundForm extends React.Component<{ store?: Store }, {}> {
  public data = new FundFormState(this.props.store!)

  public render() {
    const {
      fundAmount,
      onSubmitFunds,
    } = this.data

    const {
      hasError,
    } = this.data.form

    return (
      <div>
        <div className="field">
          <label className="label">Funding amount</label>
          <div className="control">
              <input className={cx("input", { "is-danger": fundAmount.hasError })} type="text" placeholder="20"
              onChange={(e) => fundAmount.onChange(e.target.value)}
            /> Qtum tokens
          </div>
          {fundAmount.hasError &&
            <p className="help is-danger">{fundAmount.error}</p>
          }
        </div>


        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={onSubmitFunds}>
              Submit
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
