import React, { Component} from 'react'
import HelloWorldService from '../../api/ImageBrowse/HelloWorldService.js'

class WelcomeComponent extends Component{

    constructor(props)
    {
        super(props)

        this.state = {
            welcomeMessage: ''
        }
    }

    render() {
        return (
            <>
                <div className = "container"> 
                    Welcome {this.props.match.params.name}! 
                </div>
            </>
        )        
    }
}


export default WelcomeComponent