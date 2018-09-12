import * as React from "react"
import { inject, observer } from "mobx-react"
import * as cx from "classnames"

import { PaymentFormState } from "./PaymentFormState"
import { Store } from "../Store"

class CheckBox extends React.Component<{ store?: Store }, {}> {
    
    render() {
        return (
          <input type="checkbox" id={this.props.id} value={this.props.value} onChange={this.props.onChange} />
        )
    }
    
}

@inject("store") @observer
export class PaymentForm extends React.Component<{ store?: Store }, {}> {
  public data = new PaymentFormState(this.props.store!)

  constructor(props) {
        super(props);
        this.state= { optionsChecked: [] }
    }
    
    changeEvent(event) {
    
      let checkedArray = this.state.optionsChecked;
      let selectedValue = event.target.value;
        
        if (event.target.checked === true) {
        
          checkedArray.push(selectedValue);
            this.setState({
              optionsChecked: checkedArray
            });
                        
        } else {
        
          let valueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(valueIndex, 1);
            
            this.setState({
              optionsChecked: checkedArray
            });
            
        }
    
    }

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

    let checkBoxArray = ['lorem','ipsum','dolor'];
       
        let outputCheckboxes = checkBoxArray.map(function(string, i){
          return (<div><CheckBox value={string} id={'string_' + i} onChange={this.changeEvent.bind(this)} /><label htmlFor={'string_' + i}>{string}</label></div>)
        }, this);

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
        <div>
              <div>
                  {outputCheckboxes}
              </div>
              <div>
                  {JSON.stringify(this.state.optionsChecked)}
              </div>
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
