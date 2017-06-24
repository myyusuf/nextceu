import React from 'react';
import axios from 'axios';
import { Row, Col, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class StudentInfo extends React.Component {

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
          <Panel header="">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId={'1'}>
                <ControlLabel>Stambuk Lama</ControlLabel>
                <FormControl type="text" name="oldSid" onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup controlId={'2'}>
                <ControlLabel>Stambuk Baru</ControlLabel>
                <FormControl type="text" name="newSid" onChange={this.handleInputChange} />
              </FormGroup>

              <FormGroup controlId={'3'}>
                <ControlLabel>Nama</ControlLabel>
                <FormControl type="text" name="name" onChange={this.handleInputChange} />
              </FormGroup>

              <Button type="submit" bsStyle="primary">
                Save
              </Button>
            </form>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default StudentInfo;
