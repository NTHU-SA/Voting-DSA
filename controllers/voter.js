
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../libs');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

module.exports = {
    //TODO: How to get return filename
    async uploadList(req, res,) {
        createBackup();

        if (req.files === null || !req.files.file) {
            res.send(400).json({ error: 'no file upload' });
        }
        const file = req.files.file;

        // I didn't handle chinese file name,
        // upload chinese file name fill be successful but the file name will be wierd
        const fileName = "voterList.csv";
        const fileDir = `${uploadDir}/${fileName}`;
        const fileUrl = `/${path.relative(path.join(__dirname, '../libs'), fileDir)}`;
        try {
            await file.mv(fileDir);
            res.json({ fileName, fileUrl });
        } catch (error) {
            res.status(400).send(error);
        }
    },

    //TODO: MOVE FILE
};
function moveFile(oriPath, destPath){

    oriPath = path.join(__dirname, oriPath);
    destPath = path.join(__dirname, destPath);

    fs.rename(oriPath, destPath, function (err) {
        if (err) {
            throw err
        } else {
            console.log("New backup created!");
        }
    });
}

function createBackup(){

    fileName = path.join(__dirname, "../libs/voterList.csv.backup");

    fs.unlink(fileName, (err) => { 
        if(err){ 
            // File deletion failed 
            console.error(err.message); 
        } 
        console.log("Old backup deleted successfully"); 
    }) 

    moveFile("../libs/voterList.csv", "../libs/voterList.csv.backup");
}

