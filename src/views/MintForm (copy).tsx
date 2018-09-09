import * as React from "react"
import { inject, observer } from "mobx-react"
import * as cx from "classnames"

import { MintFormState } from "./MintFormState"
import { Store } from "../Store"

@inject("store") @observer
export class MintForm extends React.Component<{ store?: Store }, {}> {
  public data = new MintFormState(this.props.store!)

  public render() {
    const {
      gName,
      userName,
      onSubmit,
    } = this.data

    const {
      hasError,
    } = this.data.form

    return (
      <div>
        <div className="field">
          <label className="label">Group Name</label>
          <div className="control">
            <input className={cx("input", { "is-danger": gName.hasError })} type="text" placeholder="Trip to Bali"
              onChange={(e) => gName.onChange(e.target.value)}
            />
          </div>
          {gName.hasError &&
            <p className="help is-danger">{gName.error}</p>
          }
        </div>

        <div className="field">
          <label className="label">User Name</label>
          <div className="control">
            <input className={cx("input", { "is-danger": userName.hasError })} type="text" placeholder="Alice"
              onChange={(e) => userName.onChange(e.target.value)}
            />
          </div>
          {userName.hasError &&
            <p className="help is-danger">{userName.error}</p>
          }
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={onSubmit}>
              Create new group
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
