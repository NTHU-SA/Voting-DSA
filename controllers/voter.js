const fs = require('fs');
const path = require('path');
const votes = require('./votes');

const uploadDir = path.join(__dirname, '../libs');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

module.exports = {
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

            //CSV檢查不過
            if (!checkCSV(fileDir)) {
                moveFile("../libs/voterList.csv.backup", "../libs/voterList.csv")
                res.send("上傳失敗：檔案格式不符");
            }

            res.send("上傳成功");
            votes.fileReload();
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //Reverse of createBackup
    async restoreBackup(req, res,) {

        try {
            if (!moveFile("../libs/voterList.csv.backup", "../libs/voterList.csv")) {
                res.send("還原失敗：伺服器中沒有先前版本");
            } else {
                res.send("還原成功");
            }
        } catch (err) {
            res.status(400).send(err);
        }
    },
};

function moveFile(oriPath, destPath) {

    oriPath = path.join(__dirname, oriPath);
    destPath = path.join(__dirname, destPath);

    try {
        fs.accessSync(oriPath, fs.constants.F_OK);
    } catch (err) {
        console.error('File does not exist');
        return false;
    }
    try {
        fs.renameSync(oriPath, destPath);
    } catch (err) {
        console.log(err);
        return falsel
    }
    return true;
}

function checkCSV(filePath) {
    var fileContent = fs.readFileSync(filePath, 'utf8');
    //https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
    return /^\d+$/.test(fileContent);
}
