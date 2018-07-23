import { Grid, Row, Col, Table, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import certification from './certification-v1';

class App extends Component {
  state = {
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    courseId: '',
    studentAddress: '',
    courseIdNeedVerification: '',
    verificationMessage: '',
    message: 'The system is up to date!'
  }

  applyCert = async event => {
    event.preventDefault();

    this.setState({
      message: 'Waiting for your transaction to go through the Rinkeby network ...'
    });

    const accounts = await web3.eth.getAccounts();
    await certification.methods.applyForCertification(
      this.state.studentName,
      this.state.studentEmail,
      this.state.studentPhone,
      parseInt(this.state.courseId, 10)-1
    ).send({
        from: accounts[0]
    });

    this.setState({
      message: 'The system is up to date!'
    });
  }

  verifyCert = async event => {
    event.preventDefault();

    this.setState({
      message: 'Waiting for your transaction to go through the Rinkeby network ...'
    });

    const accounts = await web3.eth.getAccounts();
    const courseName = await certification.methods.verifyCertification(
      this.state.studentAddress, parseInt(this.state.courseIdNeedVerification, 10)-1
    ).call();

    if (courseName) {
      this.setState({
        verificationMessage: 'This student attended the course ' + courseName + '.'
      });
    } else {
      this.setState({
        verificationMessage: 'This student was unsure to attend the course.'
      });
    }

    this.setState({
      message: 'The system is up to date!'
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Mr. Chainblockz' Certification</h1>
        </header>

        <Grid>
          <Row>
            <Col cs={6} md={6}>
              <h3>Apply for certification</h3>
              <Form onSubmit={ this.applyCert }>
                <Table responsive>
                  <tbody>
                    <tr>
                      <td><label>Họ tên đầy đủ:</label></td>
                      <td>
                        <input 
                          value={ this.state.studentName }
                          onChange={ event => this.setState({ studentName: event.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Email:</label></td>
                      <td>
                        <input 
                          value={ this.state.studentEmail }
                          onChange={ event => this.setState({ studentEmail: event.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Số điện thoại:</label></td>
                      <td>
                        <input 
                          value={ this.state.studentPhone }
                          onChange={ event => this.setState({ studentPhone: event.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Mã khoá học:</label></td>
                      <td>
                        <input 
                          value={ this.state.courseId }
                          onChange={ event => this.setState({ courseId: event.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><Button bsStyle="primary" type="submit">Apply</Button></td>
                    </tr>
                  </tbody>
                </Table>
              </Form>
            </Col>
            <Col cs={6} md={6}>
              <h3>Verify certification</h3>
              <Form onSubmit={ this.verifyCert }>
                <Table responsive>
                  <tbody>
                    <tr>
                      <td><label>Student's Address</label></td>
                      <td>
                        <input 
                          value={ this.state.studentAddress }
                          onChange={ event => this.setState({ 
                            studentAddress: event.target.value,
                            verificationMessage: ''
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Mã khoá học:</label></td>
                      <td>
                        <input 
                          value={ this.state.courseIdNeedVerification }
                          onChange={ event => this.setState({ 
                            courseIdNeedVerification: event.target.value,
                            verificationMessage: ''
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><Button bsStyle="primary" type="submit">Verify</Button></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><strong>{ this.state.verificationMessage }</strong></td>
                    </tr>
                  </tbody>
                </Table>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col cs={12} md={12}>
            <strong>{ this.state.message }</strong>
            </Col>
            <Col cs={0} md={0}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;