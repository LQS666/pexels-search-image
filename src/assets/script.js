const form = document.querySelector('form');
const error = document.querySelector('.error');
const photosList = document.querySelector('.photosList');
const fragment = document.createDocumentFragment();
const searchInput = document.querySelector('.searchInput');
const txt = [
    "Wyszukaj zdjęcia",
    "Wpisz frazę",
    "np. forest, animals, sea",
    "Wyszukaj zdjęcia"
]
let activeLetter = -10;
let activeText = 0;

// Zmieniający się tekst w Input
const TypingInput = () => {
    if (activeLetter >= 0) {
        searchInput.placeholder += txt[activeText][activeLetter];
    }
    activeLetter++;
    if (activeLetter === txt[activeText].length) {

        activeText++;
        if (activeText === txt.length) return;

        return setTimeout(() => {
            activeLetter = -10;
            searchInput.placeholder = '';
            TypingInput();
        }, 2000)
    }
    setTimeout(TypingInput, 100)

}
TypingInput();

// Wyświetlanie zdjęć pobieranych z API pexels.com
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const API = "563492ad6f91700001000001472579d46b8a4b3cb9423f79c5029125";
    const query = `https://api.pexels.com/v1/search?query=${searchInput.value}&per_page=80`;
    const options = {
        headers: {
            Authorization: `${API}`
        }
    };

    fetch(query, options)
        .then(response => response.json())
        .then(response => {
            const photos = response.photos;
            console.log(response);

            if (!photos.length) {
                clearContainer(error);
                clearContainer(photosList)

                const errorInfo = document.createElement("div");
                errorInfo.className = "error";
                errorInfo.innerHTML = "Przepraszamy. Niestety nie znaleźliśmy zdjęć o podanej nazwie.";

                error.appendChild(errorInfo);
                ScrollReveal().reveal(".error", {
                    delay: 80
                });
            } else {
                photos.forEach(photo => {
                    const newPhotoLink = document.createElement("a");
                    newPhotoLink.dataset.lightbox = "image";
                    newPhotoLink.dataset.title = `Autor: ${photo.photographer}`;
                    newPhotoLink.href = photo.src.large2x;

                    const newPhoto = document.createElement("img");
                    newPhoto.className = "photo";
                    newPhoto.src = photo.src.tiny;

                    newPhotoLink.appendChild(newPhoto);

                    fragment.appendChild(newPhotoLink);
                })

                clearContainer(error);
                clearContainer(photosList);

                photosList.appendChild(fragment);
                ScrollReveal().reveal(".photo", {
                    interval: 50
                });
            }
            searchInput.value = "";
        });
});

const clearContainer = (element) => {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}