import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  constructor(){
    super();

    this.buttons = [
      {name: 'all', label: 'All'},
      {name: 'active', label: 'Active'},
      {name: 'done', label: 'Done'}
    ]

  }

  render() {

    const { filter, changeFilter } = this.props;

    const buttons = this.buttons.map(({name, label})=>{
      const isActive = filter === name;
      const classNames = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button type="button"
                key={name}
                className={`btn ${classNames}`}
                onClick={()=>{changeFilter(name)}}>
          { label }
        </button>
      )
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}
