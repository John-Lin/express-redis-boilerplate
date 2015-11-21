'use strict';

let express = require('express');
let router = express.Router();

/*
 * POST to set a flow information.
 */
router.post('/:id([0-9a-zA-Z]{64})', (req, res) => {
  let rd = req.rd;
  let flowID = req.params.id;
  let flowInfo = {};

  // if (req.body.id !== req.params.id) {
  //   // Invalid ID
  //   res.sendStatus(400);
  // }

  flowInfo.id = req.params.id;
  flowInfo.name = 'dWorld';
  flowInfo.port = 50;

  rd.set(flowID, JSON.stringify(flowInfo), (err, dbRes) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

/*
 * GET to get a single flow.
 */
router.get('/:id([0-9a-zA-Z]{64})', (req, res) => {
  let rd = req.rd;
  let flowID = req.params.id;
  rd.get(flowID, (err, dbRes) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      if (!dbRes) {
        res.sendStatus(204);
      } else {
        res.send(JSON.parse(dbRes));
      }
    }
  });
});

/*
 * Flush Database
 */
router.delete('/flush', (req, res) => {
  let rd = req.rd;
  rd.flushdb((err, dbRes) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = router;
