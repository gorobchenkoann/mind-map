import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import initialValue from './value.json';

export class TextEditor extends React.Component {
  state = {
      value: Value.fromJSON(initialValue),
  }

  onChange = ({ value }) => {
      this.setState({ value })
  }

  render() {
      return <Editor 
        className={this.props.className} 
        value={this.state.value} 
        onChange={this.onChange} 
        placeholder='Type something...'
    />
  }      
}