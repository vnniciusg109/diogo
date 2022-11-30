const express = require('express');
const router = express.Router();
const{authenticateUser,authorizePermissions} = require('../middlewares/authentication')
const{getSingleUser,gettAllUsersEvents,gettAllUsers,updateUser,updateUserPassword} = require('../controllers/userController');


router.route('/users').get(authenticateUser,authorizePermissions('admin'),gettAllUsers);
router.route('/events').get(authenticateUser,authorizePermissions('admin'),gettAllUsersEvents);
router.route('/updateUser').patch(authenticateUser,updateUser);
router.route('/updateUserPassword').patch(authenticateUser,updateUserPassword);
router.route('/:id').get(authenticateUser,getSingleUser);



module.exports = router;