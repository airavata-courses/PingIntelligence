import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import ToDoDataService from '../../api/todo/ToDoDataService.js'
import AuthenticationService from './AuthenticationService.js'


class ImageComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
                        id: this.state.id,
                        description: values.description,
                        targetDate: values.targetDate
                   }

        if(this.state.id === -1)
        {
            ToDoDataService.createTodo(username, todo).then(() => this.props.history.push('/todos'))
        }
        else{
            ToDoDataService.updateTodo(username, this.state.id, todo).then(() => this.props.history.push('/todos'))
        }        
    }

    componentDidMount() {
        if(this.state.id === -1)
            return

        let username = AuthenticationService.getLoggedInUserName()
        ToDoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                }))
    }


    validate(values) {
        let errors = {}
        if(!values.description)
            errors.description = 'Enter a Description'
        else if(values.description.length < 5)
            errors.description = 'Enter atleast 5 characters in Description'
        
        if(!moment(values.targetDate).isValid())
            errors.targetDate = 'Enter a valid Target Date'

        return errors
    }

    render () {
        let {description, targetDate} = this.state

        return (
            <div>
                <h1> Image </h1>
                <div className = "container">
                    <Formik 
                        initialValues={{description: description, targetDate: targetDate}}
                        onSubmit = {this.onSubmit}
                        validateOnChange = {false}
                        validateOnBlur = {false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                    <Form>
                                        <ErrorMessage name="description" component = "div" 
                                                        className = "alert alert-warning"/> 
                                        <ErrorMessage name="targetDate  " component = "div" 
                                                        className = "alert alert-warning"/> 
                                        <fieldset className = "form-group">
                                            <label>Description</label>
                                            <Field className = "form-control" type="text" name="description"/>
                                        </fieldset>
                                        <fieldset className = "form-group">
                                            <label>Target Date</label>
                                            <Field className = "form-control" type="date" name="targetDate"/>
                                        </fieldset>
                                        <button type = "submit" className = "btn btn-success">Save</button>
                                    </Form>
                                )
                        }
                    </Formik>
                </div>                
            </div>
        )
    }
}

export default ImageComponent