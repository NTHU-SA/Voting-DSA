
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

module.exports = {
    //TODO: How to get return filename
    async uploadFile(req, res,) {
        if (req.files === null || !req.files.file) {
            res.send(400).json({ error: 'no file upload' });
        }
        const file = req.files.file;

        // I didn't handle chinese file name,
        // upload chinese file name fill be successful but the file name will be wierd
        const fileName = `${Date.now()}_${file.name}`;
        //const fileName = "voterList.csv";
        const fileDir = `${uploadDir}/${fileName}`;
        const fileUrl = `/${path.relative(path.join(__dirname, '../public'), fileDir)}`;
        try {
            await file.mv(fileDir);
            res.json({ fileName, fileUrl });
        } catch (error) {
            res.status(400).send(error);
        }
    },

    //TODO: MOVE FILE
};

