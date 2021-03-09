import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Modal, Button } from "react-bootstrap";
import "../home/dashboard.css";
import "./photo_search.css";
import BootstrapTable from "react-bootstrap-table-next";


export class PhotoSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      width: "",
      mode: "",
      size: "",
      tags:"",
      description: "",
      photoname: "",
      createdon: "",
      format: "",
      photoname: "",
      showAllOptions: false,
      found: false,
    };
    this.readUserNames = this.readUserNames.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageFormatter = this.imageFormatter.bind(this);
  }

  handleSubmit = () => {
    // console.log(this.state.albumname)
    var targetUrl =
      "http://localhost:3001/searchphotometadata"
    const requestOption_s = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        height: this.state.height,
        width: this.state.width,
        mode: this.state.mode,
        formats: this.state.format,
        annotationtags: this.state.tags,
        created_on: this.state.createdon,
        description: this.state.description,
        photoname: this.state.photoname,
    }),
    };
    // console.log(requestOption_s)

    fetch(targetUrl, requestOption_s).then(async (res) => {
        // console.log(await res.json())
        const data = await res.json()
        console.log(data)
        this.setState({photos: data,found:true,showAllOptions:false})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleOpen = () => {
    this.state({ handleOpen: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
    window.location.reload();
  };

  componentDidMount = () => {};

  readUserNames(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  showAll = () => {
    this.setState({ showAllOptions: true });
    // console.log(this.state.showAllOptions);
  };

  imageFormatter = (cell,row) => { 
    const ds = window.atob(cell)

        return (
            <span>                
              <img src={'data:image/jpeg;base64,' + ds} style={{height:"200px", width:"300px"}}/>   
            </span>
        );
  }

  render() {

    const columns = [
        {
          dataField: "height",
          text: "height",
        },
        {
          dataField: "width",
          text: "width",
        },
        {
          dataField: "mode",
          text: "mode",
        },
        {
          dataField: "formats",
          text: "formats",
        },
        {
            dataField: "image",
            text: "image",
            formatter : this.imageFormatter
        },
        {
            dataField: "annotationtags",
            text: "annotationtags",
        },
        {
            dataField: "created_on",
            text: "created_on",
        },
        {
            dataField: "description",
            text: "description",
        },
        {
            dataField: "title",
            text: "title",
        },
      ];

    return (
      <div>
        <div>
          <input style={{textAlign:"center", display: "inline-block", marginLeft:"5%"}}
            class="search"
            type="text"
            name="photoname"
            placeholder="Enter the image name you looking for ?"
            value={this.state.photoname}
            onChange={this.readUserNames}
            onClick={this.showAll}
          />
          <button type="submit" onClick={this.handleSubmit}>
            <img 
              class="image"
              src="https://img.icons8.com/pastel-glyph/64/000000/search-in-browser--v1.png"
            />
          </button>
        </div>
        {this.state.showAllOptions ?
        <form style={{backgroundColor : "grey", width:"30%", textAlign:"center", display: "inline-block", padding:"3%"}}>
          <p>Choose your photo features:</p>
          <div>
            <input
              style={{ margin: "1%" }}
              type="text"
              id="height"
              name="height"
              placeholder="enter height"
              onChange={this.readUserNames}
            />
            <input
              style={{ margin: "1%" }}
              type="text"
              id="width"
              name="width"
              placeholder="enter width"
              onChange={this.readUserNames}
            />
          </div>
          <div>
            <input
              type="text"
              id="width"
              name="width"
              placeholder="enter mode('RGB')"
              style={{ margin: "1%" }}
              onChange={this.readUserNames}
            />
            <input
              style={{ margin: "1%" }}
              type="text"
              id="format"
              name="format"
              placeholder="enter format"
              onChange={this.readUserNames}
            />
          </div>
          <div>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="annotation tags"
              style={{ margin: "1%" }}
              onChange={this.readUserNames}
            />
            <input
              type="text"
              id="datecreated"
              name="datecreated"
              placeholder="date of creation"
              style={{ margin: "1%" }}
              onChange={this.readUserNames}
            />
          </div>
          <div>
            <input
              type="text"
              id="size"
              name="size"
              placeholder="enter size"
              style={{ margin: "1%" }}
              onChange={this.readUserNames}
            />
            <input
              type="text"
              id="description"
              name="description"
              placeholder="enter description"
              style={{ margin: "1%" }}
              onChange={this.readUserNames}
            />
          </div>
        </form>
        :null}
        
        
        {
            this.state.found === false ? (
              null
            ) : (
              // (<div>{this.state.albums["albums"]}</div>)}
              // this.state.albums["albums"].map((i) =>

              <BootstrapTable bordered={ false }
                hover
                keyField="photoname"
                data={this.state.photos}
                columns={columns}
                // selectRow={selectRow}
              />
            )
            // )
          }
      </div>
    );
  }
}
