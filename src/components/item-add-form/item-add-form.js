import React, { Component } from 'react';
import './item-add-form.css';


export default class ItemAddForm extends Component {

  constructor() {
    super();
    
    this.state = {
      label: ''
    };

    this.onLabelChange = (e) => {
      this.setState({
          label: e.target.value
        });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.onItemAdded(this.state.label);

      this.setState({
        label: ''
      });
    }
  } 
  
  render(){

    return (
      <form className="bottom-panel d-flex"
            onSubmit={this.onSubmit}>
        <input type="text"
               className="form-control new-todo-label"
               placeholder="What needs to be done?"
               onChange={this.onLabelChange}
               value={this.state.label}/>
        <button type="submit"
                className="btn btn-outline-secondary">
          Add
        </button>
      </form>
    )
  }
}



