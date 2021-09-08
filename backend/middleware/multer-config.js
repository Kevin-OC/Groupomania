/* le package 'multer' gère les upload */
const multer = require('multer');

/* gestion des types d'extensions */
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg',
    'image/gif': 'gif'
};

/* la méthode 'diskStorage()' demande: un dossier de destination, et un nom de fichier */
const storage = multer.diskStorage({
    destination: (req, file, callback) => { // <- c'est la fonction callback qui nous intéresse: le 2ème argument est le /dossier de destination
        callback(null, './images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0]; // <- on remplacera tous les espaces par un underscore
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); // <- notre nom de fichier ressemblera à: nomDuFichierDateActuelle.extension
    }
});

module.exports = multer({storage: storage}).single('file');