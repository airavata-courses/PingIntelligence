import React, { Component} from 'react'
import ToDoDataService from '../../api/todo/ToDoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodoComponent extends Component{
    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            todos: [],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        ToDoDataService.retrieveAllTodos(username)
            .then(response => {
                this.setState({todos: response.data})
            })
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        ToDoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message: `Delete of todo ${id} successful`})
                    this.refreshTodos()
                }
            )
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${this.state.id}`)
    }

    render() {
        console.log('render')
        return (
            <div> 
                <h1>Upload-N-Browse</h1> 
                {this.state.message && <div className = 'alert alert-success'>{this.state.message}</div>}
                <div className = "container">
                    <table className = "table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>IsCompleted?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => 
                                    <tr key = {todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button className = "btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className = "btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            }   
                        </tbody>
                    </table>
                    <div className = "row">
                            <button className = "btn btn-success" onClick = {this.addTodoClicked}>Upload</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodoComponent