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
        realStartDate: {
          state: null,
          message: '',
        },
        realEndDate: {
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
