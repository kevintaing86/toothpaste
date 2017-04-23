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
      res.status(400).send(err);
    }
    res.sendStatus(201);
  });
};

exports.getEntries = (req, res) => {
  Entry.find({}, (err, result) => {
    if(err){
      res.status(400).send(err);
    }
    res.status(200).send(result);
  });
}
