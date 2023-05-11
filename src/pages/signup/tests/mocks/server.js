import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
    rest.post('http://localhost:8080/user/signup', (req, res, ctx) => {
        console.log('hi');
        return res(
            ctx.status(201),
            ctx.json({
                id: 0,
            })
        );
    }),
];

export const server = setupServer(...handlers);
