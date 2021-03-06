import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import './dashboard.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import viewoptions from "../../3dosts.PNG";


export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      albums: [],
      found: false,
    };

    this.findAlbums = this.findAlbums.bind(this);
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
    fetch(targetUrl, requestOption_s).then(async (res) => {
      this.setState({ loggedIn: true });
      // console.log("user album list");
      // console.log(res.json())
      const data = await res.json();
      // const newData = this.state.albums.concat([data]);  
      console.log(data["albums"])
      this.setState({albums: data});
      this.setState({found : true})
      // console.log(this.state.albums)
      // return this.state.albums
    }).catch(err => {console.log(err)});;
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
    fetch(targetUrl, requestOptions).then(async (res) => {
      const data = await res.json();
      window.localStorage.setItem("username", data["username"]);
      this.findAlbums();
    }).catch(err => {console.log(err)});

  }

  render() {
    const {data} = this.state.albums;
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
      // {
      //   dataField: <img src={viewoptions}></img>,
      //   text: "options",
      // },
    ];
    return (
      <div>
        <h1>Home page</h1>

     {this.state.found === false ? (<div>hello</div>) :
      // (<div>{this.state.albums["albums"]}</div>)} 
    // this.state.albums["albums"].map((i) => 
   
     (
     <div className="tablealbums">
    <BootstrapTable classkeyField="id" keyField="id" 
    data={this.state.albums["albums"]}
    columns={columns}
    selectRow={{ mode: "checkbox" }}
    tabIndexCell
    />
    </div>
    )
    // )
    }
       
      </div>
    );
  }
}
