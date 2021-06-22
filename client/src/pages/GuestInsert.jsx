import React, { Component } from "react";
import api from "../api";

class GuestInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forename: "",
      surname: "",
      guestGroupID: "",
    };
  }

  handleChangeInputForename = async (event) => {
    const forename = event.target.value;
    this.setState({ forename });
  };
  handleChangeInputSurname = async (event) => {
    const surname = event.target.value;
    this.setState({ surname });
  };
  handleChangeInputGuestGroupID = async (event) => {
    const guestGroupID = event.target.validity.valid
      ? event.target.value
      : this.state.guestGroupID;

    this.setState({ guestGroupID });
  };
  handleIncludeGuest = async () => {
    const { forename, surname, guestGroupID } = this.state;
    const payload = { forename, surname, guestGroupID };

    await api.insertGuest(payload).then((res) => {
      window.alert(`Guest inserted successfully`);
      this.setState({
        forename: "",
        surname: "",
        guestGroupID: "",
      });
    });
  };

  render() {
    const { forename, surname, guestGroupID } = this.state;
    return (
      <div className="form-group">
        <div className="h1">Create Guest</div>

        <div className="margin: 5px">Forename: </div>
        <input
        className="form-control"
          type="text"
          value={forename}
          onChange={this.handleChangeInputForename}
        />

        <div className="margin: 5px">Surname: </div>
        <input
        className="form-control"
          type="text"
          value={surname}
          onChange={this.handleChangeInputSurname}
        />

        <div className="margin: 5px">Guest Group ID: </div>
        <input
        className="form-control"
          type="number"
          value={guestGroupID}
          onChange={this.handleChangeInputGuestGroupID}
        />

        <button className="btn btn-primary" onClick={this.handleIncludeGuest}>Add Guest</button>
        <button className="btn btn-danger" href={"/guest/list"}>Cancel</button>
      </div>
    );
  }
}

export default GuestInsert;
