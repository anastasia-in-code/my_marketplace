const fs = require('fs');
const crypto = require('crypto');
const {productImageRepository} = require('../../../config')

class ProductImageRepository {
  constructor(dir) {
    this.dir = dir;

    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
  }

  async create(file) {
    // eslint-disable-next-line no-param-reassign
    file.id = this.randomId();
    // eslint-disable-next-line no-param-reassign
    file.format = this.getFileFormat(file);

    await fs.writeFileSync(`${this.dir}/${file.id}.${file.format}`, '');

    await this.saveFile(file);

    return file;
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  getFileFormat(file) {
    const nameToArray = file.originalname.split('.');
    return nameToArray[nameToArray.length - 1];
  }

  saveFile(file) {
    const writableStream = fs.createWriteStream(
      `${this.dir}/${file.id}.${file.format}`,
    );
    writableStream.write(file.buffer);
    writableStream.end();

    writableStream.on('error', (err) => console.log(err));
  }
}

module.exports = new ProductImageRepository(productImageRepository);
