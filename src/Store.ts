import { observable } from "mobx"
import { Qtum, QtumRPC, Contract } from "qtumjs"

import { ITransferLog, ITxRecord } from "./types"
import { TxRecord } from "./views/TxRecord"

// QTUM_RPC defined in config/[env].js
// SOLAR_REPO is `solar.[env].json`. defined in config/*.js
const qtum = new Qtum(QTUM_RPC, SOLAR_REPO)
const myToken = qtum.contract("Simplr.sol")

export class Store {
  @observable public contractBalance: number = 0

  @observable public numberOfUsers: number = 0

  @observable.shallow public transferEvents: ITransferLog[] = []

  @observable public txRecords: ITxRecord[] = []

  private emitter = myToken.logEmitter({ minconf: 0 })

  public init() {
    this.updateTotalSupply()
    this.getNumberOfUsers()
    this.observeEvents()
    
  }

  public async updateTotalSupply() {
    const result = await myToken.call("contractBalance")
    const supply = result.outputs[0]

    this.contractBalance = supply.toNumber()
  }


  public async getNumberOfUsers() {

    console.log("Inside method")
    const result = await myToken.call("getNumberOfUsers")
    const supply = result.outputs[0]
    this.numberOfUsers = supply.toNumber()
  }

  public async mintTokens(toAddress: string, amount: number) {
    // txRecords is an observable array. Adding an object into the array
    // will recursively convert the object into an observable.
    this.txRecords.unshift({
      method: "mint",
      params: {
        toAddress,
        amount,
      },
      tx: undefined,
      error: undefined,
    })

    // getting the observable txRecords back, so when we update `tx`, it will
    // trigger observers.
    const txRecord = this.txRecords[0]

    try {
      const tx = await myToken.send("mint", [toAddress, amount])
      txRecord.tx = tx

      await tx.confirm(3, (tx2) => {
        // update transaction info
        txRecord.tx = tx2
      })
    } catch (err) {
      txRecord.error = err
    }
  }


  public async createContract(gName: string, userName: string) {
    // txRecords is an observable array. Adding an object into the array
    // will recursively convert the object into an observable.
    this.txRecords.unshift({
      method: "createContract",
      params: {
        gName,
        userName,
      },
      tx: undefined,
      error: undefined,
    })

    // getting the observable txRecords back, so when we update `tx`, it will
    // trigger observers.
    const txRecord = this.txRecords[0]

    try {
      const tx = await myToken.send("createContract", [gName, userName])
      txRecord.tx = tx

      await tx.confirm(3, (tx2) => {
        // update transaction info
        txRecord.tx = tx2
      })
    } catch (err) {
      txRecord.error = err
    }
  }

  public async makePayment(paymentTitle: string, paymentAmount: string, paymentAddress: string, paymentPayees: string, paymentNotes: string) {

    this.txRecords.unshift({
      method: "makePayment",
      params: {
        paymentTitle,
        paymentAmount,
        paymentAddress,
        paymentPayees,
        paymentNotes,
      },
      tx: undefined,
      error: undefined,
    })

    // getting the observable txRecords back, so when we update `tx`, it will
    // trigger observers.
    const txRecord = this.txRecords[0]



    try {
      const tx = await myToken.send("makePayment", [paymentTitle, paymentAmount, paymentAddress, paymentPayees.split(","), paymentNotes])
      console.log(paymentTitle, paymentAmount, paymentAddress, paymentPayees.split(","), paymentNotes)
      txRecord.tx = tx

      await tx.confirm(3, (tx2) => {
        // update transaction info
        txRecord.tx = tx2
      })
    } catch (err) {
      txRecord.error = err
    }
  }


public async addUser(userName: string, userAddress: string) {
    // txRecords is an observable array. Adding an object into the array
    // will recursively convert the object into an observable.
    this.txRecords.unshift({
      method: "createContract",
      params: {
        userName,
        userAddress,
      },
      tx: undefined,
      error: undefined,
    })

    // getting the observable txRecords back, so when we update `tx`, it will
    // trigger observers.
    const txRecord = this.txRecords[0]

    try {
      const tx = await myToken.send("addUser", [userName, userAddress])
      txRecord.tx = tx

      await tx.confirm(3, (tx2) => {
        // update transaction info
        txRecord.tx = tx2
      })
    } catch (err) {
      txRecord.error = err
    }
  }

  private async observeEvents() {
    this.emitter.on("Mint", () => {
      this.updateTotalSupply()
    })

    this.emitter.on("Transfer", (log: ITransferLog) => {
      this.transferEvents.unshift(log)
    })
  }
}
