module.exports = (req, res) => {
    res.json({
        options: ['POST'],
        links: {
            'user': '/users/{id}',
        },
    });
};
