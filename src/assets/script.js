const inputPlaceholder = document.getElementById("search");
const txt = [
    "Wyszukaj zdjęcia",
    "Wpisz frazę",
    "np. forest, animals, sea",
    "Wyszukaj zdjęcia"
]
let activeLetter = -10;
let activeText = 0;

const TypingInput = () => {
    if (activeLetter >= 0) {
        inputPlaceholder.placeholder += txt[activeText][activeLetter];
    }
    activeLetter++;
    if (activeLetter === txt[activeText].length) {

        activeText++;
        if (activeText === txt.length) return;

        return setTimeout(() => {
            activeLetter = -10;
            inputPlaceholder.placeholder = '';
            TypingInput();
        }, 2000)
    }
    setTimeout(TypingInput, 100)

}

TypingInput();