import React, { Component} from 'react'
import ToDoDataService from '../../api/todo/ToDoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class FilterComponent extends Component{
    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            todos: [],
            message: null
        }

        this.refreshTodos = this.refreshTodos.bind(this)
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

    render() {
        console.log('render')
        return (
            <div> 
                <h1>Filter Images</h1> 
                <div className = "container">
                    <table className = "table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>IsCompleted?</th>
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
                                    </tr>
                                )
                            }   
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default FilterComponent