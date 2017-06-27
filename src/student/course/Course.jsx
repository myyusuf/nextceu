import React from 'react';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

import { Row, Col, ListGroup, ListGroupItem, SplitButton, MenuItem, Modal, Button, FormGroup, HelpBlock, FormControl } from 'react-bootstrap';
import Level from '../../level/Level';
import DepartmentSelect from '../../department/DepartmentSelect';

class Course extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      studentId: props.match.params.studentId,
      courses: [],
      showModal: false,
      addCourseByLevelForm: {},
      addCourseByDepartmentForm: {},
      validation: {
        addCourseByLevelForm: {
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
          formType: 'LEVEL',
          status: true,
        },
        addCourseByDepartmentForm: {
          title: {
            state: null,
            message: '',
          },
          startDate: {
            state: null,
            message: '',
          },
          department: {
            state: null,
            message: '',
          },
          formType: 'DEPARTMENT',
          status: true,
        },
      },
    };

    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addCourseButtonSelect = this.addCourseButtonSelect.bind(this);
    this.createByLevel = this.createByLevel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);

    this.createByDepartment = this.createByDepartment.bind(this);
    this.handleInputChange2 = this.handleInputChange2.bind(this);
    this.handleDateInputChange2 = this.handleDateInputChange2.bind(this);
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
      showModal2: false,
      addCourseByLevelForm: {},
      addCourseByDepartmentForm: {},
      validation: {
        addCourseByLevelForm: {
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
        addCourseByDepartmentForm: {
          title: {
            state: null,
            message: '',
          },
          startDate: {
            state: null,
            message: '',
          },
          department: {
            state: null,
            message: '',
          },
          status: true,
        },
      },
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
    } else if (eventKey === 'DEPARTMENT') {
      this.setState({
        showModal2: true,
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

    const form = this.state.addCourseByLevelForm;
    form.formType = 'LEVEL';

    axios.post(`/api/students/${this.state.studentId}/courses`,
      form)
    .then((response) => {
      // this.props.onSaveSuccess();
      this.close();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  createByDepartment() {

    const validation2 = this.validate2(this.state.addCourseByDepartmentForm);
    const validation = this.state.validation;
    validation.addCourseByDepartmentForm = validation2;

    if (!validation.addCourseByDepartmentForm.status) {
      this.setState({
        validation,
      });
      return;
    }

    const form = this.state.addCourseByDepartmentForm;
    form.formType = 'DEPARTMENT';

    axios.post(`/api/students/${this.state.studentId}/courses`,
      form)
    .then((response) => {
      // this.props.onSaveSuccess();
      this.close();
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

  handleInputChange2(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const addCourseByDepartmentForm = this.state.addCourseByDepartmentForm;
    addCourseByDepartmentForm[name] = value;

    const validation2 = this.validate2(addCourseByDepartmentForm);
    const validation = this.state.validation;
    validation.addCourseByDepartmentForm = validation2;
    this.setState({
      addCourseByDepartmentForm,
      validation,
    });
  }

  validate1(addCourseByLevelForm) {
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

    if (!addCourseByLevelForm.level) {
      result.level.state = 'error';
      result.level.message = 'Level wajib diisi';
      result.status = false;
    } else {
      result.level.state = 'success';
      result.level.message = '';
    }

    if (!addCourseByLevelForm.suffix) {
      result.suffix.state = 'error';
      result.suffix.message = 'Suffix wajib diisi';
      result.status = false;
    } else if (addCourseByLevelForm.suffix.length < 1) {
      result.suffix.state = 'error';
      result.suffix.message = 'Minimum panjang suffix adalah satu karakter';
      result.status = false;
    } else {
      result.suffix.state = 'success';
      result.suffix.message = '';
    }

    if (!addCourseByLevelForm.startDate) {
      result.startDate.state = 'error';
      result.startDate.message = 'Tanggal Mulai wajib diisi';
      result.status = false;
    } else {
      result.startDate.state = 'success';
      result.startDate.message = '';
    }

    return result;
  }

  validate2(addCourseByDepartmentForm) {
    const result =
      {
        department: {
          state: null,
          message: '',
        },
        startDate: {
          state: null,
          message: '',
        },
        title: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!addCourseByDepartmentForm.department) {
      result.department.state = 'error';
      result.department.message = 'Bagian wajib diisi';
      result.status = false;
    } else {
      result.department.state = 'success';
      result.department.message = '';
    }

    if (!addCourseByDepartmentForm.title) {
      result.title.state = 'error';
      result.title.message = 'Judul wajib diisi';
      result.status = false;
    } else if (addCourseByDepartmentForm.title.length < 3) {
      result.title.state = 'error';
      result.title.message = 'Minimum panjang judul adalah tiga karakter';
      result.status = false;
    } else {
      result.title.state = 'success';
      result.title.message = '';
    }

    if (!addCourseByDepartmentForm.startDate) {
      result.startDate.state = 'error';
      result.startDate.message = 'Tanggal Mulai wajib diisi';
      result.status = false;
    } else {
      result.startDate.state = 'success';
      result.startDate.message = '';
    }

    return result;
  }

  handleDateInputChange(value, formattedValue) {

    const addCourseByLevelForm = this.state.addCourseByLevelForm;
    addCourseByLevelForm.formattedStartDate = formattedValue;
    addCourseByLevelForm.startDate = value;

    const validation1 = this.validate1(addCourseByLevelForm);
    const validation = this.state.validation;
    validation.addCourseByLevelForm = validation1;
    this.setState({
      addCourseByLevelForm,
      validation,
    });
  }

  handleDateInputChange2(value, formattedValue) {

    const addCourseByDepartmentForm = this.state.addCourseByDepartmentForm;
    addCourseByDepartmentForm.formattedStartDate = formattedValue;
    addCourseByDepartmentForm.startDate = value;

    const validation2 = this.validate2(addCourseByDepartmentForm);
    const validation = this.state.validation;
    validation.addCourseByDepartmentForm = validation2;
    this.setState({
      addCourseByDepartmentForm,
      validation,
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
                <FormGroup
                  controlId="level"
                  validationState={this.state.validation.addCourseByLevelForm.level.state}
                >
                  <Level
                    name="level"
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.addCourseByLevelForm.level.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup
                  controlId="startDate"
                  validationState={this.state.validation.addCourseByLevelForm.startDate.state}
                >
                  <DatePicker
                    name="startDate"
                    value={this.state.addCourseByLevelForm.startDate}
                    onChange={this.handleDateInputChange}
                  />
                  <HelpBlock>{this.state.validation.addCourseByLevelForm.startDate.message}</HelpBlock>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup
                  controlId="suffix"
                  validationState={this.state.validation.addCourseByLevelForm.suffix.state}
                >
                  <input
                    type="text"
                    name="suffix"
                    placeholder="Suffix"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>{this.state.validation.addCourseByLevelForm.suffix.message}</HelpBlock>
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


        <Modal
          show={this.state.showModal2}
          onHide={this.close}
        >
          <Modal.Header>
            <Modal.Title>Tambah Bagian</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={4}>
                <FormGroup
                  controlId="department"
                  validationState={this.state.validation.addCourseByDepartmentForm.department.state}
                >
                  <DepartmentSelect
                    name="department"
                    onChange={this.handleInputChange2}
                  />
                  <HelpBlock>{this.state.validation.addCourseByDepartmentForm.department.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup
                  controlId="startDate2"
                  validationState={this.state.validation.addCourseByDepartmentForm.startDate.state}
                >
                  <DatePicker
                    name="startDate"
                    value={this.state.addCourseByDepartmentForm.startDate}
                    onChange={this.handleDateInputChange2}
                  />
                <HelpBlock>{this.state.validation.addCourseByDepartmentForm.startDate.message}</HelpBlock>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup
                  controlId="title"
                  validationState={this.state.validation.addCourseByDepartmentForm.title.state}
                >
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control"
                    onChange={this.handleInputChange2}
                  />
                  <HelpBlock>{this.state.validation.addCourseByDepartmentForm.title.message}</HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.createByDepartment}>Save</Button>
          </Modal.Footer>

        </Modal>
      </Row>
    );
  }
}

export default Course;
