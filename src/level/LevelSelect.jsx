import React from 'react';
import { FormControl } from 'react-bootstrap';

class Level extends React.Component {

  render() {
    return (
      <FormControl
        componentClass="select"
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <option value="">Pilih Tingkat</option>
        <option value="1">Tingkat 1</option>
        <option value="2">Tingkat 2</option>
      </FormControl>
    );
  }
}

export default Level;
