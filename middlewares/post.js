module.exports = {
    post: (req, res, next) => {
        const post = req.body && req.body.post;
        if (!post) {
            return res.status(400).send({ status: 'error', msg: 'Wrong parametrs' });
        }

        req.post = post;
        next();
    },

    getPost: (req, res, next) => {
        const idOrIdempotencyKey = req.params.idOrIdempotencyKey;
        if (!idOrIdempotencyKey) {
            return res.status(400).send({ status: 'error', msg: 'Wrong paarmetrs' });
        }

        if (idOrIdempotencyKey.match(new RegExp('\\D'))) {
            req.idempotencyKey = idOrIdempotencyKey;
        } else {
            req.id = idOrIdempotencyKey;
        }

        next();
    }
}