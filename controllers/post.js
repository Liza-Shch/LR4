const postQueries = require('../queries/post');

module.exports = {
    createPost: (req, res) => {
        const post = req.post;
        return postQueries.createPost(post)
            .then((id) => res.status(201).send({ status: 'ok', id: id, msg: 'Post was successfull created!' })) 
            .catch((err) => {
                if (err.code === '23505') {
                    return postQueries.getPost(post)
                        .then(() => res.status(201).send({ status: 'ok', msg: 'Post was successfull created!' }))
                        .catch(() => res.status(400).send({ status: 'error', msg: 'Wrong parametrs' }));
                }
                
                res.status(400).send({ status: 'error', msg: 'Wrong parametrs' });
            })
    },

    getPost: (req, res) => {
        const id = req.id;
        const idempotencyKey = req.idempotencyKey;
        return postQueries.getPost({ id, idempotencyKey })
            .then((post) => res.status(200).send({ status: 'ok', post: post, msg: 'Post was successfully getted!' }))
            .catch(() => res.status(404).send({ status: 'error', msg: 'Post was not found' }));
    },

    updatePost: (req, res) => {
        const post = req.post;
        return postQueries.updatePost(post)
            .then((post) => res.status(200).send({ status: 'ok', post: post, msg: 'Post was successfully updated!' }))
            .catch((err) => { 
                if (err.code === 0) {
                    return res.status(404).send({ status: 'error', msg: 'Post was not found' })
                }
                
                res.status(400).send({ status: 'error', msg: 'Wrong parametrs' });
            });
    },

    deletePost: (req, res) => {
        const post = req.post;
        return postQueries.deletePost(post)
            .then(() => res.status(200).send({ status: 'ok', msg: 'Post was successfully deleted' }))
            .catch(() => res.status(404).send({ status: 'error', msg: 'Post was not found' }))
    }
}