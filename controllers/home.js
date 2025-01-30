const express = require('express')

const controller = {
    render: function(req, res) {
        res.render('profile')
    }
}

module.exports = controller