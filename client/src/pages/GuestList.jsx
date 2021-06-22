import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import 'react-table/react-table.css'

class UpdateGuest extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/guest/update/${this.props.id}`
    }

    render() {
        return <div style="color:#ef9b0f;cursor: pointer;" onClick={this.updateUser}>Update</div>
    }
}

class DeleteGuest extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the guest ${this.props.id} permanently?`,
            )
        ) {
            api.deleteGuestById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <div style="color: #ff0000;cursor: pointer;" onClick={this.deleteUser}>Delete</div>
    }
}
class GuestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getAllGuests().then(guests => {
            this.setState({
                guests: guests.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { guests, isLoading } = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'forename',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'surname',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'guestGroupID',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteGuest id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateGuest id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!guests.length) {
            showTable = false
        }

        return (
            <div style="padding: 0 40px 40px 40px">
                {showTable && (
                    <ReactTable
                        data={guests}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </div>
        )
    }
}
export default GuestList