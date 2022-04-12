import React from 'react'

export default class Form extends React.Component { 
  onSubmit = evt => {
    evt.preventDefault()
    // console.log(evt)
    this.props.onSubmit()
  }

  //change input 
  onChange = evt => {
    const { value,id } = evt.target
    this.props.onChange(id, value)
  }
   

  render() {
    return (
    <>
      <form onSubmit={this.props.addTodo}>
        <input
          value={this.props.toDoInput}
          onChange={this.props.changeInput}
          type="text"
          id="addTodoInput"
          placeholder="Enter todo task"
        />
        <input type="submit"/>
      </form>
        <button onClick={this.props.toggleDisplay}>
          { this.props.displayCompleted ? "Hide": "Show" } 
          Completed
        </button>
    </>)
  }
}
