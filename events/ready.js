module.exports = (client, member) => {
    client.user.setPresence({ game: { name: '' }, status: 'online' })
        .then(console.log("Status is updated to predifined status"))
        .catch(console.error);
};