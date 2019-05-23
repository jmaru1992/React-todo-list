import React, { Component } from 'react'
import Task from "./Task"

export default class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false
        };
      }

findCompleted() {
  var counter = 0;
  let tasks = this.props.SortedTasks
  let len = this.props.SortedTasks.length

  for(var index=0; index<len; index++) {
    if (tasks[index]["completedAt"]) {
      counter++;
    }
  }
  return counter;
}

  render() {
    // hide sub tasks
    const { showing } = this.state;
    const totalTasks = this.props.SortedTasks.length
    let completedTasks = this.findCompleted()
    // check which tasks should be locked
    const tasks = this.props.SortedTasks.map(task => {
        let dependencies = this.props.allTasks.filter(taskItem => {
          return task.dependencyIds.includes(taskItem.id);
        })
        let isLocked = false;
        dependencies.forEach(dependency => {
          if (!dependency.completedAt) {
            isLocked = true;
            if (task.completedAt) {
              task.completedAt = false;
              this.props.toggleGlobalStatus(task.id,false);
            }
          }
        })
        return (
          <Task task={task} isLocked={isLocked} toggleGlobalStatus={this.props.toggleGlobalStatus}/>
        )
      })
    return (
      <div>
        <ul>
          {/* show all tasks and toggle tasks between showing or hiding */}
            <hr class="group-line"/>
            <div id={this.props.TaskGroup}>
                <img className="group-arrow" src="group.svg"/>
                <h4 class="group-heading" onClick={() => this.setState({ showing: !showing })}>{this.props.TaskGroup}</h4>
                    { showing 
                        ? <ul class="tasks">
                            {tasks}
                        </ul>
                        : <p className="group-caption">
                          {completedTasks} of {totalTasks} tasks completed
                        </p>
                    }
            </div>
            <hr class="group-line"/>
        </ul>
      </div>
    )
  }
}
