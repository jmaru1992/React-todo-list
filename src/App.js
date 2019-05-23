import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import Group from "./Components/Group"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleGlobalStatus = this.toggleGlobalStatus.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      sortedItems: [],
      groups: []
    };
  }


  // grab and parse api data
  componentDidMount() {
    return fetch('http://localhost:3000/data.json')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result,
          sortedItems: _.mapValues(_.groupBy(result, "group"), x => x.map(y => _.omit(y, "group") )),
          groups: Object.keys(_.mapValues(_.groupBy(result, "group"), x => x.map(y => _.omit(y, "group") )))
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
 }

 // will be used to toggle state of tasks
 toggleGlobalStatus(taskID, value) {
   let updated = this.state.items
   updated[taskID-1]["completedAt"] = value
   this.setState({items: updated})

   // updated sorted grops as well
   let group = updated[taskID-1]["group"]
   let sortedGroup = this.state.sortedItems[group]
   
   // search for the right task
   for(var index=0; index<sortedGroup.length; index++){
     if ( sortedGroup[index]["id"] == taskID ) {
        sortedGroup[index]["completedAt"] = value
     }
   }


   let tempSort = this.state.sortedItems
   tempSort[group] = sortedGroup
   this.setState({sortedItems: tempSort})
 }


  render() {
    const { error, isLoaded, items, sortedItems, groups } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      
      return (
        // render the groups
        <div id="todo-list">
        <h1 class="main-heading">To Do List</h1>
        <ul class="main-groups">
          {groups.map(group => (
            <li key={group}>
            <Group TaskGroup = {group} SortedTasks={sortedItems[group]}
                  allTasks={items}
                      toggleGlobalStatus={this.toggleGlobalStatus}/>
            </li>
          ))}
        </ul>
        </div>
      )
    }
  }
}
