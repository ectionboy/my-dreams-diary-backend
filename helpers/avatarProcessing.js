const Jimp = require("jimp");
const avatarProcessing = (originalPath, uploadPath) => {
	Jimp.read(originalPath, (_, avatar) => {
		avatar.resize(250, 250).write(uploadPath);
	});
};

module.exports = avatarProcessing;