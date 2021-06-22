import React, { Component } from "react";
import api from "../api";

class GuestUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
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

  handleUpdateGuest = async () => {
    const { id, forename, surname, guestGroupID } = this.state;
    const payload = { forename, surname, guestGroupID };

    await api.updateGuestById(id, payload).then((res) => {
      window.alert(`Guest updated successfully`);
      this.setState({
        forename: "",
        surname: "",
        guestGroupID: "",
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const guest = await api.getGuestById(id);

    this.setState({
      forename: guest.data.data.forename,
      surname: guest.data.data.surname,
      guestGroupID: guest.data.data.guestGroupID,
    });
  };

  render() {
    const { forename, surname, guestGroupID } = this.state;
    return (
      <div className="form-group">
        <div className="h1">Create Guest</div>

        <label style="margin: 5px">Forename: </label>
        <input
          className="form-control"
          type="text"
          value={forename}
          onChange={this.handleChangeInputForename}
        />

        <label style="margin: 5px">Surname: </label>
        <input
          className="form-control"
          type="text"
          value={surname}
          onChange={this.handleChangeInputSurname}
        />

        <label style="margin: 5px">Guest Group ID: </label>
        <input
          className="form-control"
          type="number"
          value={guestGroupID}
          onChange={this.handleChangeInputGuestGroupID}
        />

        <button className="btn btn-primary" onClick={this.handleUpdateGuest}>
          Update Guest
        </button>
        <button className="btn btn-danger" href={"/guest/list"}>
          Cancel
        </button>
      </div>
    );
  }
}

export default GuestUpdate;
