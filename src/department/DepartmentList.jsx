import React from 'react';
import axios from 'axios';
import { Row, Col, Table, Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

class DeartmentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departments: [],
    };
  }

  componentDidMount() {
    axios.get('/departments')
    .then((response) => {
      this.setState({
        departments: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const departmentComponents = [];
    for (let i = 0; i < this.state.departments.length; i += 1) {
      const department = this.state.departments[i];
      departmentComponents.push(
        <tr>
          <td>{ i + 1 }</td>
          <td>{department.code}</td>
          <td>{department.name}</td>
          <td>{department.color}</td>
          <td>{department.duration}</td>
          <td>
            <Button
              bsStyle="default" style={{ marginRight: 5 }} bsSize="small"
              href={`#/departments_edit/${department.id}`}
            >
              <i className="fa fa-edit" />
            </Button>
            <Button bsStyle="danger" bsSize="small">
              <i className="fa fa-remove" />
            </Button>
          </td>
        </tr>
      );
    }
    const title = (
      <Form inline>
        <FormGroup controlId="formInlineEmail">
          <FormControl type="text" placeholder="Code or Name" />
        </FormGroup>
        {' '}
        <Button>
          <i className="fa fa-search" />
        </Button>
        {' '}
        <Button bsStyle="success">
          <i className="fa fa-plus" />
        </Button>
      </Form>
    );
    return (
      <Row>
        <Col xs={24} md={16}>
          <Panel header={title} style={{ marginTop: 0 }}>
            <Table responsive fill>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Nama</th>
                  <th>Durasi</th>
                  <th>Warna</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {departmentComponents}
              </tbody>
            </Table>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default DeartmentList;
