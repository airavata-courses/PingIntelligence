import React, { Component } from 'react';
import axios from 'axios';

export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgCollection: [],
        }
        this.onFileChange = this.onFileChange.bind(this);

    }

    // componentDidMount = () => {
    //     this.onFileChange(e);
    // }

    onFileChange = (e) => {
        this.setState({ imgCollection: this.state.imgCollection.push(e.target.files)[0] })
    }

    render() {
        return (
            // <div className="container">
            //     <div className="row">
                    // <form onSubmit={this.onSubmit}>
                        <div className="form-group" style={{marginLeft:'40%'}}>
                            <input type="file" name="imgCollection" onChange={this.onFileChange} onClick={() => this.props.uploadedfiles(this.state.imgCollection[0])}   multiple />
                        </div>
                    // </form>
            //     </div>
            // </div>
        )
    }
}