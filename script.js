//get the DOM element
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// initialize global photoArray
let photoArray = [];

//initialize variables needed for image loading
let ready = false;
let totalImages = 0;
let loadedImages = 0;


// apikey and url for unsplash API
const count = 30;
const apiKey = '4ZGNxLlOXnDqL8IrQTMQKd0SjZ5ra-aMQH1qk8KC_ec';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// check if all images were loaded
const loadImage = () => {
    loadedImages++;
    if(loadedImages === totalImages){
        loader.hidden = true;
        ready = true;
        loadedImages = 0;
    }
}

// helper function to set attributes to a element
const setAttribute = (element, attributes) => {
    for(key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// displayPhotos function 
const displayPhotos = () => {
    totalImages = photoArray.length;
    //iterate through the photoArray
    photoArray.forEach((photo) => {

        // create a <a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item,{
            href:photo.links.html,
            target:'_blank'
        });

        //create a <img> for photos
        const img = document.createElement('img');
        setAttribute(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description
        })

        //set a load event on img
        img.addEventListener('load', loadImage)

        // insert img into a tag
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
} 

// fetch images
const fetchImages = async () => {
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    }catch(error){
        console.log(error)
    }
};

// load new set of images when the scroll reached near the end
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        fetchImages();
        ready = false;
    }
})

// run
fetchImages();