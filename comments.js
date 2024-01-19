// Create web server
// 1. Create web server
// 2. Create route for GET /comments
// 3. Create route for POST /comments
// 4. Create route for GET /comments/:id
// 5. Create route for PUT /comments/:id
// 6. Create route for DELETE /comments/:id
// 7. Create route for GET /comments/:id/author
// 8. Create route for GET /comments/:id/post
// 9. Export router

// Import dependencies
const express = require('express');
const router = express.Router();

// Import models
const Post = require('../models/post');
const Comment = require('../models/comment');
const Author = require('../models/author');

// 2. Create route for GET /comments
router.get('/', (req, res) => {
  Comment.find().populate('post').populate('author').then((comments) => {
    res.json(comments);
  });
});

// 3. Create route for POST /comments
router.post('/', (req, res) => {
  const attributes = req.body;

  Comment.create(attributes).then((comment) => {
    res.status(201).json(comment);
  }).catch((error) => {
    res.status(400).json({ error: error.errors });
  });
});

// 4. Create route for GET /comments/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Comment.findById(id).populate('post').populate('author').then((comment) => {
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: { message: 'Comment not found' } });
    }
  });
});

// 5. Create route for PUT /comments/:id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const attributes = req.body;

  Comment.findByIdAndUpdate(id, attributes, { new: true, runValidators: true }).then((comment) => {
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: { message: 'Comment not found' } });
    }
  }).catch((error) => {
    res.status(400).json({ error: error.errors });
  });
});

// 6. Create route for DELETE /comments/:id