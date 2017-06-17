import React from 'react';
import axios from 'axios';
import { Row, Col, Table } from 'react-bootstrap';

class DeartmentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: {},
    };
  }

  render() {
    return (
      <Row>
        <Col xs={24} md={16}>
          <Table responsive>
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
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default DeartmentList;
