import React from 'react';
import axios from 'axios';
import { Row, Col, Modal, Panel, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

class StudentAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      student: {},
      validation: {
        oldSid: {
          state: null,
          message: '',
        },
        newSid: {
          state: null,
          message: '',
        },
        name: {
          state: null,
          message: '',
        },
        status: true,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const student = this.state.student;
    student[name] = value;

    const validation = this.validate(student);
    this.setState({
      student,
      validation,
    });
  }

  validate(student) {
    const result =
      {
        oldSid: {
          state: null,
          message: '',
        },
        newSid: {
          state: null,
          message: '',
        },
        name: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!student.oldSid) {
      result.oldSid.state = 'error';
      result.oldSid.message = 'Stambuk lama wajib diisi';
      result.status = false;
    } else if (student.oldSid.length < 3) {
      result.oldSid.state = 'error';
      result.oldSid.message = 'Minimum panjang stambuk adalah tiga karakter';
      result.status = false;
    } else {
      result.oldSid.state = 'success';
      result.oldSid.message = '';
    }

    if (!student.newSid) {
      result.newSid.state = 'error';
      result.newSid.message = 'Stambuk wajib diisi';
      result.status = false;
    } else if (student.newSid.length < 3) {
      result.newSid.state = 'error';
      result.newSid.message = 'Minimum panjang stambuk adalah tiga karakter';
      result.status = false;
    } else {
      result.newSid.state = 'success';
      result.newSid.message = '';
    }

    if (!student.name) {
      result.name.state = 'error';
      result.name.message = 'Nama wajib diisi';
      result.status = false;
    } else if (student.name.length < 3) {
      result.name.state = 'error';
      result.name.message = 'Minimum panjang nama adalah tiga karakter';
      result.status = false;
    } else {
      result.name.state = 'success';
      result.name.message = '';
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.department);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    axios.post('/students',
      this.state.student)
    .then((response) => {
      console.log(response);
      window.location.href = '#/students';
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <Panel header="Tambah Siswa">
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup controlId={'oldSid'} validationState={this.state.validation.oldSid.state}>
                <ControlLabel>Kode</ControlLabel>
                <FormControl
                  type="text"
                  name="oldSid"
                  value={this.state.department.oldSid}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.oldSid.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
            <Col xs={6} md={6}>
              <FormGroup controlId={'newSid'} validationState={this.state.validation.newSid.state}>
                <ControlLabel>Stambuk Baru</ControlLabel>
                <FormControl
                  type="text"
                  name="newSid"
                  value={this.state.department.newSid}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.name.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
        </form>
      </Panel>
    );
  }
}

export default StudentAdd;
