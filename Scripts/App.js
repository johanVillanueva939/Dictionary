import { dictionary } from './dictionary.js'

const input = document.getElementById('input')
const container = document.getElementById('right')
const button = document.getElementById('button')
const inputSpanish = document.getElementById('spanish')
const inputEnglish = document.getElementById('english')
const A_Z = document.getElementById('A-Z')
const Z_A = document.getElementById('Z-A')
const inputFruits = document.getElementById('Fruits')
const inputColors = document.getElementById('Colors')
const inputDescription = document.getElementById('Description')
const inputAnimals = document.getElementById('Animals')
const inputSkills = document.getElementById('Skills')
// Const for adder
const btn_adder = document.getElementById('add')
const add_spanish = document.getElementById('add_spanish')
const add_english = document.getElementById('add_english')
const btn_add_word = document.getElementById('btn_add_word')
const textareas = document.getElementById('textareas')
const close = document.getElementById('close')

// All Functions of section adder
btn_adder.addEventListener('click', (() => {
    const adder_section = document.getElementById('adder')
    adder_section.style.display = 'block'
}
))

close.addEventListener('click', (() => {
    const adder_section = document.getElementById('adder')
    adder_section.style.display = 'none'
}
))

btn_add_word.addEventListener('click', add_word)

function getSelectedCategory() {
    const radios = document.querySelectorAll('input[type=radio],[name="categorie"]')
    let selectedCategory
    radios.forEach((radio) => {
        if (radio.checked) {
            selectedCategory = radio.classList
        }
    })
    return selectedCategory
}

function add_word() {
    const selectedCategory = getSelectedCategory()

    if (!add_english.value || !add_spanish.value || !textareas.value || !selectedCategory) {
        alert('Te faltaron parametros')
        return
    }else{

    let ids =dictionary.categories[selectedCategory].length + 1
    const new_word = {
        "id": ids,
        "english": `${add_english.value}`,
        "spanish": `${add_spanish.value}`,
        "example": `${textareas.value}`
    }
    console.log(new_word.id);
    const pusher =dictionary.categories[selectedCategory]
    pusher.push(new_word)
    makeCard(new_word)

    add_english.value = '' 
    add_spanish.value = '' 
    textareas.value = ''

    const adder_section = document.getElementById('adder')
    adder_section.style.display = 'none'
}

}

function makeCard(word) {
    const card = document.createElement('div')
    card.className = 'card'

    const englishText = document.createElement('p')
    englishText.textContent = 'English: ' + word.english

    const spanishText = document.createElement('p')
    spanishText.textContent = 'Spanish: ' + word.spanish

    const exampleText = document.createElement('p')
    exampleText.textContent = 'Example: ' + word.example

    card.appendChild(englishText)
    card.appendChild(spanishText)
    card.appendChild(exampleText)

    container.appendChild(card)
}




function displayAllWords() {
    container.innerHTML = ''
    for (let category in dictionary.categories) {
        const words = dictionary.categories[category]
        for (let i = 0; i < words.length; i++) {
            makeCard(words[i])
        }
    }
}

// search with key "Enter",First letter of word capitalice 

const all_inputs = document.querySelectorAll('input[type=text], textarea')

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const query = input.value
        if (inputEnglish.checked) {
            searchWord(query, 'english')
        } else if (inputSpanish.checked) {
            searchWord(query, 'spanish')
        } else {
            container.innerHTML = ''
        }
    }
})
all_inputs.forEach(input =>{
    input.addEventListener('input', function (event) {
        const input = event.target
        input.value = firstLetter(input.value)
    })

})

function firstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)

}

// Search word
function searchWord(query, language) {
    container.innerHTML = ''
    for (let category in dictionary.categories) {
        const words = dictionary.categories[category]
        for (let i = 0; i < words.length; i++) {

            if (
                (language === 'english' && words[i].english === query) || (language === 'spanish' && words[i].spanish === query)
            ) {
                makeCard(words[i])
            }
        }
    }
}

button.addEventListener('click', function () {
    const query = input.value
    if (inputEnglish.checked) {
        searchWord(query, 'english')
    } else if (inputSpanish.checked) {
        searchWord(query, 'spanish')
    } else {
        container.innerHTML = ''
    }
})


// Order by...

function sortWords(order) {
    container.innerHTML = ''
    const allWords = []

    for (let category in dictionary.categories) {
        const words = dictionary.categories[category]
        allWords.push(...words)
    }


    allWords.sort(function (a, b) {
        if (order === 'A-Z') {
            return a.english < b.english ? -1 : 1
        } else {
            return a.english > b.english ? -1 : 1
        }
    })

    for (let i = 0; i < allWords.length; i++) {
        makeCard(allWords[i])
    }
}


function displayCategory(category) {
    container.innerHTML = ''
    const words = dictionary.categories[category]
    for (let i = 0; i < words.length; i++) {
        makeCard(words[i])
    }
}

A_Z.addEventListener('click', function () {
    sortWords('A-Z')
})

Z_A.addEventListener('click', function () {
    sortWords('Z-A')
})

inputFruits.addEventListener('click', function () {
    displayCategory('fruits')
})

inputColors.addEventListener('click', function () {
    displayCategory('colors')
})

inputDescription.addEventListener('click', function () {
    displayCategory('physical_descriptions')
})

inputAnimals.addEventListener('click', function () {
    displayCategory('animals')
})

inputSkills.addEventListener('click', function () {
    displayCategory('skills')
})

displayAllWords()

btnReset.addEventListener('click', () => {
    location.reload()
    localStorage.clear()
    sessionStorage.clear()

})
