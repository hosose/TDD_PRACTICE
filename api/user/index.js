// router
const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.get('', ctrl.getUsers);
router.get('/:id', ctrl.getUser);
router.post('', ctrl.postUser);
router.put('/:id', ctrl.putUser);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
