import React from 'react';
import axios from 'axios';
import { Row, Col, Table, Panel, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';

class DeartmentEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentId: props.match.params.departmentId,
    };
  }

  componentDidMount() {
    axios.get(`/departments/edit/${this.state.departmentId}`)
    .then((response) => {
      this.setState({
        department: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    let form = <div>Loading Data</div>;

    if (this.state.department) {
      form = (
        <Row>
          <Col xs={12} md={8}>
            <Panel header="Edit Bagian" style={{ marginTop: 0 }}>
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
                { ' ' }
                <Button type="submit" href="#/departments">
                  Cancel
                </Button>
              </form>
            </Panel>
          </Col>
        </Row>
      )
    }

    return (form);
  }
}

export default DeartmentEdit;
