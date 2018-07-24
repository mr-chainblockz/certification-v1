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
    message: 'Hệ thống đã sẵn sàng!'
  }

  applyCert = async event => {
    event.preventDefault();

    this.setState({
      message: 'Vui lòng chờ giao dịch thực hiện trên mạng lưới Rinkeby ...'
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
      message: 'Hệ thống đã sẵn sàng!'
    });
  }

  verifyCert = async event => {
    event.preventDefault();

    this.setState({
      message: 'Vui lòng chờ giao dịch thực hiện trên mạng lưới Rinkeby ...'
    });

    const accounts = await web3.eth.getAccounts();
    const courseName = await certification.methods.verifyCertification(
      this.state.studentAddress, parseInt(this.state.courseIdNeedVerification, 10)-1
    ).call();

    if (courseName) {
      this.setState({
        verificationMessage: 'Học viên tại địa chỉ trên đã hoàn thành khoá học ' + courseName + '.'
      });
    } else {
      this.setState({
        verificationMessage: 'Chúng tôi không xác nhận học viên trên có hoàn thành khoá học.'
      });
    }

    this.setState({
      message: 'Hệ thống đã sẵn sàng!'
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Chứng chỉ của Học viện Mr. Chainblockz</h1>
        </header>

        <h3>Hướng dẫn</h3>
        <p>
          1. Vui lòng sử dụng trình duyệt Chrome và cài đặt Metamask với mạng lưới Rinkeby <br />
          2. Vui lòng điền thông tin Họ tên, email, số điện thoại chính xác để chúng tôi dễ dàng thẩm định <br />
          3. Sử dụng Mã lớp học như sau: 1 - Ethereum All-in-One; 2 - Ethereum Basic 2; 3 - Ethereum Basic 3
        </p>

        <Grid>
          <Row>
            <Col cs={6} md={6}>
              <h3>Yêu cầu cấp chứng chỉ</h3>
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
                      <td><Button bsStyle="primary" type="submit">Gửi</Button></td>
                    </tr>
                  </tbody>
                </Table>
              </Form>
            </Col>
            <Col cs={6} md={6}>
              <h3>Xác nhận chứng chỉ</h3>
              <Form onSubmit={ this.verifyCert }>
                <Table responsive>
                  <tbody>
                    <tr>
                      <td><label>Tài khoản Ethereum của Học viên</label></td>
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
                      <td><Button bsStyle="primary" type="submit">Xác nhận</Button></td>
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