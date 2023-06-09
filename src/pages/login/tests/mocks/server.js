import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
    rest.post('http://localhost:8080/users/login', async (req, res, ctx) => {
        let body = await req.json();

        if (body.email === 'hgonzalo2000@gmail.com') {
            return res(
                ctx.status(404),
                ctx.json({
                    message: 'Email is not registered!',
                })
            );
        }

        if (body.email === 'gonzaloh2000@hotmail.com' && body.password === 'Password123') {
            return res(
                ctx.status(401),
                ctx.json({
                    message: 'Password is incorrect!',
                })
            );
        }

        return res(
            ctx.status(200),
            ctx.json({
                jwt: 'token',
            })
        );
    }),
];

export const server = setupServer(...handlers);
