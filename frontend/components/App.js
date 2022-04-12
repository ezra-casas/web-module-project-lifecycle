import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    errorMessage: '',
    successMessage: '',
    toDoInput: '',
    displayCompleted: true,
  }



  //GET all todos from the server
  getTodo = () => {
    axios.get(URL)
      .then(res => {
        console.log('GET REQUEST success', res)
        this.setState({ ...this.state,
                        todos: res.data.data,
                        successMessage: res.message})
      })
      .catch(err => {
        this.setState({ ...this.state,
                       errorMessage:err.response.data.message})
      })
      .finally(() => {})
  }

  //will run after first render
  componentDidMount() {
    //fetch todos from server
    this.getTodo()
  }

    // Track value of input box
  changeInput = evt => {
    const  { value } = evt.target
    this.setState({ ...this.state, toDoInput: value})
  }

  resetForm = () => this.setState({ ...this.state, toDoInput: ''})
 
  setAxiosError = err => this.setState({ ...this.state, errorMessage: err.response.data.message})
 
  postNewTodo = () => {
    axios.post(URL, { name: this.state.toDoInput })
      .then(res => {
        this.setState({ ...this.state, 
                      todos: this.state.todos.concat(res.data.data) })
        // clear the state
        this.resetForm()
      })
      .catch(
        this.setAxiosError
      )
  }

  //POST new todo on the server
  addTodo = evt => {
    //preventing entire page from refreshing when we hit submit
    evt.preventDefault();
    this.postNewTodo()
  }
  //make a network request, tweak state, update using patch
  toggleComplete = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        //change to state without calling server
        this.setState({ ...this.state,
                      todos: this.state.todos.map(
                        todo => {
                          //debugger
                          if (todo.id !== id) return todo
                          return res.data.data
                        }
                      )})
      })
      .catch(this.setAxiosError)
  }

  toggleDisplay = () => {
    this.setState({ ...this.state,
                  displayCompleted: !this.state.displayCompleted})
  }

  render() {
    const { todos, form } = this.state
    const { values } = this.props
    console.log('values', values)
    return (
      <div>
        <div id="error">Error: {this.state.errorMessage}</div>
        <TodoList
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleComplete={this.toggleComplete}  
        />
        <Form 
          addTodo={this.addTodo}
          toDoInput={this.state.toDoInput}
          changeInput={this.changeInput}
          toggleDisplay={this.toggleDisplay}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}

