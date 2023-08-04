import { NextFunction, Request, Response } from 'express';
import { getAllUsers, Roles, getUser, createUser, updateUser, deleteUser } from '../state/users';
import { ClientError } from '../exceptions/clientError';

class UserController {
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        // Retrieve all users.
        const users = getAllUsers();
        // Return the user information.
        res.status(200).type('json').send(users);
    };

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        // Get the ID from the URL.
        const id: string = req.params.id;

        // Get the user with the requested ID.
        const user = getUser(id);

        // NOTE: We will only get here if we found a user with the requested ID.
        res.status(200).type('json').send(user);
    };

    static newUser = async (req: Request, res: Response, next: NextFunction) => {
        // Get the username and password.
        let { username, password } = req.body;
        // We can only create regular users through this function.
        const user = await createUser(username, password, Roles.USER);

        // NOTE: We will only get here if all new user information 
        // is valid and the user was created.
        // Send an HTTP "Created" response.
        res.status(201).type('json').send(user);
    };

    static editUser = async (req: Request, res: Response, next: NextFunction) => {
        // Get the user ID.
        const id = req.params.id;

        // Get values from the body.
        const { username, role } = req.body;

        if (!Object.values(Roles).includes(role))
            throw new ClientError('Invalid role');

        // Retrieve and update the user record.
        const user = getUser(id);
        const updatedUser = updateUser(id, username || user.username, role || user.role);

        // NOTE: We will only get here if all new user information 
        // is valid and the user was updated.
        // Send an HTTP "No Content" response.
        res.status(204).type('json').send(updatedUser);
    };

    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        // Get the ID from the URL.
        const id = req.params.id;

        deleteUser(id);

        // NOTE: We will only get here if we found a user with the requested ID and    
        // deleted it.
        // Send an HTTP "No Content" response.
        res.status(204).type('json').send();
    };
}

export default UserController;