import React from 'react';

class DropDown extends React.Component {
    constructor(){
        super();
        this.state = {
            options: [],
            albo : "",
        }  
        this.fetchOptions = this.fetchOptions.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        this.fetchOptions()
    }

    handleChange (ev) {
        this.setState({ albo: ev.target.value });
        console.log("this.state.albo" + this.state.albo)
    }


    fetchOptions(){
        var targetUrl = "http://localhost:3001/useralbums"
        const requestOption_s = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              username: this.props.username
          })}
        fetch(targetUrl, requestOption_s)
            .then(async (res) => {
                return await res.json();
            }).then((json) => {                
                const values = json;
                this.setState({options: values.albums})
            });
    }
    render(){
        return <div className="drop-down">
            <p>Select from your existing albums</p>
            <select  value={this.state.albo} onChange={this.handleChange} onClick={() => this.props.dropdownvalue(this.state.albo)}>
                { this.state.options.map((option, key) => 
                    <option key={key.albumname} >{option.albumname}</option>) }
            </select>
            </div>;
    }
}

export default DropDown;

// onChange={() => this.props.dropdownvalue(this.state.albo)}