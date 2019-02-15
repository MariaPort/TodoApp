import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

import './app.css'

export default class App extends Component {

  constructor() {
    super();

    this.maxId = 100;

    this.createTodoItem = (label) => {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    };

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ],
      term: '',
      filter: 'all' //all, active, done
    };


    this.onDeleteItem = (id) => {
      this.setState(({todoData}) => {

        const newData = todoData.filter((item) => item.id !== id);

        return {
          todoData: newData
        };
      });
    };

    this.addItem = (text) => {
      const newItem = this.createTodoItem(text);

      this.setState(({todoData}) => {
        const newData = [...todoData, newItem];

        return {
          todoData: newData
        };
      });
    };

    this.toggleProperty = (arr, id, propName) => {

      const idx = arr.findIndex((item) => item.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]}; //copy all properties from 'old' object except one

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
    };

    this.onToggleImportant = (id) => {
      this.setState(({todoData}) => {

        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        }
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({todoData}) => {

        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        }
      });
    };

    this.searchItem = (items, term) => {

      if (term.length === 0) {
        return items
      }

      return items.filter((item) => {
        const regex = new RegExp(term, 'gi');
        return item.label.match(regex);
      });

    };

    this.changeTerm = (term) => {
      this.setState({ term });
    };

    this.filterItems = (items, filter) => {
      switch (filter) {
        case 'all':
          return items;
        case 'active':
          return items.filter((item)=> !item.done);
        case 'done':
          return items.filter((item)=> item.done);
        default :
          return items
      }
    };

    this.changeFilter = (filter) => {
      this.setState({ filter });
    };
  }

  render () {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filterItems(this.searchItem(todoData, term), filter);

    const doneCount = todoData.filter((item) => item.done).length;
    const leftTodoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo = {leftTodoCount} done = {doneCount}/>
        <SearchPanel changeTerm = {this.changeTerm}
                     changeFilter={this.changeFilter}
                     filter={this.state.filter} />
        <TodoList
          todos={ visibleItems }
          onDeleted = {(id) => { this.onDeleteItem(id)}}
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone}/>
      <ItemAddForm onItemAdded = {this.addItem}/>
      </div>
    );
  };
}
