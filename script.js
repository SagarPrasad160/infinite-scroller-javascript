const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let imagesLoaded = 0;
let images = [];
let ready = false;

let count = 5;

const url = `https://api.unsplash.com/photos/random/?client_id=-D73deWd9zWwy7iKv6DzO-ILbF9V4U-15-n9NspxKhQ&count=${count}`;

const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === images.length) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
};

const displayPhotos = () => {
  imagesLoaded = 0;
  images.forEach((photo) => {
    const anchorEle = document.createElement("a");
    anchorEle.setAttribute("href", photo.links.html);
    anchorEle.setAttribute("target", "_blank");

    const img = document.createElement("img");

    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    img.addEventListener("load", imageLoaded);

    anchorEle.append(img);

    imageContainer.append(anchorEle);
  });
};

const fetchPhotos = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  images = data;
  displayPhotos();
};

fetchPhotos();

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight &&
    ready
  ) {
    ready = false;
    console.log(
      window.scrollY,
      window.innerHeight,
      document.documentElement.scrollHeight
    );
    fetchPhotos();
  }
});
