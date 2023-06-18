import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
    rest.post('http://localhost:8080/users/signup', async (req, res, ctx) => {
        let body = await req.json();

        if (body.email === 'hgonzalo2000@gmail.com') {
            return res(
                ctx.status(404),
                ctx.json({
                    message: 'user already exists',
                })
            );
        }

        return res(
            ctx.status(201),
            ctx.json({
                jwt: 'jwt',
            })
        );
    }),
];

export const server = setupServer(...handlers);
