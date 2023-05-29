/** Upload Controller */

// Imports
const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateFile } = require('../utilities/uploadFile');

const upload = async (req, res = response) => {
    try {
        const type = req.params.type;
        const id = req.params.id;

        const validTypes = ['sheets', 'users']
        if(!validTypes.includes(type)) {
            return res.status(400).json({
                ok: false,
                msg: 'File type not valid'
            })
        }

        if(!req.files || Object.keys(req.files).lenght === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No files were upload'});
        }

        // Process the file
        const file = req.files.file;
        
        const splitName = file.name.split('.');
        const fileExtension = splitName[ splitName.length - 1 ];

        let validExtension;
        // Valid extensions
        switch(type) {
            case 'sheets':
                validExtension = ['pdf', 'doc'];
                break;
            case 'users':
                validExtension = ['png', 'jpg', 'jpeg', 'gif'];
                break;
        }
        
        if(!validExtension.includes(fileExtension)) {
            return res.status(400).json({
                ok: false,
                msg: 'File extension not valid'
            });
        }

        // Generate file name
        const fileName = `${ uuidv4() }.${ fileExtension }`;

        // Save upload path
        const path = `./uploads/${ type }/${ fileName }`;

        // Move the file to the folder
        file.mv(path, (err) => {
            if(err) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error moving the file'
                });
            }
        });

        // Update database
        updateFile(type, id, fileName);

        return res.status(200).json({
            ok: true,
            msg: 'File uploaded',
            file_name: fileName
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
}

const getFile = ( req, res = response ) => {
    const type = req.params.type;
    const file = req.params.file;

    const filePath = path.join( __dirname, `../uploads/${ type }/${ file }`);

    // Default image
    if(!fs.existsSync(filePath)) {
        switch(type) {
            case 'users': {
                const filePath = path.join( __dirname, `../uploads/${ type }/no-user-image.gif`);
                res.sendFile(filePath);
                break;
            }
            case 'sheets': {
                const filePath = path.join( __dirname, `../uploads/${ type }/no-sheets-image.png`);
                res.sendFile(filePath);
                break;
            }
        }
    } else {
        res.sendFile( filePath );
    }

}

module.exports = {
    upload,
    getFile
}