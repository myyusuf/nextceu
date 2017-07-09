
import React from 'react';
import axios from 'axios';
import { Row, Col, FormGroup, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

const COURSES_URL = '/api/courses';

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
    const score = course.Score;
    score[name] = value;

    this.setState({
      course,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const score = this.state.course.Score;
    score.editType = 'SCORE';

    axios.put(`${COURSES_URL}/${this.state.course.id}`,
      score)
    .then((response) => {
      console.log(response);
      if (this.props.onSaveSuccess) {
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
                <FormGroup controlId={'preTest'}>
                  <ControlLabel>Pre-Test</ControlLabel>
                  <FormControl
                    type="number"
                    step=".1"
                    name="preTest"
                    value={score.preTest}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup controlId={'research'}>
                  <ControlLabel>Tugas Ilmiah</ControlLabel>
                  <FormControl
                    type="number"
                    step=".1"
                    name="research"
                    value={score.research}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup controlId={'weeklyDiscussion'}>
                  <ControlLabel>Diskusi Mingguan</ControlLabel>
                  <FormControl
                    type="number"
                    step=".1"
                    name="weeklyDiscussion"
                    value={score.weeklyDiscussion}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup controlId={'test'}>
                  <ControlLabel>Nilai Ujian</ControlLabel>
                  <FormControl
                    type="number"
                    step=".1"
                    name="test"
                    value={score.test}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup controlId={'postTest'}>
                  <ControlLabel>Post-Test</ControlLabel>
                  <FormControl
                    type="number"
                    step=".1"
                    name="postTest"
                    value={score.postTest}
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
