import React, { Component } from 'react'

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.ToggleTaskStatus = this.ToggleTaskStatus.bind(this);
      }

      // set task to complete or not and update global state
    ToggleTaskStatus() {
        if (this.props.task.completedAt != true) {
            this.props.task.completedAt = true;
            this.props.toggleGlobalStatus(this.props.task.id,true);
        }
        else {
            this.props.task.completedAt = false;
            this.props.toggleGlobalStatus(this.props.task.id,false);
        }
        this.forceUpdate();

    }

  render() {
      // render task with correct checkbox image
    const status = this.props.task.completedAt;
    let checkbox = status ?
        <img className="complete-task" src="completed.svg" onClick={this.ToggleTaskStatus}/> :
        <img className="unchecked-task" src="incomplete.svg" onClick={this.ToggleTaskStatus} />;
    if (this.props.isLocked) {
        checkbox = <img className="locked-task" src="locked.svg" />
    }
    return (
        <div>
            {checkbox}
            {this.props.task.task}
        </div>
    )
  }
}
