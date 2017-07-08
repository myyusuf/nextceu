import React from 'react';
import axios from 'axios';
import { Row, Col, Modal, Panel, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

const COURSES_URL = '/api/courses';

class CourseSchedule extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      validation: {
        planStartDate: {
          state: null,
          message: '',
        },
        planEndDate: {
          state: null,
          message: '',
        },
        planStartDate1: {
          state: null,
          message: '',
        },
        planEndDate1: {
          state: null,
          message: '',
        },
        planStartDate2: {
          state: null,
          message: '',
        },
        planEndDate2: {
          state: null,
          message: '',
        },
        planStartDate3: {
          state: null,
          message: '',
        },
        planEndDate3: {
          state: null,
          message: '',
        },
        status: true,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateInputChange1 = this.handleDateInputChange1.bind(this);
    this.handleDateInputChange2 = this.handleDateInputChange2.bind(this);
    this.handleDateInputChange3 = this.handleDateInputChange3.bind(this);
    this.handleDateInputChange4 = this.handleDateInputChange4.bind(this);

    this.handleDateInputChange5 = this.handleDateInputChange5.bind(this);
    this.handleDateInputChange6 = this.handleDateInputChange6.bind(this);
    this.handleDateInputChange7 = this.handleDateInputChange7.bind(this);
    this.handleDateInputChange8 = this.handleDateInputChange8.bind(this);

    this.handleDateInputChange9 = this.handleDateInputChange9.bind(this);
    this.handleDateInputChange10 = this.handleDateInputChange10.bind(this);
    this.handleDateInputChange11 = this.handleDateInputChange11.bind(this);
    this.handleDateInputChange12 = this.handleDateInputChange12.bind(this);

    this.handleDateInputChange13 = this.handleDateInputChange13.bind(this);
    this.handleDateInputChange14 = this.handleDateInputChange14.bind(this);
    this.handleDateInputChange15 = this.handleDateInputChange15.bind(this);
    this.handleDateInputChange16 = this.handleDateInputChange16.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course: nextProps.course,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const course = this.state.course;
    course[name] = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange1(value, formattedValue) {
    const course = this.state.course;
    course.formattedPlanStartDate = formattedValue;
    course.planStartDate = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange2(value, formattedValue) {
    const course = this.state.course;
    course.formattedRealEndDate = formattedValue;
    course.planEndDate = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange3(value, formattedValue) {
    const course = this.state.course;
    course.formattedRealStartDate = formattedValue;
    course.realStartDate = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange4(value, formattedValue) {
    const course = this.state.course;
    course.formattedPlanEndDate = formattedValue;
    course.realEndDate = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  //-----

  handleDateInputChange5(value, formattedValue) {
    const course = this.state.course;
    course.formattedPlanStartDate1 = formattedValue;
    course.planStartDate1 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange6(value, formattedValue) {
    const course = this.state.course;
    course.formattedRealEndDate1 = formattedValue;
    course.planEndDate1 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange7(value, formattedValue) {
    const course = this.state.course;
    course.formattedRealStartDate1 = formattedValue;
    course.realStartDate1 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange8(value, formattedValue) {
    const course = this.state.course;
    course.formattedPlanEndDate1 = formattedValue;
    course.realEndDate1 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  //-----

  handleDateInputChange9(value, formattedValue) {
    const course = this.state.course;
    course.formattedPlanStartDate2 = formattedValue;
    course.planStartDate2 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange10(value, formattedValue) {
    const course = this.state.course;
    course.formattedRealEndDate2 = formattedValue;
    course.planEndDate2 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange11(value, formattedValue) {
    const course = this.state.course;
    course.formattedRealStartDate2 = formattedValue;
    course.realStartDate2 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange12(value, formattedValue) {
    const course = this.state.course;
    course.formattedPlanEndDate2 = formattedValue;
    course.realEndDate2 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  //-----

  handleDateInputChange13(value, formattedValue) {
    const course = this.state.course;
    course.formattedPlanStartDate3 = formattedValue;
    course.planStartDate3 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange14(value, formattedValue) {
    const course = this.state.course;
    course.formattedRealEndDate3 = formattedValue;
    course.planEndDate3 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange15(value, formattedValue) {
    const course = this.state.course;
    course.formattedRealStartDate3 = formattedValue;
    course.realStartDate3 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  handleDateInputChange16(value, formattedValue) {
    const course = this.state.course;
    course.formattedPlanEndDate3 = formattedValue;
    course.realEndDate3 = value;

    const validation = this.validate(course);
    this.setState({
      course,
      validation,
    });
  }

  validate(course) {
    const result =
      {
        planStartDate: {
          state: null,
          message: '',
        },
        planEndDate: {
          state: null,
          message: '',
        },
        planStartDate1: {
          state: null,
          message: '',
        },
        planEndDate1: {
          state: null,
          message: '',
        },
        planStartDate2: {
          state: null,
          message: '',
        },
        planEndDate2: {
          state: null,
          message: '',
        },
        planStartDate3: {
          state: null,
          message: '',
        },
        planEndDate3: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!course.planStartDate) {
      result.planStartDate.state = 'error';
      result.planStartDate.message = 'Tanggal Mulai wajib diisi';
      result.status = false;
    } else {
      result.planStartDate.state = 'success';
      result.planStartDate.message = '';
    }

    if (!course.planEndDate) {
      result.planEndDate.state = 'error';
      result.planEndDate.message = 'Tanggal Selesai wajib diisi';
      result.status = false;
    } else {
      result.planEndDate.state = 'success';
      result.planEndDate.message = '';
    }

    if (!course.planStartDate1) {
      result.planStartDate1.state = 'error';
      result.planStartDate1.message = 'Tanggal Mulai wajib diisi';
      result.status = false;
    } else {
      result.planStartDate1.state = 'success';
      result.planStartDate1.message = '';
    }

    if (!course.planEndDate1) {
      result.planEndDate1.state = 'error';
      result.planEndDate1.message = 'Tanggal Selesai wajib diisi';
      result.status = false;
    } else {
      result.planEndDate1.state = 'success';
      result.planEndDate1.message = '';
    }

    if (!course.planStartDate2) {
      result.planStartDate2.state = 'error';
      result.planStartDate2.message = 'Tanggal Mulai wajib diisi';
      result.status = false;
    } else {
      result.planStartDate2.state = 'success';
      result.planStartDate2.message = '';
    }

    if (!course.planEndDate2) {
      result.planEndDate2.state = 'error';
      result.planEndDate2.message = 'Tanggal Selesai wajib diisi';
      result.status = false;
    } else {
      result.planEndDate2.state = 'success';
      result.planEndDate2.message = '';
    }

    if (!course.planStartDate3) {
      result.planStartDate3.state = 'error';
      result.planStartDate3.message = 'Tanggal Mulai wajib diisi';
      result.status = false;
    } else {
      result.planStartDate3.state = 'success';
      result.planStartDate3.message = '';
    }

    if (!course.planEndDate3) {
      result.planEndDate3.state = 'error';
      result.planEndDate3.message = 'Tanggal Selesai wajib diisi';
      result.status = false;
    } else {
      result.planEndDate3.state = 'success';
      result.planEndDate3.message = '';
    }

    return result;
  }

  handleSubmit(event) {
    event.preventDefault();
    const validation = this.validate(this.state.course);
    if (!validation.status) {
      this.setState({
        validation,
      });
      return;
    }

    const course = this.state.course;
    // course.updateType = 'SCHEDULE';

    axios.put(`${COURSES_URL}/${this.state.course.id}`,
      this.state.course)
    .then((response) => {
      console.log(response);
      alert('Schedule saved');
    })
    .catch((error) => {
      alert('Error on saved');
      console.log(error);
    });
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <form onSubmit={this.handleSubmit}>
            <Panel header="Jadwal Utama">
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="planStartDate"
                    validationState={this.state.validation.planStartDate.state}
                  >
                    <ControlLabel>Rencana Mulai</ControlLabel>
                    <DatePicker
                      name="planStartDate"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planStartDate}
                      onChange={this.handleDateInputChange1}
                    />
                    <HelpBlock>{this.state.validation.planStartDate.message}</HelpBlock>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="planEndDate"
                    validationState={this.state.validation.planEndDate.state}
                  >
                    <ControlLabel>Rencana Selesai</ControlLabel>
                    <DatePicker
                      name="planEndDate"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planEndDate}
                      onChange={this.handleDateInputChange2}
                    />
                    <HelpBlock>{this.state.validation.planEndDate.message}</HelpBlock>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="realStartDate"
                  >
                    <ControlLabel>Realisasi Mulai</ControlLabel>
                    <DatePicker
                      name="realStartDate"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realStartDate}
                      onChange={this.handleDateInputChange3}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="realEndDate"
                  >
                    <ControlLabel>Realisasi Selesai</ControlLabel>
                    <DatePicker
                      name="realEndDate"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realEndDate}
                      onChange={this.handleDateInputChange4}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Panel>

            <Panel header="Jadwal RS 1">
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="planStartDate1"
                    validationState={this.state.validation.planStartDate1.state}
                  >
                    <ControlLabel>Rencana Mulai</ControlLabel>
                    <DatePicker
                      name="planStartDate1"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planStartDate1}
                      onChange={this.handleDateInputChange5}
                    />
                    <HelpBlock>{this.state.validation.planStartDate1.message}</HelpBlock>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="planEndDate1"
                    validationState={this.state.validation.planEndDate1.state}
                  >
                    <ControlLabel>Rencana Selesai</ControlLabel>
                    <DatePicker
                      name="planEndDate1"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planEndDate1}
                      onChange={this.handleDateInputChange6}
                    />
                    <HelpBlock>{this.state.validation.planEndDate1.message}</HelpBlock>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="realStartDate1"
                  >
                    <ControlLabel>Realisasi Mulai</ControlLabel>
                    <DatePicker
                      name="realStartDate1"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realStartDate1}
                      onChange={this.handleDateInputChange7}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="realEndDate1"
                  >
                    <ControlLabel>Realisasi Selesai</ControlLabel>
                    <DatePicker
                      name="realEndDate1"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realEndDate1}
                      onChange={this.handleDateInputChange8}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Panel>

            <Panel header="Jadwal Puskesmas">
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="planStartDate2"
                    validationState={this.state.validation.planStartDate2.state}
                  >
                    <ControlLabel>Rencana Mulai</ControlLabel>
                    <DatePicker
                      name="planStartDate2"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planStartDate2}
                      onChange={this.handleDateInputChange9}
                    />
                    <HelpBlock>{this.state.validation.planStartDate2.message}</HelpBlock>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="planEndDate2"
                    validationState={this.state.validation.planEndDate2.state}
                  >
                    <ControlLabel>Rencana Selesai</ControlLabel>
                    <DatePicker
                      name="planEndDate2"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planEndDate2}
                      onChange={this.handleDateInputChange10}
                    />
                    <HelpBlock>{this.state.validation.planEndDate2.message}</HelpBlock>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="realStartDate2"
                  >
                    <ControlLabel>Realisasi Mulai</ControlLabel>
                    <DatePicker
                      name="realStartDate2"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realStartDate2}
                      onChange={this.handleDateInputChange11}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="realEndDate2"
                  >
                    <ControlLabel>Realisasi Selesai</ControlLabel>
                    <DatePicker
                      name="realEndDate2"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realEndDate2}
                      onChange={this.handleDateInputChange12}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Panel>

            <Panel header="Jadwal RS 2">
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="planStartDate3"
                    validationState={this.state.validation.planStartDate3.state}
                  >
                    <ControlLabel>Rencana Mulai</ControlLabel>
                    <DatePicker
                      name="planStartDate3"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planStartDate3}
                      onChange={this.handleDateInputChange13}
                    />
                    <HelpBlock>{this.state.validation.planStartDate3.message}</HelpBlock>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="planEndDate3"
                    validationState={this.state.validation.planEndDate3.state}
                  >
                    <ControlLabel>Rencana Selesai</ControlLabel>
                    <DatePicker
                      name="planEndDate3"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planEndDate3}
                      onChange={this.handleDateInputChange14}
                    />
                    <HelpBlock>{this.state.validation.planEndDate3.message}</HelpBlock>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="realStartDate3"
                  >
                    <ControlLabel>Realisasi Mulai</ControlLabel>
                    <DatePicker
                      name="realStartDate3"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realStartDate3}
                      onChange={this.handleDateInputChange15}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="realEndDate3"
                  >
                    <ControlLabel>Realisasi Selesai</ControlLabel>
                    <DatePicker
                      name="realEndDate3"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realEndDate3}
                      onChange={this.handleDateInputChange16}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Panel>

            <Button type="submit" bsStyle="primary">
              Save
            </Button>
          </form>
        </Col>
      </Row>
    );
  }
}

export default CourseSchedule;
