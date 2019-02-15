import React, { Component } from 'react';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import './search-panel.css'

export default class SearchPanel extends Component {
  constructor(){
    super();

    this.state = {
      term: ''
    };

    this.searchValueChange = (e) => {
      const term = e.target.value
      this.setState({ term });

      this.props.changeTerm(term);
    };
  }

  render(){
    return (
      <div className="search-panel">
        <input className="form-control search-input"
               placeholder="search"
               value={this.state.term}
               onChange={this.searchValueChange}/>
        <ItemStatusFilter changeFilter={this.props.changeFilter}
                          filter={this.props.filter}/>
      </div>
    );
  }
};

