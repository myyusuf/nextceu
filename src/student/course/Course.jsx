import React from 'react';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

import { Row, Col, ListGroup, ListGroupItem, SplitButton, MenuItem, Modal, Button, FormGroup, HelpBlock, FormControl } from 'react-bootstrap';
import Level from '../../level/Level';

class Course extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      studentId: props.match.params.studentId,
      courses: [],
      showModal: false,
      addCourseByLevelForm: {},
      validation: {
        addCourseByLevelForm: {
          title: {
            state: null,
            message: '',
          },
          status: true,
        }
      }
    };

    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addCourseButtonSelect = this.addCourseButtonSelect.bind(this);
    this.createByLevel = this.createByLevel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/students/${this.state.studentId}/courses`)
    .then((response) => {
      this.setState({
        courses: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  close() {
    this.setState({
      showModal: false,
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  addCourseButtonSelect(eventKey, event) {
    if (eventKey === 'LEVEL') {
      this.setState({
        showModal: true,
      });
    }
  }

  createByLevel() {

    const validation1 = this.validate1(this.state.addCourseByLevelForm);
    const validation = this.state.validation;
    validation.addCourseByLevelForm = validation1;

    if (!validation.addCourseByLevelForm.status) {
      this.setState({
        validation,
      });
      return;
    }

    axios.post(`/api/students/${this.state.studentId}/courses`,
      this.state.addCourseByLevelForm)
    .then((response) => {
      this.props.onSaveSuccess();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const addCourseByLevelForm = this.state.addCourseByLevelForm;
    addCourseByLevelForm[name] = value;

    const validation1 = this.validate1(addCourseByLevelForm);
    const validation = this.state.validation;
    validation.addCourseByLevelForm = validation1;
    this.setState({
      addCourseByLevelForm,
      validation,
    });
  }

  validate1(addCourseByLevelForm) {
    const result =
      {
        title: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!addCourseByLevelForm.title) {
      result.title.state = 'error';
      result.title.message = 'Suffix wajib diisi.';
      result.status = false;
    } else if (addCourseByLevelForm.title.length < 1) {
      result.title.state = 'error';
      result.title.message = 'Minimum panjang suffix adalah satu karakter';
      result.status = false;
    } else {
      result.title.state = 'success';
      result.title.message = '';
    }

    return result;
  }

  handleDateInputChange(value, formattedValue) {

    const addCourseByLevelForm = this.state.addCourseByLevelForm;
    addCourseByLevelForm.formattedStartDate = formattedValue;
    addCourseByLevelForm.startDate = value;

    // const validation = this.validate(student);
    this.setState({
      addCourseByLevelForm,
      // validation,
    });
  }

  render() {
    const level1Courses = this.state.courses;
    const level1CoursesEl = [];
    for (let i = 0; i < level1Courses.length; i += 1) {
      const course = level1Courses[i];
      level1CoursesEl.push(
        <ListGroupItem header="Radiologi" href="#">{course.title}</ListGroupItem>
      );
    }
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <SplitButton bsStyle="success" title="+ Bagian" onSelect={this.addCourseButtonSelect}>
                <MenuItem eventKey="LEVEL">Tingkat</MenuItem>
                <MenuItem eventKey="DEPARTMENT">Bagian</MenuItem>
              </SplitButton>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div style={{ height: 20 }} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ListGroup>
                <ListGroupItem header="Tingkat 1" bsStyle="info"></ListGroupItem>
                {level1CoursesEl}
                <ListGroupItem header="Tingkat 2" bsStyle="info"></ListGroupItem>
                <ListGroupItem header="Neurologi" href="#">Neurologi (1)</ListGroupItem>
                <ListGroupItem header="Anestesi" href="#">Anestesi (1)</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Col>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
        >
          <Modal.Header>
            <Modal.Title>Tambah Bagian Dalam Tingkat</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={4}>
                <Level />
              </Col>
              <Col md={4}>
                <DatePicker
                  name="startDate"
                  value={this.state.addCourseByLevelForm.startDate}
                  onChange={this.handleDateInputChange}
                />
              </Col>
              <Col md={4}>
                <FormGroup
                  controlId="title"
                  validationState={this.state.validation.addCourseByLevelForm.title.state}
                >
                  <input
                    type="text"
                    name="title"
                    placeholder="Suffix"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.addCourseByLevelForm.title.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.createByLevel}>Save</Button>
          </Modal.Footer>

        </Modal>
      </Row>
    );
  }
}

export default Course;
