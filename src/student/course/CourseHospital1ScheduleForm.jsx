import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Panel, FormGroup, FormControl, Button, ControlLabel, HelpBlock, Tabs, Tab } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

const COURSES_URL = '/api/courses';

class CourseHospital1ScheduleForm extends React.Component {

  static get ADD_FORM() {
    return 'ADD';
  }

  static get EDIT_FORM() {
    return 'EDIT';
  }

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
        status: true,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
      result.planStartDate.message = 'Tanggal rencana mulai wajib diisi.';
      result.status = false;
    } else {
      result.planStartDate.state = 'success';
      result.planStartDate.message = '';
    }

    if (!course.planEndDate) {
      result.planEndDate.state = 'error';
      result.planEndDate.message = 'Tanggal rencana selesai wajib diisi';
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

    if (this.props.formType === CourseHospital1ScheduleForm.ADD_FORM) {
      axios.post(COURSES_URL,
        this.state.course)
      .then((response) => {
        this.props.onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.put(`${COURSES_URL}/${this.props.course.id}`,
        this.state.course)
      .then((response) => {
        this.props.onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  render() {

    let cancelButton = <div />;

    if (this.props.showCancel) {
      cancelButton = (
        <Button type="button" onClick={this.props.onCancel}>
          Cancel
        </Button>
      );
    }

    return (
      <Panel header="Jadwal Rumah Sakit">
        <form onSubmit={this.handleSubmit}>

          <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
            <Tab eventKey={1} title="Jadwal Rumah Sakit 1" style={{ padding: 10 }}>
              <Row>
                <Col xs={6} md={6}>
                  <FormGroup controlId={'planStartDate'} validationState={this.state.validation.planStartDate.state}>
                    <ControlLabel>Tanggal Rencana Mulai</ControlLabel>
                    <DatePicker
                      name="planStartDate"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planStartDate}
                      onChange={this.handleDateInputChange}
                    />
                    <HelpBlock>{this.state.validation.planStartDate.message}</HelpBlock>
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
                <Col xs={6} md={6}>
                  <FormGroup controlId={'planEndDate'} validationState={this.state.validation.planEndDate.state}>
                    <ControlLabel>Tanggal Rencana Selesai</ControlLabel>
                    <DatePicker
                      name="planEndDate"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.planEndDate}
                      onChange={this.handleDateInputChange}
                    />
                    <HelpBlock>{this.state.validation.planEndDate.message}</HelpBlock>
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <FormGroup controlId={'realStartDate'}>
                    <ControlLabel>Tanggal Realisasi Mulai</ControlLabel>
                    <DatePicker
                      name="realStartDate"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realStartDate}
                      onChange={this.handleDateInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={6} md={6}>
                  <FormGroup controlId={'realEndDate'}>
                    <ControlLabel>Tanggal Realisasi Selesai</ControlLabel>
                    <DatePicker
                      name="realEndDate"
                      dateFormat="DD/MM/YYYY"
                      value={this.state.course.realEndDate}
                      onChange={this.handleDateInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey={2} title="Jadwal Puskesmas">Tab 2 content</Tab>
            <Tab eventKey={3} title="Jadwal Rumah Sakit 1">Tab 3 content</Tab>
          </Tabs>

          <Button type="submit" bsStyle="primary">
            Save
          </Button>
          { ' ' }
          {cancelButton}
        </form>
      </Panel>
    );
  }
}

CourseHospital1ScheduleForm.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.integer,
  }).isRequired,
  onSaveSuccess: PropTypes.shape({}).isRequired,
  onCancel: PropTypes.shape({}).isRequired,
  formType: PropTypes.string.isRequired,
  showCancel: PropTypes.bool.isRequired,
};

export default CourseHospital1ScheduleForm;
