'use strict';

const express = require('express');
const Entry = require('../models/Entry');

exports.test = (req, res) => {
  res.send({test: 'Success! From entry controller'});
};

exports.postNewEntry = (req, res) => {
  const newEntry = new Entry({
    title: req.body.title,
    description: req.body.description,
    email: req.body.email,
    link: req.body.link,
    created_at: { type: Date, default: Date.now }
  });

  newEntry.save((err) => {
    if(err){
      res.sendStatus(400); 
    }
    res.sendStatus(201);
  });
};
