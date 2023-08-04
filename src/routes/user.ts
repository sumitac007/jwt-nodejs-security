import { Router } from 'express';
import UserController from '../controllers/UserController';
import { Roles } from '../state/users';
import { asyncHandler } from '../middleware/asyncHandler';
import { checkJwt } from '../middleware/checkJwt';
import { checkRole } from '../middleware/checkRole';


export default Router({ mergeParams: true })// Note: Each handler is wrapped with our error handling function.
  // Get all users.
  .get('/', [checkJwt, checkRole([Roles.ADMIN])], asyncHandler(UserController.listAll))

  // Get one user.
  .get('/:id', [checkJwt, checkRole([Roles.USER, Roles.ADMIN])], asyncHandler(UserController.getOneById))

  // Create a new user.
  .post('/', [checkJwt, checkRole([Roles.USER, Roles.ADMIN])], asyncHandler(UserController.newUser))

  // Edit one user.
  .patch('/:id', [checkJwt, checkRole([Roles.USER, Roles.ADMIN])], asyncHandler(UserController.editUser))

  // Delete one user.
  .delete('/:id', [checkJwt, checkRole([Roles.ADMIN])], asyncHandler(UserController.deleteUser));

