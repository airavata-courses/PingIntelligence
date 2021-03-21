import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Modal, Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "./all_albums_dropdown";
import CreateAlbum from "./create_album";
import FilesUploadComponent from "./file_upload";
import axios from "axios";

export class UploadPhotosModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: [],
      iscreated: false,
      photoname: "",
      sharedusers: [],
      albumname: "",
      imgCollection: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectedddvalue = this.selectedddvalue.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    // this.saveFiles = this.saveFiles.bind(this);
    // this.createalbum = this.createalbum.bind(this);
  }

  //   saveFiles = (uploadedfiles) => {
  //     console.log("uploadedfiles" + uploadedfiles);
  //     this.setState({ files: uploadedfiles });
  //   };

  handleClose = () => {
    this.setState({ open: false });
    window.location.reload();
  };

  componentDidMount = () => {
    this.setState({ open: this.props.show });
  };

  handleSubmit = () => {
    const formData = new FormData();
    const len = this.state.imgCollection.length
    console.log("len" + len)
    console.log(this.state.imgCollection)
    for (const key of Object.keys(this.state.imgCollection)) {
        formData.append('files', this.state.imgCollection[key])
    }
    console.log("inside form submit" + this.state.albumname)
    const photo = this.state.photoname.split(",")
    let i = 0;
    // for(i; i < len ; i++){
        console.log(this.state.imgCollection[i])
        console.log(this.props.albumname)
        formData.append("albumname", this.props.albumname);
        formData.append("sharedusers", this.state.sharedusers);
        formData.append("photoname", this.state.photoname);
        // console.log(photo[i])
        // formData.append("files", this.state.imgCollection[i]);
    
        var targetUrl = "http://localhost:3001/uploadalbumphotos";
        const requestOption_s = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        };
        axios.post(targetUrl, formData, requestOption_s)
        .then(async (res) => console.log(await res.body))
        .then((result) => {
            // console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
      
    // }
  };

  onFileChange = (e) => {
    // console.log(e.target.files)
    this.setState({

      imgCollection: e.target.files,
    });
    // console.log(this.state.imgCollection[0])
  };

  readUserNames = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  //   createalbum = () => {
  //     //   this.state({iscreated : true})
  //     <CreateAlbum />
  //   }

  selectedddvalue = (album) => {
    this.setState({ albumname: album });
  };

  render() {
    console.log("here" + this.state.albumname)

    return (
      <div>
        {this.state.open === true ? (
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Upload Photos</Modal.Title>
            </Modal.Header>

            {/* <Modal.Body>
              <Dropdown
                username={this.props.user}
                dropdownvalue={this.selectedddvalue}
              />
            </Modal.Body> */}
            <Modal.Body>
              <div>
                {/* <input
                  className="sharedusers"
                  type="text"
                  name="sharedusers"
                  placeholder="tag your images,"
                  value={this.state.sharedusers}
                  onChange={this.readUserNames}
                /> */}
              </div>
            </Modal.Body>
            <Modal.Body>
              <div>
                <input
                  className="photoname"
                  type="text"
                  name="photoname"
                  placeholder="photoname1,"
                  value={this.state.photoname}
                  onChange={this.readUserNames}
                />
              </div>
            </Modal.Body>
            <Modal.Body>
              <div>
                <div className="form-group1" style={{ marginLeft: "40%" }}>
                  <input
                    type="file"
                    name="files"
                    id="files"
                    onChange={this.onFileChange}
                    multiple
                  />
                </div>
              </div>
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
