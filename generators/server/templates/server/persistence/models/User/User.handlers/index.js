module.exports = [
    {
        type: 'pre',
        event: 'save',
        description: 'encrypt password on save',
        handler: require('./encrypt_password_on_save'),
    },
];
