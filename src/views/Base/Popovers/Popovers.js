import React, { Component } from 'react';
import { Qtum, QtumRPC, Contract } from "qtumjs"
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Alert,
} from 'reactstrap';

const qtum = new Qtum("http://localhost:9888", require("../../../solar.development.json"))
const myToken = qtum.contract("Simplr.sol")



class Popovers extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      visible: false,
      color: "success",
      message: "Transaction created successfully"
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  onDismiss() {
    this.setState({ visible: false });
   
  }
  
  withdrawBalance() {
    var withdrawAmount = document.getElementById('withdrawAmount').value;
    const result = myToken.send("withdraw ", [withdrawAmount]);
    var promise = Promise.resolve(result);
    this.setState({ visible: true });
    this.setState({ color : "warning"});
    this.setState({ message: "Transcation is pending approval.Please verify" });
    var self_ = this;
    try {
      promise.then(function(value) {
         self_.setState({ color : "success"});
         self_.setState({ message: "Transaction created successfully" });
       })
     } catch(e){
       self_.setState({color: "danger"})
       self_.setState({ message: e });
      }
  }

  getUserBalance() {
    const result =  myToken.call("getUserBalance");
   var promise = Promise.resolve(result);
    promise.then(function(value) {
     
      const supply = value.outputs[0];
     
      document.getElementById("userBalance").innerHTML = "out of " + supply.toString() + " available tokens";
    })
    
  }

  render() {
    return (
      <div className="animated fadeIn">
      <Alert color={this.state.color} id="successToastr"  isOpen={this.state.visible} toggle={this.onDismiss}>
                  {this.state.message}
        </Alert>
        <Col xs="12" >
             <Card>
              <CardHeader>
                <strong>Withdraw Balance</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
                <FormGroup row>
                <Col md="12">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input type="text" id="withdrawAmount" name="input3-group1" placeholder="Amount" />
                        <InputGroupAddon addonType="append">
                          <InputGroupText id ="userBalance">{this.getUserBalance()} </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      </Col>
                  </FormGroup>
                 </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="success" onClick = {() => this.withdrawBalance()}><i className="fa fa-dot-circle-o"></i> Pay </Button>
              </CardFooter>
            </Card>
            </Col>
      </div>
    );
  }
}

export default Popovers;