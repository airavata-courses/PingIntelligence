import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Modal, Button } from "react-bootstrap";
import "../home/dashboard.css";


export class ShareAlbumModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username : [],
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    this.setState({open : false})
    window.location.reload();
  };

  componentDidMount = () => {
    this.setState({open : this.props.show})
  }

  handleSubmit = () => {
    console.log(this.state.albumname)
    var targetUrl =
      "http://localhost:3001/sharealbum"
    const requestOption_s = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        albumname: this.props.albumname,
        usernames: this.state.username,
    }),

    };
    console.log(requestOption_s)

    fetch(targetUrl, requestOption_s).then(res => res.json())
      .then((result) => {
        // this.setState({ found: true });
        // this.setState({ data: result["albums"] });
        // console.log(result)
        window.location.reload()

      })
      .catch((err) => {
        // console.log(err);
      });
  };

  readUserNames = (ev) => {
    let users = [];
    users.push(ev.target.value)
    this.setState({username : users})
  }


  render() {
    console.log("hello modal");
    console.log(this.props.albumname)
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
              <Modal.Title>Share Album</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* <label className="username1" htmlFor="username">
                Username
              </label> */}
              <input
                className="username1"
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
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
