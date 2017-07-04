import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tabs, Tab, Button, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import LevelSelect from '../level/LevelSelect';

const STUDENTS_URL = '/api/students';

class StudentProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      student: props.student,
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
        level: {
          state: null,
          message: '',
        },
        status: true,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      student: nextProps.student,
    });
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
        level: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!student.oldSid) {
      result.oldSid.state = 'error';
      result.oldSid.message = 'Stambuk lama wajib diisi.';
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
      result.newSid.message = 'Stambuk baru wajib diisi';
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

    if (!student.level) {
      result.level.state = 'error';
      result.level.message = 'Level wajib diisi';
      result.status = false;
    } else {
      result.level.state = 'success';
      result.level.message = '';
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.student);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    axios.put(`${STUDENTS_URL}/${this.state.student.id}`,
      this.state.student)
    .then((response) => {
      this.props.onSaveSuccess(this.state.student);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} title="Data Diri" style={{ padding: 10 }}>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup controlId={'oldSid'} validationState={this.state.validation.oldSid.state}>
                <ControlLabel>Stambuk Lama</ControlLabel>
                <FormControl
                  type="text"
                  name="oldSid"
                  value={this.state.student.oldSid}
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
                  value={this.state.student.newSid}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.newSid.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup controlId={'name'} validationState={this.state.validation.name.state}>
                <ControlLabel>Nama</ControlLabel>
                <FormControl
                  type="text"
                  name="name"
                  value={this.state.student.name}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.name.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup
                controlId="formControlsSelect"
                validationState={this.state.validation.level.state}
              >
                <ControlLabel>Tingkat</ControlLabel>
                <LevelSelect
                  name="level"
                  value={this.state.student.level}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.level.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey={2} title="Alamat">Tab 2 content</Tab>
        <Tab eventKey={3} title="Pendidikan">Tab 3 content</Tab>
        <Button type="button" bsStyle="primary" className="" style={{ marginLeft: 10 }} onClick={this.handleSubmit}>
          Save
        </Button>
      </Tabs>
    );
  }
}

StudentProfile.propTypes = {
};

export default StudentProfile;
