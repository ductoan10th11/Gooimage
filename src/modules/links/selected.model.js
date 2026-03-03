const mongoose = require('mongoose')

const selectedSchema = new mongoose.Schema({
    linkId: {type: mongoose.Schema.Types.ObjectId, ref: "Link", required: true},
    selected: {type: Array}
}, {timestamps: true})

module.exports = mongoose.model("Selected", selectedSchema)