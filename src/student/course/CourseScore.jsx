
import React from 'react';
import axios from 'axios';
import { Row, Col, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

class CourseScore extends React.Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      course: props.course,
    };
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

    this.setState({
      course,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.put(`${COURSES_URL}/${this.state.course.id}`,
      this.state.course)
    .then((response) => {
      console.log(response);
      if (props.onSaveSuccess) {
        this.props.onSaveSuccess(this.state.course);
      }
      alert('Info saved');
    })
    .catch((error) => {
      alert('Error on saved');
      console.log(error);
    });
  }

  render() {
    const score = this.state.course.Score || {};
    return (
      <Row>
        <Col md={12}>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup controlId={'title'}>
                  <ControlLabel>Pre-Test</ControlLabel>
                  <FormControl
                    type="number"
                    name="preTest"
                    value={score.preTest}
                    onChange={this.handleInputChange}
                  />
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

export default CourseScore;
