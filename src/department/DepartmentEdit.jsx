import React from 'react';
import axios from 'axios';
import { Row, Col, Modal, Panel, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

class DeartmentEdit extends React.Component {

  constructor(props) {
    super(props);

    let departmentId = null;
    let department = {};
    if (props.match.params.departmentId) {
      departmentId = props.match.params.departmentId;
      department = null;
    }

    this.state = {
      departmentId,
      department,
      showModal: false,
      color: '',
    };

    this.pickColor = this.pickColor.bind(this);
    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.departmentId) {
      axios.get(`/departments/edit/${this.state.departmentId}`)
      .then((response) => {
        this.setState({
          department: response.data,
          color: response.data.color,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
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

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.departmentId) {
      axios.put(`/departments/edit/${this.state.departmentId}`,
        this.state.department)
      .then((response) => {
        console.log(response);
        window.location.href = '#/departments';
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.post('/departments/add',
        this.state.department)
      .then((response) => {
        console.log(response);
        window.location.href = '#/departments';
      })
      .catch((error) => {
        console.log(error);
      });
    }

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
                  <Row>
                    <Col xs={12} md={4}>
                      <ControlLabel>Kode</ControlLabel>
                      <FormControl
                        type="text"
                        name="code"
                        value={this.state.department.code}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col xs={12} md={8}>
                      <ControlLabel>Nama</ControlLabel>
                      <FormControl
                        type="text"
                        name="name"
                        value={this.state.department.name}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup controlId={'3'}>
                  <Row>
                    <Col xs={8} md={4}>
                      <ControlLabel>Durasi (Minggu)</ControlLabel>
                      <FormControl
                        type="number"
                        name="duration"
                        value={this.state.department.duration}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup controlId={'4'}>
                  <Row>
                    <Col xs={8} md={4}>
                      <ControlLabel>Durasi RS 1</ControlLabel>
                      <FormControl
                        type="number"
                        name="duration1"
                        value={this.state.department.duration1}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col xs={8} md={4}>
                      <ControlLabel>Durasi RS 2</ControlLabel>
                      <FormControl
                        type="number"
                        name="duration2"
                        value={this.state.department.duration2}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                    <Col xs={8} md={4} >
                      <ControlLabel>Durasi Puskesmas</ControlLabel>
                      <FormControl
                        type="number"
                        name="duration3"
                        value={this.state.department.duration3}
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup controlId={'2'}>
                  <ControlLabel>Warna</ControlLabel>
                  <Row>
                    <Col xs={8} md={4} >
                      <FormControl
                        type="text"
                        name="color"
                        readOnly
                        style={{ backgroundColor: this.state.department.color }}
                      />
                    </Col>
                    <Col xs={8} md={4} style={{ paddingLeft: 0 }}>
                      <Button onClick={this.pickColor} bsStyle="info">
                        <i className="fa fa-eyedropper" />
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
