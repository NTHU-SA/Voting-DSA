const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../libs');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

module.exports = {
    //TODO: Change filename from 全校在學學生資料.csv to voterList.csv
    //TODO: Validate CSV file
    async uploadList(req, res,) {
        //RemoveFile("../libs/voterList.csv.backup");
        moveFile("../libs/voterList.csv", "../libs/voterList.csv.backup");

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
            console.log("Upload");
            res.json({ fileName, fileUrl });
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //Reverse of createBackup
    //TODO: check if file exsit
    async restoreBackup() {
        moveFile("../libs/voterList.csv.backup", "../libs/voterList.csv");
    },
};

function moveFile(oriPath, destPath) {

    oriPath = path.join(__dirname, oriPath);
    destPath = path.join(__dirname, destPath);

    try {
        fs.accessSync(oriPath, fs.constants.F_OK);
    } catch (err) {
        console.error('File does not exist');
    }
    try{
        fs.renameSync(oriPath, destPath);
    }catch(err){
        console.log(err);
    }
}

let RemoveFile = async (fileName) => {
    fileName = path.join(__dirname, fileName);

    fs.access(fileName, fs.F_OK, (err) => {
        if (err) {
            console.log("rm err");
            console.error(err)
            return
        }
        fs.unlinkSync(fileName, (err) => {
            if (err) {
                // File deletion failed 
                console.error(err.message);
            }
            console.log("File is deleted successfully");
        });
    })
}
