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

// All functions of section adder

btn_adder.addEventListener('click', () => {
    const adder_section = document.getElementById('adder')
    adder_section.style.display = 'block'
})

close.addEventListener('click', () => {
    const adder_section = document.getElementById('adder')
    adder_section.style.display = 'none'
})

const getSelectedCategory = () => {
    const radios = document.querySelectorAll('input[type=radio],[name="categorie"]')
    let selectedCategory
    radios.forEach(radio => {
        if (radio.checked) selectedCategory = radio.classList
    })
    return selectedCategory
}

const add_word = () => {
    const selectedCategory = getSelectedCategory()
    if (!add_english.value || !add_spanish.value || !textareas.value || !selectedCategory) {
        alert('You lacked parameters')
        return
    }

    const ids = dictionary.categories[selectedCategory].length + 1
    const new_word = {
        id: ids,
        english: add_english.value,
        spanish: add_spanish.value,
        example: textareas.value
    }
    dictionary.categories[selectedCategory].push(new_word)
    makeCard(new_word)

    add_english.value = ''
    add_spanish.value = ''
    textareas.value = ''
    document.getElementById('adder').style.display = 'none'
}

btn_add_word.addEventListener('click', add_word)

const makeCard = word => {
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

const displayAllWords = () => {
    container.innerHTML = ''
    for (const category in dictionary.categories) {
        dictionary.categories[category].forEach(word => makeCard(word))
    }
}

const firstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

const searchWord = (query, language) => {
    container.innerHTML = ''
    for (const category in dictionary.categories) {
        dictionary.categories[category].forEach(word => {
            if ((language === 'english' && word.english === query) || (language === 'spanish' && word.spanish === query)) {
                makeCard(word)
            }
        })
    }
}

input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        const query = input.value
        if (inputEnglish.checked) searchWord(query, 'english')
        else if (inputSpanish.checked) searchWord(query, 'spanish')
        else container.innerHTML = ''
    }
})

document.querySelectorAll('input[type=text], textarea').forEach(input => {
    input.addEventListener('input', event => {
        event.target.value = firstLetter(event.target.value)
    })
})

button.addEventListener('click', () => {
    const query = input.value
    if (inputEnglish.checked) searchWord(query, 'english')
    else if (inputSpanish.checked) searchWord(query, 'spanish')
    else container.innerHTML = ''
})

const sortWords = order => {
    container.innerHTML = ''
    const allWords = Object.values(dictionary.categories).flat()
    allWords.sort((a, b) => (order === 'A-Z' ? a.english.localeCompare(b.english) : b.english.localeCompare(a.english)))
    allWords.forEach(word => makeCard(word))
}

const displayCategory = category => {
    container.innerHTML = ''
    dictionary.categories[category].forEach(word => makeCard(word))
}

A_Z.addEventListener('click', () => sortWords('A-Z'))
Z_A.addEventListener('click', () => sortWords('Z-A'))

inputFruits.addEventListener('click', () => displayCategory('fruits'))
inputColors.addEventListener('click', () => displayCategory('colors'))
inputDescription.addEventListener('click', () => displayCategory('physical_descriptions'))
inputAnimals.addEventListener('click', () => displayCategory('animals'))
inputSkills.addEventListener('click', () => displayCategory('skills'))

displayAllWords()

btnReset.addEventListener('click', () => {
    location.reload()
    localStorage.clear()
    sessionStorage.clear()
})