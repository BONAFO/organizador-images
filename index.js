const fs = require('fs');
const util = require('util');

const get_imgs = util.promisify(fs.readdir);
const copy_img = util.promisify(fs.copyFile);


const origin_url = './Start/';
const new_url = './End/';


(async () => {
    let counter = 1;
    const images = await get_imgs(origin_url);
    images.sort((a, b) => {
        const numeroA = parseInt(a.split('_')[1].split('.')[0]);
        const numeroB = parseInt(b.split('_')[1].split('.')[0]);
        return numeroA - numeroB;
    });

    for (let i = 0; i < images.length; i++) {
        console.log(images[i]);

        await copy_img(origin_url + images[i], new_url + (i + 1) + '.png')
            .then(() => {
                console.log(`Imagen ${images[i]} copiada.`);
            })
            .catch(error => console.error('Error al copiar la imagen:', error));

        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(images);
    process.exit();
})();