'use strict';

const express = require('express');
const uuid = require('uuid/v4');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

let bookmarks = [
  {
    "id": "uniqueId",
    "title": "Dummy title",
    "url": "Dummy url",
    "description": "Dummy description",
    "rating": "2"
  }
];

bookmarkRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description='', rating } = req.body;
    if (!title) {
      res
        .status(400)
        .send('Title required');
    }
    if (!url) {
      res
        .status(400)
        .send('Url required');
    }
    const newBookmark = {
      id: uuid(),
      title,
      url,
      description,
      rating
    };
    bookmarks.push(newBookmark);
    res
      .status(201)
      .send('Ok');
  });

bookmarkRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const id = req.params.id;
    let data = 'Not Found';
    bookmarks.map(bookmark => {
      if (bookmark.id === id) {
        data = bookmark;
      }
    });
    if (data === 'Not Found') {
      res
        .status(404)
        .send(data);
    }
    res.json(data);
  })
  .delete((req, res) => {
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== req.params.id);
    res
      .status(204)
      .end();
  });

module.exports = bookmarkRouter;