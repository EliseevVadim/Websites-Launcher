let images = document.querySelectorAll('img');
let requiredDirectory = 'images';
let sourceDirectory = 'previews';

for (let image of images) {
    image.onclick = openImage;
}

function openImage() {
    let newPath = this.src.replace(sourceDirectory, requiredDirectory);
    window.open(newPath, name);
    console.log(name);
}