const {createClass, getClasses, getClass, updateClass, deleteClass} = require('../controllers/classControllers');
const express = require('express');
const router = express.Router();
const {protect} = require("../middlewares/authenticationMiddleware");
const {authorizeRoles} = require("../middlewares/roleMiddleware");


router.use(protect);
router.use(authorizeRoles("teacher"));

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

module.exports = router;