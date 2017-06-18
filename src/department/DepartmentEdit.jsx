import React from 'react';
import axios from 'axios';
import { Row, Col, Modal, Panel, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

class DeartmentEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentId: props.match.params.departmentId,
      showModal: false,
      color: '',
    };

    this.pickColor = this.pickColor.bind(this);
    this.close = this.close.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const department = this.state.department;
    department[name] = value;
    this.setState({
      department,
    });
  }

  pickColor() {
    this.setState({
      showModal: true,
    });
  }

  close() {
    this.setState({
      showModal: false,
    });
  }

  handleColorChange(color) {
    const department = this.state.department;
    department.color = color.hex;
    this.setState({
      department,
      color: color.hex,
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
                  <FormControl
                    type="text"
                    name="oldSid"
                    value={this.state.department.oldSid}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup controlId={'2'}>
                  <ControlLabel>Stambuk Baru</ControlLabel>
                  <FormControl
                    type="text"
                    name="newSid"
                    value={this.state.department.newSid}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup controlId={'3'}>
                  <ControlLabel>Kode</ControlLabel>
                  <FormControl
                    type="text"
                    name="code"
                    value={this.state.department.code}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup controlId={'4'}>
                  <ControlLabel>Nama</ControlLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.department.name}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <FormGroup controlId={'5'}>
                  <ControlLabel>Warna</ControlLabel>
                  <Row>
                    <Col xs={5} md={3} style={{ paddingRight: 0 }}>
                      <FormControl
                        type="text"
                        name="color"
                        readOnly
                        style={{ backgroundColor: this.state.department.color }}
                      />
                    </Col>
                    <Col xs={6} md={4} style={{ paddingLeft: 5 }}>
                      <Button onClick={this.pickColor}>
                        Pick
                      </Button>
                    </Col>
                  </Row>
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

          <Modal show={this.state.showModal} onHide={this.close} dialogClassName="custom-modal">
            <Modal.Body>
              <SketchPicker
                color={this.state.color}
                onChangeComplete={this.handleColorChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Row>
      );
    }

    return (form);
  }
}

export default DeartmentEdit;
