module.exports = {
    async auth(req, res) {
        const { sid } = req.query;
        if (sid == undefined) {
            res.redirect('/mock_auth.html');
        } else {
            res.redirect(`/callback?code=${sid}`);
        }
    },

    async token(req, res) {
        const { code } = req.body;
        res.json({ access_token: code });
    },

    async resource(req, res) {
        const sid = req.headers.authorization.split(' ')[1];
        res.json({ Userid: sid });
    },
};
