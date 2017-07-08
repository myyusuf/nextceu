import React from 'react';
import axios from 'axios';
import { Row, Col, Modal, Panel, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

const COURSES_URL = '/api/courses';

class CourseInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      validation: {
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
        title: {
          state: null,
          message: '',
        },
        status: true,
      };

    if (!course.title) {
      result.title.state = 'error';
      result.title.message = 'Judul wajib diisi';
      result.status = false;
    } else if (course.title.length < 3) {
      result.title.state = 'error';
      result.title.message = 'Minimum panjang judul adalah tiga karakter';
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

    const course = this.state.course;
    const theObject = this;
    // course.updateType = 'INFO';

    axios.put(`${COURSES_URL}/${this.state.course.id}`,
      this.state.course)
    .then((response) => {
      console.log(response);
      console.log(theObject.props);
      theObject.props.onSaveSuccess(this.state.course);
      alert('Info saved');
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
            <Row>
              <Col md={6}>
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
          </form>
        </Col>
      </Row>
    );
  }
}

export default CourseInfo;
