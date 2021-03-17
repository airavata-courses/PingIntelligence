import React from "react";
import { Dropdown, Item } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Openphoto } from "../photo/open_photo";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import "../home/dashboard.css";



export class Viewphotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      found: false,
      openPhotos: false,
      selectedrowid: "",
      multipleselectedrows: [],
      selectedphotoname:"",
      prev: ""
    };
    this.deletePhoto = this.deletePhoto.bind(this)
    this.maketheview = this.maketheview.bind(this)
    this.downloadmultipleimages = this.downloadmultipleimages.bind(this)
  }

  downloadmultipleimages = () => {
  var zip = new JSZip();
  zip.folder("images");
  var img = zip.folder("images");
  var links;
  // console.log(this.state.multipleselectedrows.filter(function(v){return v!==''}))
  const uniqueList = [...new Set(this.state.multipleselectedrows.filter(function(v){return v!==''}))]
  console.log(uniqueList)
  var i;

  // var uniqueArray = [];
        
  //       // Loop through array values
  //       for(i=0; i < this.state.multipleselectedrows.length; i++){
  //           if(uniqueArray.indexOf(this.state.multipleselectedrows[i]) === -1) {
  //               uniqueArray.push(this.state.multipleselectedrows[i]);
  //           }
  //       }
  for(i = 0; i < uniqueList.length ; i++){
    var targetUrl = "http://localhost:3001/downloadimage";
    const requestOption_s = {
    method: "POST",
    headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           ids: uniqueList[i],
         }),
       };
       fetch(targetUrl, requestOption_s)
       .then((response) => {
        var base64Icon = response.json();
        const img1 = <img style={{width: 50, height: 50}} source={{uri: base64Icon}}/>
        img.file(uniqueList[i] + ".jpg",base64Icon,{base64: true});
        zip.generateAsync({type:"blob"}).then(function(content) {
          saveAs(content, "images.zip");
      });
    })

  }
}
 
  maketheview = () => {
    this.setState({openPhotos : true})
  }

  componentDidMount = () => {
    var targetUrl = "http://localhost:3001/findonealbum";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        albumname: this.props.location.state.album,
      }),
    };
    fetch(targetUrl, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({ found: true });
        this.setState({ data: result["albums"] });
        console.log(result["albums"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      console.log(row.id);
      this.setState({ selectedrowid: row.id });
      this.setState({ selectedphotoname: row.photoname });
    }
  };

  optionFormatter(cell, row, rowIndex) {
    return (
      // <button onSubmit={() => this.viewpic()}>view</button>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <button
            type="button"
            class="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span
              class="glyphicon glyphicon-option-vertical"
              aria-hidden="true"
            ></span>
          </button>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.maketheview}>View</Dropdown.Item>
          <Dropdown.Item onClick={() => this.sharePhoto()}>Share</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Download</Dropdown.Item>
          <Dropdown.Item href="#/action-3" key={row.id}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  deletePhoto = () => {
    var targetUrl = "http://localhost:3001/deletephoto";
    const requestOption_s = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: this.state.selectedrowid,
        albumname: this.props.location.state.album
      }),
    };
    console.log(requestOption_s)
    fetch(targetUrl, requestOption_s, )
      .then(async (res) => {
        console.log("photo deleted")
        // console.log(await res.json())
        // const data = await res.json()
        // this.setState({ previewSrc: data})
        window.localStorage.reload();
      })
      .catch((err) => {
        console.log(err);
      });

  }

  render() {
    this.state.multipleselectedrows.push(this.state.selectedrowid)

    console.log("selectedrow" + this.state.selectedrowid);
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: this.handleOnSelect,
      style: { backgroundColor: "#c8e6c9" },
    };

    const columns = [
      {
        dataField: "id",
        text: "Photo ID",
      },
      {
        dataField: "photoname",
        text: "Photo Name",
      },
     
      {
        dataField: "createdAt",
        text: "Created on",
      },
      // {
      //   dataField: "UpdatedAt",
      //   text: "Owner",
      // },
      {
        dataField: "description",
        text: "Description",
      },
      {
        dataField: "annotationtags",
        text: "Annotation tags",
      },
      // {
      //   dataField: "sharedwith",
      //   text: "Shared with",
      // },
      // {
      //   dataField: "image",
      //   text: "Image",
      // },
    ];
    
    

    return (
      <div>
        <div className="tablealbums">
          {
            this.state.found === false ? (
              <div>hello</div>
            ) : (
              // (<div>{this.state.albums["albums"]}</div>)}
              // this.state.albums["albums"].map((i) =>

              <BootstrapTable
                hover
                keyField="id"
                data={this.state.data}
                columns={columns}
                selectRow={selectRow}
              />
            )
            // )
          }
        </div>
        <div><button type="button" class="myButton" onClick={this.maketheview}>open photo</button></div>
        <div><button type="button" class="myButton" onClick={this.downloadmultipleimages}>download multiple images</button></div>
        <div><button type="button" class="myButton" onClick={this.deletePhoto}>delete image</button></div>

        {/* <button onClick={this.deleteImage}>Delete</button> */}

        { this.state.openPhotos === true && 
          <Openphoto
            show={this.state.openPhotos} ids={this.state.selectedrowid}
            photoname={this.state.selectedphotoname} albumname={this.props.location.state.album}
          />
        }
      </div>
    );
  }
}
