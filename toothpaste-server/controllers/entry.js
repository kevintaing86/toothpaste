'use strict';

const express = require('express');

exports.test = (req, res) => {
  res.send({test: 'Success! From entry controller'});
};
