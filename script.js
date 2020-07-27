'use strict'
console.log("Script is loaded successful")


const choseMode = (() => {
    const gameBoard = document.getElementById('game-board')
    const single = document.getElementById('single')
    const multi = document.getElementById('multi')

    const clearBoard = () => {
        gameBoard.innerHTML = ''
    }

    if (multi)
        multi.addEventListener('click', () => {

            clearBoard()

        })

    return {multi, clearBoard}
})()

//player function to create player with stats and proprieties
const Player = (name, isFirst) => {
    this.name = name
    this.PlayerScore = 0
    this.isFirst = isFirst
    this.sign = 'o';

    //functions
    (() => {
        if (this.isFirst)
            this.sign = 'x'
    })()

    const incrementSore = () => {
        this.PlayerScore++;
    }

    const changeOrder = () => {
        this.isFirst = !this.isFirst
    }
    return {sign, name, isFirst, PlayerScore, changeOrder, incrementSore}
}


const gameplay = (() => {
    const square = document.querySelector(".square")
    const createChild = (tag = 'div', className = '', id = '') => {
        const child = document.createElement(tag)
        if (className) {
            child.setAttribute('class', className.toString())
        }

        if (className) {
            child.setAttribute('id', id.toString())
        }
        return child
    }

    //toggle class on click to add x or o
    square.addEventListener('click', (e) => {
        if (e.target !== e.currentTarget) {
            const clickedItem = e.target
            let clickedItemClass = e.target.classList[1]
            if (clickedItem.classList[2] !== 'clicked') {
                if (!clickedItemClass) {
                    clickedItemClass = e.target.parentNode.classList[1]
                }
                clickedItem.appendChild(createChild('div', 'o'))
                // clickedItem.appendChild(createChild('div', 'x'))
                clickedItem.classList.add('clicked')
            }
        }
        e.stopPropagation()
    }, false)


})()

// const squares = document.getElementsByClassName('miniSquare'),
//     ToggleClass = () => {
//         [].map.call(squares, function (elem) {
//                 elem.classList.remove('animCircle')
//             }
//         )
//         this.classList.add('animCircle')
//     }
// [].map.call(squares, function (elem) {
//     elem.addEventListener('click', ToggleClass, false)
// })


//test

const sandu = Player('sandu', true)

//handy functions
const clear = () => {
    console.clear();
}
const rel = () => {
    location.reload();
}
console.log('in 3 sec all will be deleted');
setTimeout(function () {
    clear();
}, 1000);







