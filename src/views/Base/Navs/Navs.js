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

class Navs extends Component {

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

  makePayment() {
    var title = document.getElementById('paymentTitle').value;
    var amount = document.getElementById('paymentAmount').value;
    var addr = document.getElementById('paymentAddress').value;
    var payees = [];
    var notes = document.getElementById('paymentNotes').value;
    const result = myToken.send("makePayment", [title, amount,addr ,payees,notes]);
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

  render() {
    return (
      <div className="animated fadeIn">
         <Alert color={this.state.color} id="successToastr"  isOpen={this.state.visible} toggle={this.onDismiss}>
                  {this.state.message}
        </Alert>
        <Col xs="12" >
        <Card>
              <CardHeader>
                Make a payment
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Description</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text " id="paymentTitle" name="username3" autoComplete="name" placeholder="Lunch at PastaStop"/>
                      <InputGroupAddon addonType="append">
                      </InputGroupAddon>
                    </InputGroup>
                    </FormGroup>
                    <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        </InputGroupAddon>
                        <Input type="text" id="paymentAmount" name="input3-group1" placeholder="Amount" />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>Qtum tokens</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Payment address</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="paymentAddress" name="email3" autoComplete="username"/>
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>Split equally among</Label></Col>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox11" name="checkbox1" value="option1" />
                        <Label check className="form-check-label" htmlFor="checkbox1">Niharika Gupta  </Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox21" name="checkbox2" value="option2" />
                        <Label check className="form-check-label" htmlFor="checkbox2">Siddhanjay Godre</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox31" name="checkbox3" value="option3" />
                        <Label check className="form-check-label" htmlFor="checkbox3">Vitalik Buterin</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox41" name="checkbox3" value="option3" />
                        <Label check className="form-check-label" htmlFor="checkbox3">Satoshi Nakamoto</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Additional Notes</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="paymentNotes" name="password3" />
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  
                  <FormGroup className="form-actions">
                    <Button type="submit" size="md" color="success" onClick = {() => this.makePayment()}>Make a Payment</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            </Col>
      </div>
    );
  }
}

export default Navs;