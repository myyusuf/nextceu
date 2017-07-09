
import React from 'react';
import axios from 'axios';
import { Row, Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const COURSES_URL = '/api/courses';

class CourseSeminar extends React.Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      course: props.course,
      seminars: [],
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
    let componentToRender = (
      <Panel>
        No seminar found
      </Panel>
    );
    const seminars = this.state.seminars;
    const seminarItems = [];
    if (seminars.length > 0) {
      for (let i = 0; i < seminars.length; i += 1) {
        const seminar = seminars[i];
        seminarItems.push(<ListGroupItem>{seminar.name} on {seminar.date}</ListGroupItem>);
      }
      componentToRender = (
        <ListGroup>
          {seminarItems}
        </ListGroup>
      );
    }
    return (
      <Row>
        <Col md={12} style={{ paddingTop: 10 }}>
          {componentToRender}
        </Col>
      </Row>
    );
  }
}

export default CourseSeminar;
