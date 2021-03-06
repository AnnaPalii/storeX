const db = require("../models");

// Defining methods for the commentsController
module.exports = {
  findAll: function(req, res) {
    db.Comment
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
     console.log(req.params.id)
    db.Comment
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    console.log(req.params.username)
   db.Comment
     .findByUser(req.params.username)
     .then(dbModel => res.json(dbModel))
     .catch(err => res.status(422).json(err));
 },
  create: function(req, res) {
     // if no user on the session
     console.log(req);
     if(!req.user) return res.status(401).end('user isnt authenticated')

     db.Comment
      .create({...req.body, username: req.user.username,})
      .then(({_id}) => db.User.findOneAndUpdate({_id: req.user._id}, { $push: { comments: _id } }, { new: true }))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log(req.body);
    console.log(req.params.id);
     db.Comment
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)});
  },
  remove: function(req, res) {
     db.Comment
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // TO-DO: find by user
};
