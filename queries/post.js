const db = require('../db');

module.exports = {
    createPost: ({ title, text, blog, author, img, idempotencyKey }) => {
        const date = new Date(Date.now());
        return db.one(`INSERT INTO posts(title, text, blog, author, img, idempotency_key, created_at, updated_at)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [title, text, blog, author, img, idempotencyKey, date, date], post => post.id)
    },

    getPost: ({ id, idempotencyKey }) => {
        if (id) {
            return db.one(`SELECT * FROM posts WHERE id = ${id} AND deleted_at IS NULL`, [], post => post)
        }

        return db.one(`SELECT * FROM posts WHERE idempotency_key = '${idempotencyKey}' AND deleted_at IS NULL`, [], post => post)
    },

    updatePost: ({ id, title, text, img }) => {
        const date = new Date(Date.now());
        let query = 'UPDATE posts SET ';
        const params = [];
        if (title) {
            params.push(` title = '${title}' `);
        }

        if (text) {
            params.push(` text = '${text}' `);
        }

        if (img) {
            params.push(` img = '${img}' `);
        }

        query += `${params.join(',')}, updated_at = $1 WHERE id = ${id} RETURNING id`;
        return db.one(query, date, post => post)
    },

    deletePost: ({ id }) => {
        const date = new Date(Date.now());
        return db.one(`UPDATE posts SET deleted_at = $1 WHERE id = ${id} AND deleted_at IS NULL RETURNING id`,
            date, post => post.id);
    }
}