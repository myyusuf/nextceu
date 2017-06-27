import React from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';

const DEPARTMENTS_URL = '/api/departments';

class DepartmentSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departments: [],
    }
  }

  componentDidMount() {
    axios.get(`${DEPARTMENTS_URL}`)
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
    const optionsEl = [];
    optionsEl.push(<option value="" key={-1}>Pilih Bagian</option>);
    for (let i = 0; i < this.state.departments.length; i += 1) {
      const department = this.state.departments[i];
      optionsEl.push(<option key={i} value={department.id}>{department.name}</option>);
    }

    return (
      <FormControl
        componentClass="select"
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {optionsEl}
      </FormControl>
    );
  }
}

export default DepartmentSelect;
