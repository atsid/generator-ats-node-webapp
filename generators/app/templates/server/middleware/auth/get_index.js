module.exports = (req, res) => {
    res.json({
        options: ['GET'],
        links: {
            'current': '/auth/current',
            'local': '/auth/local',
            'facebook': '/auth/facebook',
            'twitter': '/auth/twitter',
        },
    });
    res.end();
};
