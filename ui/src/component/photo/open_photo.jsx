import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Modal, Button } from "react-bootstrap";
import fs from "fs";
import { base64StringToBlob } from 'blob-util';
import "../home/dashboard.css";



export class Openphoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      previewSrc: "",
      prev:"",
    };
    // this.openPhotos = this.openPhotos.bind(this);
  }

  handleOpen = () => {
    this.state({ handleOpen: true });
  };

  blobToFile(theBlob, fileName) {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  }

  handleClose = () => {
    this.setState({openModal : false})
    window.location.reload();
  };

  componentDidMount = () => {
    this.setState({ openModal: this.props.show });
    var targetUrl = "http://localhost:3001/downloadimage";
    const requestOption_s = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: this.props.ids,
      }),
    };
    console.log(requestOption_s)
    fetch(targetUrl, requestOption_s, )
      .then(async (res) => {
        // console.log(await res.json())
        const data = await res.json()
        this.setState({ previewSrc: data})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        {this.state.openModal === true ? (
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Your Image</Modal.Title>
            </Modal.Header>
              {/* <a href={this.state.previewSrc}>open</a> */}
              <img src={'data:image/jpeg;base64,' + this.state.previewSrc} />

              <a href={'data:image/jpeg;base64,' + this.state.previewSrc} download>Download</a>
            <Modal.Body>
              
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
