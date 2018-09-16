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

class Breadcrumbs extends Component {

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

  createContract() {
    var gName = document.getElementById('exampleInputName2').value;
    var userName = document.getElementById('exampleInputEmail2').value;
    const result =  myToken.send("createContract", [gName, userName]);
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
        <Row>
          <Col xs="12">
          <Card>
              <CardHeader>
                Create New Group
              </CardHeader>
              <CardBody>
                <Form action="" method="post" inline>
                  <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputName2" className="pr-1">Group Name</Label>
                    <Input type="text" id="exampleInputName2" placeholder="Trip to Bali" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputEmail2" className="pr-1"> Your Name</Label>
                    <Input type="text" id="exampleInputEmail2" placeholder="Nakamoto" required />
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="md" color="primary" onClick = {() => this.createContract()}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="md" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Breadcrumbs;
