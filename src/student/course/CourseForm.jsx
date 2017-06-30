import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Panel, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import DepartmentSelect from '../../department/DepartmentSelect';

const COURSES_URL = '/api/courses';

class CourseForm extends React.Component {

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
        department: {
          state: null,
          message: '',
        },
        title: {
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
        department: {
          state: null,
          message: '',
        },
        title: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!course.department) {
      result.department.state = 'error';
      result.department.message = 'Stambuk lama wajib diisi.';
      result.status = false;
    } else if (course.department.length < 3) {
      result.department.state = 'error';
      result.department.message = 'Minimum panjang stambuk adalah tiga karakter';
      result.status = false;
    } else {
      result.department.state = 'success';
      result.department.message = '';
    }

    if (!course.title) {
      result.title.state = 'error';
      result.title.message = 'Stambuk wajib diisi';
      result.status = false;
    } else if (course.title.length < 3) {
      result.title.state = 'error';
      result.title.message = 'Minimum panjang stambuk adalah tiga karakter';
      result.status = false;
    } else {
      result.title.state = 'success';
      result.title.message = '';
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

    if (this.props.formType === CourseForm.ADD_FORM) {
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

    const department = this.state.course.department ? this.state.course.department : {};

    return (
      <Panel header="">
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={6} md={6}>
              <FormGroup controlId={'department'} validationState={this.state.validation.department.state}>
                <ControlLabel>Bagian</ControlLabel>
                <DepartmentSelect
                  name="department"
                  value={department.id}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.department.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
            <Col xs={6} md={6}>
              <FormGroup controlId={'title'} validationState={this.state.validation.title.state}>
                <ControlLabel>Judul</ControlLabel>
                <FormControl
                  type="text"
                  name="title"
                  value={this.state.course.title}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>{this.state.validation.title.message}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>
            </Col>
          </Row>
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

CourseForm.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.integer,
  }).isRequired,
  onSaveSuccess: PropTypes.shape({}).isRequired,
  onCancel: PropTypes.shape({}).isRequired,
  formType: PropTypes.string.isRequired,
  showCancel: PropTypes.bool.isRequired,
};

export default CourseForm;
