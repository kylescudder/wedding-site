const Guest = require('../models/guest-model')

createGuest = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a guest',
        })
    }

    const guest = new Guest(body)

    if (!guest) {
        return res.status(400).json({ success: false, error: err })
    }

    guest
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: guest._id,
                message: 'Guest created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Guest not created!',
            })
        })
}

updateGuest = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Guest.findOne({ _id: req.params.id }, (err, guest) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Guest not found!',
            })
        }
        guest.forename = body.forename
        guest.surname = body.surname
        guest.guestGroupID = body.guestGroupID
        guest
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: guest._id,
                    message: 'Guest updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Guest not updated!',
                })
            })
    })
}

deleteGuest = async (req, res) => {
    await Guest.findOneAndDelete({ _id: req.params.id }, (err, guest) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!guest) {
            return res
                .status(404)
                .json({ success: false, error: `Guest not found` })
        }

        return res.status(200).json({ success: true, data: guest })
    }).catch(err => console.log(err))
}

getGuestById = async (req, res) => {
    await Guest.findOne({ _id: req.params.id }, (err, guest) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!guest) {
            return res
                .status(404)
                .json({ success: false, error: `Guest not found` })
        }
        return res.status(200).json({ success: true, data: guest })
    }).catch(err => console.log(err))
}

getGuests = async (req, res) => {
    if (req.payload)
    {
        await Guest.find({}, (err, guests) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!guests.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Guest not found` })
            }
            return res.status(200).json({ success: true, data: guests })
        }).catch(err => console.log(err))
    } else {
        return res.status(400).json({ success: false, error: 'Not authenticated' })
    }
}

module.exports = {
    createGuest,
    updateGuest,
    deleteGuest,
    getGuests,
    getGuestById,
}