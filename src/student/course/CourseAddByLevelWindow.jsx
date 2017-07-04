import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import axios from 'axios';

import LevelSelect from '../../level/LevelSelect';

class CourseAddByLevelWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: props.student,
      courseByLevel: {},
      showModal: this.props.showModal,
      validation: {
        suffix: {
          state: null,
          message: '',
        },
        startDate: {
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

    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal,
      student: nextProps.student,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const courseByLevel = this.state.courseByLevel;
    courseByLevel[name] = value;

    const validation = this.validate(courseByLevel);
    this.setState({
      courseByLevel,
      validation,
    });
  }

  handleDateInputChange(value, formattedValue) {
    const courseByLevel = this.state.courseByLevel;
    courseByLevel.formattedStartDate = formattedValue;
    courseByLevel.startDate = value;

    const validation = this.validate(courseByLevel);
    validation.courseByLevel = validation;
    this.setState({
      courseByLevel,
      validation,
    });
  }

  validate(courseByLevel) {
    const result =
      {
        suffix: {
          state: null,
          message: '',
        },
        startDate: {
          state: null,
          message: '',
        },
        level: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!courseByLevel.level) {
      result.level.state = 'error';
      result.level.message = 'Level wajib diisi';
      result.status = false;
    } else {
      result.level.state = 'success';
      result.level.message = '';
    }

    if (!courseByLevel.suffix) {
      result.suffix.state = 'error';
      result.suffix.message = 'Suffix wajib diisi';
      result.status = false;
    } else if (courseByLevel.suffix.length < 1) {
      result.suffix.state = 'error';
      result.suffix.message = 'Minimum panjang suffix adalah satu karakter';
      result.status = false;
    } else {
      result.suffix.state = 'success';
      result.suffix.message = '';
    }

    if (!courseByLevel.startDate) {
      result.startDate.state = 'error';
      result.startDate.message = 'Tanggal Mulai wajib diisi';
      result.status = false;
    } else {
      result.startDate.state = 'success';
      result.startDate.message = '';
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.courseByLevel);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    const form = this.state.courseByLevel;
    form.formType = 'LEVEL';
    axios.post(`/api/students/${this.state.student.id}/courses`,
      form)
    .then((response) => {
      this.close();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  close() {
    this.setState({
      showModal: false,
      courseByLevel: {},
      validation: {
        suffix: {
          state: null,
          message: '',
        },
        startDate: {
          state: null,
          message: '',
        },
        level: {
          state: null,
          message: '',
        },
        status: true,
      },
    }, () => {
      this.props.onSaveSuccess();
    });
  }

  render() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
      >
        <Modal.Header>
          <Modal.Title>Tambah Bagian</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={4}>
              <FormGroup
                controlId="level"
                validationState={this.state.validation.level.state}
              >
                <LevelSelect
                  name="level"
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.level.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup
                controlId="startDate"
                validationState={this.state.validation.startDate.state}
              >
                <DatePicker
                  name="startDate"
                  dateFormat="DD/MM/YYYY"
                  value={this.state.courseByLevel.startDate}
                  onChange={this.handleDateInputChange}
                />
                <HelpBlock>{this.state.validation.startDate.message}</HelpBlock>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup
                controlId="suffix"
                validationState={this.state.validation.suffix.state}
              >
                <input
                  type="text"
                  name="suffix"
                  placeholder="Suffix"
                  className="form-control"
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.suffix.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CourseAddByLevelWindow.propTypes = {
  // onSaveSuccess: PropTypes.shape({}).isRequired,
};

export default CourseAddByLevelWindow;
