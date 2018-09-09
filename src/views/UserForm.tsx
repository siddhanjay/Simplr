import * as React from "react"
import { inject, observer } from "mobx-react"
import * as cx from "classnames"

import { UserFormState } from "./UserFormState"
import { Store } from "../Store"

@inject("store") @observer
export class UserForm extends React.Component<{ store?: Store }, {}> {
  public data = new UserFormState(this.props.store!)

  public render() {
    const {
      userAddress,
      userName,
      onSubmitNewUser,
    } = this.data

    const {
      hasError,
    } = this.data.form

    return (
      <div>
        <div className="field">
          <label className="label">User Address</label>
          <div className="control">
              <input className={cx("input", { "is-danger": userAddress.hasError })} type="text" placeholder="0xabc...abc"
              onChange={(e) => userAddress.onChange(e.target.value)}
            />
          </div>
          {userAddress.hasError &&
            <p className="help is-danger">{userAddress.error}</p>
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
            <button className="button is-link" onClick={onSubmitNewUser}>
              Add user
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
