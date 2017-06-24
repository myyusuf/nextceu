import React from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

class Course extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/students')
    .then((response) => {
      this.setState({
        students: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <ListGroup>
            <ListGroupItem header="Heading 1">Some body text</ListGroupItem>
            <ListGroupItem header="Heading 2" href="#">Linked item</ListGroupItem>
            <ListGroupItem header="Heading 3" bsStyle="danger">Danger styling</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Course;
