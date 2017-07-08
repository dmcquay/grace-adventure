'use strict'

const data = require('./adventure.json')

const inquirer = require('inquirer')

function handleStoryCard(card) {
    process.stdout.write("\u001b[2J\u001b[0;0H")
    for (let body of card.bodies) {
        console.log(body)
    }


    if (card.prompt && card.answers) {
        console.log('')
        inquirer.prompt([{
                type: 'list',
                name: 'main',
                message: card.prompt,
                choices: card.answers.map(a => ({name: a.value, value: a.next}))
            }])
            .then(answers => {
                const nextCard = data.storyCards[answers.main]
                if (nextCard) handleStoryCard(data.storyCards[answers.main])
                else console.log('It looks like this part of the story has not been written yet.')
            })
    } else {
        console.log("\nTHE END!\n\n")
    }
}

handleStoryCard(data.storyCards.start)