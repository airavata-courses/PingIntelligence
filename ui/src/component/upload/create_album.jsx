import React from "react";

class CreateAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      sharedpriveledges: "",
      owner: "",
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({show : this.props.isCreated})
  }

  handleChange (ev) {
    this.setState({
        [ev.target.name] : ev.target.value
    })
}

  fetchOptions() {
    var targetUrl = "http://localhost:3001/useralbums";
    const requestOption_s = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: this.props.username,
      }),
    };
    fetch(targetUrl, requestOption_s)
      .then(async (res) => {
        // console.log(await res.json())
        return await res.json();
      })
      .then((json) => {
        console.log(json);

        const values = json;
        this.setState({ options: values.albums });
        // console.log(values);
      });
  }

  render() {
    return (
        <div>
        {this.state.show === true ? 
        <div>
        <p>Create Album</p>
        <input
          className="name"
          type="text"
          name="name"
          placeholder="albumname"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
        ></input>

        <label className="description" htmlFor="description">
          description
        </label>
        <input
          className="description"
          type="description"
          name="description"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleChange.bind(this)}
        ></input>

        <label className="sharedpriveledges" htmlFor="description">
        sharedpriveledges
        </label>
        <input
          className="sharedpriveledges"
          type="sharedpriveledges"
          name="sharedpriveledges"
          placeholder="sharedpriveledges"
          value={this.state.sharedpriveledges}
          onChange={this.handleChange.bind(this)}
        ></input>
      </div>: null }
      
        
      </div>
    );
  }
}

export default CreateAlbum;
