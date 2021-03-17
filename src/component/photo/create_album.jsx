import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Modal, Button } from "react-bootstrap";
import "../home/dashboard.css";


export class CreateAlbumModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      albumname: "",
      description: "",
      sharedpriveledges: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readUserNames = this.readUserNames.bind(this);
  }

  handleClose = () => {
    this.setState({open : false})
    window.location.reload();
  };

  componentDidMount = () => {
    this.setState({open : this.props.show})
  }

  readUserNames (ev) {
    this.setState({
        [ev.target.name] : ev.target.value
    })
}

  handleSubmit = () => {
    console.log(this.state.albumname)
    var targetUrl =
      "http://localhost:3001/createalbum"
    const requestOption_s = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: this.state.albumname,
        description: this.state.description,
        sharedpriveledges: this.state.sharedpriveledges,
        owner: this.props.user,
    }),

    };

    fetch(targetUrl, requestOption_s).then(res => res.json())
      .then((result) => {
          window.location.reload();
      })
      .catch((err) => {
      });
  };

  render() {
    // console.log("hello modal");
    // console.log(this.state.albumname)
    // const bstyle = {
    //   backgroundColor: "green",
    //   textAlign: "left",
    //   paddingLeft: "0px",
    //   color: "white",
    // };
    // const { open } = this.state;
    return (
      <div>
        {this.state.open === true ? (
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Create Album</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* <label className="username1" htmlFor="username">
                Username
              </label> */}
              <input
                className="name"
                type="text"
                name="albumname"
                placeholder="albumname"
                value={this.state.albumname}
                onChange = {this.readUserNames}
              />
              <input
                className="name"
                type="text"
                name="description"
                placeholder="description"
                value={this.state.description}
                onChange = {this.readUserNames}
              />
              <input
                className="name"
                type="text"
                name="sharedpriveledges"
                placeholder="public/private"
                value={this.state.sharedpriveledges}
                onChange = {this.readUserNames}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleSubmit}>
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        ) : null}
      </div>
    );
  }
}
