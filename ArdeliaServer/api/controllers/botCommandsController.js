'use strict';

module.exports.list = function (req, res) {
    console.log("hello!");
    res.json({ "Dit is": "een test" });
}