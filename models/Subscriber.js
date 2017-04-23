const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  subscriberId: String
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
