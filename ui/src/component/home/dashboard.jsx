import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./dashboard.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import viewoptions from "../../3dosts.PNG";
import ReactTable from "react-table";
import { Dropdown, Item } from "react-bootstrap";
import { Viewphotos } from "../photo/album_photos.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ShareAlbumModal } from "../photo/share_album.jsx";
import { Modal } from "react-bootstrap";
import { UploadPhotosModal } from "../upload/upload_photos.jsx";
import { CreateAlbumModal } from "../photo/create_album.jsx";
import { PhotoSearchModal } from "../photo/photo_search.jsx";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      albums: [],
      found: false,
      selectedrowid: "",
      openModal: false,
      uploadModal: false,
      createModal: false,
    };

    this.findAlbums = this.findAlbums.bind(this);
    this.optionFormatter = this.optionFormatter.bind(this);
    this.selectfirst = this.selectfirst.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.createAlbum = this.createAlbum.bind(this);
  }

  findAlbums = () => {
    var targetUrl = "http://localhost:3001/useralbums";
    const requestOption_s = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: window.localStorage.getItem("username"),
      }),
    };
    fetch(targetUrl, requestOption_s)
      .then(async (res) => {
        this.setState({ loggedIn: true });
        // console.log("user album list");
        // console.log(await res.json())
        const data = await res.json();
        // const newData = this.state.albums.concat([data]);
        console.log(data["albums"]);
        this.setState({ albums: data });
        this.setState({ found: true });
        // console.log(this.state.albums)
        // return this.state.albums
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  componentDidMount() {
    /*
            getting user details and token
    */
    const token = window.localStorage.getItem("photosquadtoken");
    // console.log(token);

    var targetUrl = "http://localhost:3001/verifyusertoken";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        secret: token,
      }),
    };
    fetch(targetUrl, requestOptions)
      .then(async (res) => {
        const data = await res.json();
        window.localStorage.setItem("username", data["username"]);
        this.findAlbums();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectfirst = () => {
    // e.preventDefault();
    // console.log(id)
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      console.log(row.albumname);
      this.setState({ selectedrowid: row.albumname });
    }
  };

  viewAlbumPhotos = () => {
    // console.log(this.state.sele)
    this.props.history.push({
      pathname: "/view-album-photos",
      state: { album: this.state.selectedrowid },
    });

    // <RouteWrapper exact path="/"> <Component myProp={38} /></RouteWrapper>
    // <Route path="/view-album-photos/:this.state.selectedrowid" handler={Viewphotos} />
    // <Route name="ideas" render={() => <Viewphotos album={this.state.selectedrowid} /> } />
  };

  viewShareModal = () => {
    this.setState({ openModal: true });
  };

  uploadPhotos = () => {
    this.setState({ uploadModal: true });
  };

  createAlbum = () => {
    this.setState({ createModal: true });
  };

  deleteAlbum = () => {
    var targetUrl = "http://localhost:3001/deletealbum";
    const requestOption_s = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        albumname: this.state.selectedrowid,
      }),
    };
    fetch(targetUrl, requestOption_s)
      .then(async (res) => {
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  searchPhoto = () => {
    this.props.history.push({
      pathname: "/find-album-photos"
      // state: { album: this.state.selectedrowid },
    });
  }

  optionFormatter(cell, row, rowIndex) {
    return (
      <Dropdown style={{right:"50%"}}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <button
            type="button"
            class="myButton1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i
              class="glyphicon glyphicon-option-vertical"
              aria-hidden="true"
            ></i>
          </button>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.viewAlbumPhotos()}>
            View
          </Dropdown.Item>
          <Dropdown.Item onClick={() => this.viewShareModal()}>
            Share
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">Download</Dropdown.Item>
          <Dropdown.Item onClick={() => this.deleteAlbum()} key={row.id}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    const { data } = this.state.albums;

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: this.handleOnSelect,
      style: { backgroundColor: "#c8e6c9" },
    };
    // console.log(this.state.found)
    // console.log("I am here" + this.state.albums)
    const columns = [
      {
        dataField: "albumname",
        text: "Album Name",
      },
      {
        dataField: "created_at",
        text: "Created on",
      },
      {
        dataField: "owner",
        text: "Owner",
      },
      {
        dataField: "sharedwith",
        text: "sharedwith",
      },
      {
        dataField: "options",
        text: "choose your options",
        formatter: this.optionFormatter,
      },
    ];

    return (
      <div>
        {/* <div class="photo"><PhotoSearchModal /></div> */}
        <h1>Home page</h1>
        <button class="myButton" onClick={this.uploadPhotos}>
          {" "}
          Upload Photos
        </button>
        <button class="myButton" onClick={this.createAlbum}>
          {" "}
          Create Album
        </button>
        <button class="myButton" onClick={this.searchPhoto}>
          {" "}
          Search Photos
        </button>
        {
          this.state.found === false ? (
            <div>hello</div>
          ) : (
            // (<div>{this.state.albums["albums"]}</div>)}
            // this.state.albums["albums"].map((i) =>

            <div className="tablealbums">
              <BootstrapTable
                hover
                keyField="albumname"
                data={this.state.albums["albums"]}
                columns={columns}
                selectRow={selectRow}
              />
            </div>
          )

          // )
        }
        {/* {console.log(this.state.openModal)} */}
        {this.state.openModal === true && (
          <ShareAlbumModal
            show={this.state.openModal}
            albumname={this.state.selectedrowid}
          />
        )}
        {this.state.uploadModal === true && (
          <UploadPhotosModal
            show={this.state.uploadModal}
            albumname={this.state.selectedrowid}
            user={window.localStorage.getItem("username")}
          />
        )}
        {this.state.createModal === true && (
          <CreateAlbumModal
            show={this.state.createModal}
            user={window.localStorage.getItem("username")}
          />
        )}
      </div>
    );
  }
}
