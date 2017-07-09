import React from 'react';
import axios from 'axios';
import { Row, Col, Table, Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

const COURSES_URL = '/api/courses';

class CourseProblemList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      problems: [],
    };
    this.loadData = this.loadData.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course: nextProps.course,
    });
  }

  loadData() {
    const courseId = this.state.course.id;
    axios.get(`${COURSES_URL}/${courseId}/problems`)
    .then((response) => {
      this.setState({
        problems: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  searchChange(event) {
    const searchText = event.target.value;
    this.setState({
      searchText,
    });
  }

  confirmDelete(problem) {
    const result = confirm(`Anda akan menghapus masalah : ${problem.title}?`);
    if (result) {
      axios.delete(`${COURSES_URL}/${problem.id}`)
      .then((response) => {
        console.log(response);
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  render() {
    const problemComponents = [];
    for (let i = 0; i < this.state.problems.length; i += 1) {
      const problem = this.state.problems[i];
      problemComponents.push(
        <tr key={problem.id}>
          <td>{ i + 1 }</td>
          <td>{problem.title}</td>
          <td>{problem.description}</td>
          <td><div style={{ width: 35, height: 35, borderRadius: '50%', backgroundColor: problem.color }} /></td>
          <td>
            <Button
              bsStyle="default" style={{ marginRight: 5 }} bsSize="small"
              href={`#/problems_edit/${problem.id}`}
            >
              <i className="fa fa-edit" />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={() => this.confirmDelete(problem)}>
              <i className="fa fa-remove" />
            </Button>
          </td>
        </tr>
      );
    }
    const title = (
      <Form inline className="text-right">
        <button
          type="button"
          className="btn btn-labeled btn-success ripple"
          style={{ }}
          onClick={this.showStudentAddWindow}
        >
          Masalah
          <span className="btn-label btn-label-right">
            <i className="ion-plus-round" />
          </span>
        </button>
      </Form>
    );
    return (
      <Row>
        <Col xs={24} md={16} style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
          <Panel header={title} style={{ marginTop: 0 }}>
            <Table responsive fill>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Judul</th>
                  <th>Deskripsi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {problemComponents}
              </tbody>
            </Table>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default CourseProblemList;
