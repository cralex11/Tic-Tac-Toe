'use strict'
console.log("Script is loaded successful")

/* -------------------------------------------------------------------------- */
//                              Main functions
/* -------------------------------------------------------------------------- */


/*------ Chose GameMode Single/Multi ------*/


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


/*------ func that render game ------*/
const gameplay = (() => {
    const square = document.querySelector(".square")
    //note: din a 5-a oara poate fi facuta primul castig

    let steps = 0,
        gameArr = [
            ['x', 'o', 'x'],
            ['x', 'o', 'x'],
            ['x', 'o', 'x']
        ]

    const gameOver = () => {
        console.log('Game Over')
        alert('gameOver')
    }

    let checkWinner = (() => {
        alert('script is loaded')
        let winCheck = 0
        for (let i = 0; i <= 3; i++) {
            if (winCheck === 3) {
                gameOver()
                break
            } else if (i === 3) break

            let sign = gameArr[i][0]
            console.log(sign)
            winCheck = 0

            for (let j = 0; j < 3; j++) {
                console.log(gameArr[i][j] + '   j')

                if (sign === gameArr[i][j])
                    winCheck++
            }
        }
    })()

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

    const changeSign = (clickedItem) => {
        let sign = ''
        if (steps < 9) {
            if (steps % 2 === 1)
                sign = 'x'
            else
                sign = 'o'
            clickedItem.appendChild(createChild('div', sign.toString()))
            steps++
            return sign
        }
    }

    //find square order
    const getSquareNumber = () => {
        let number = clickedItem.classList[1].match(/\d+/)[0]
        return parseInt(number)

    }

    const insertSquareToArr = () => {
        let count = 0,
            squareOrder = getSquareNumber()
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++){
                if (count === squareOrder)
                    gameArr[i][j] = 
                count++
            }
                }
    //toggle class on click to add x or o
    if (square)
        square.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget && e.target.classList.contains('miniSquare')) {
                const clickedItem = e.target
                let clickedItemClass = e.target.classList[1]
                if (clickedItem.classList[2] !== 'clicked') {
                    if (!clickedItemClass) {
                        clickedItemClass = e.target.parentNode.classList[1]
                    }

                    //change sign from x to o
                    changeSign(clickedItem);

                    //find square order
                    getSquareNumber()

                    // clickedItem.classList.add('clicked')
                }
            }
            e.stopPropagation()
        }, false)

    return {checkWinner, gameArr}
})()

const startScreenRender = (() => {
    const choseMode = document.querySelectorAll('.choseMode')
    const drawHash = document.querySelector('#drawHash')
    const PlayersInfo = document.querySelector('.players')

    //multiplayer button click action
    choseMode[1].addEventListener('click', () => {

    })
    //one event listener for all buttons
    const mainBoardFooter = document.querySelector('.main-board__footer')
    if (mainBoardFooter)
        mainBoardFooter.addEventListener('click', (e) => {
            if (e.target.getAttribute('type') === 'button') {
                const butt = e.target
                //check if the button is multiplayer and add gsap animation
                if (butt.classList.contains('multiPlayer')) {
                    //multiplayer switch animation
                    anim.multiplayer()
                } else if (butt.classList.contains('singlePlayer')) {

                } else if (butt.classList.contains('start')) {
                    if (document.querySelectorAll('.playerName')[0].value.length !== 0 && document.querySelectorAll('.playerName')[0].value.length !== 0)
                        anim.start()
                }

            }
        })


    // h1 click to reload page
    const mainHeader = document.querySelector('.title')
    mainHeader.addEventListener('click', () => {
        rel()
        console.log('hmm, works')
    })


    return {choseMode}
})()

const anim = (() => {
    const multiplayer = () => {
        const timeLine = gsap.timeline({defaults: {duration: .4}})
        timeLine.to('#drawHash', {duration: .3, opacity: 0, x: '-25%', ease: 'back.in'})
            .to('.players', {opacity: 1, ease: 'back.out'})
            .from('.players', {x: '25%', ease: 'back.out'}, '-=.4')
            .to('.choseMode', {
                duration: .2, scale: 0, display: 'none', ease: 'back.in', x: (i, elem, buttons) => {
                    return i % 2 === 1 ? -100 : 100
                }
            }, '-=.6')
            .fromTo('.start', {duration: 0, scale: 0}, {
                display: 'flex',
                scale: 1,
                ease: 'back.out'
            }, '-=.4')
    }
    const start = () => {
        const tl = gsap.timeline({defaults: {duration: .45}})
        tl.to('.start', {scale: 0, y: '-180'})
            .to('.players__labels', {
                scale: 0,
                y: (i) => {
                    return i % 2 === 1 ? -40 : 30
                }
            }, '-=.5')
            .to('.options', {duration: 0, display: 'none'})
            .to('#game-board', {duration: 0, display: 'flex'})
            .to('.square', {duration: 0, display: 'grid', scale: 0})
            .to('.square', {scale: 1, ease: 'back.out'})

        //todo: to change it(func)
        document.querySelector('#game-board').style = 'align-items: center;\n'

    }
    return {multiplayer, start}
})()


// const choseMode = (() => {
//     const gameBoard = document.getElementById('game-board')
//     const single = document.getElementById('single')
//     const multi = document.getElementById('multi')
//
//     const clearBoard = () => {
//         gameBoard.innerHTML = ''
//     }
//
//     if (multi)
//         multi.addEventListener('click', () => {
//
//             clearBoard()
//
//         })
//
//     return {multi, clearBoard}
// })()

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

//handy functions
const clear = () => {
    console.clear();
}
const rel = () => {
    location.reload();
}
// console.log('in 3 sec all will be deleted');
// setTimeout(function () {
//     clear();
// }, 1000);


//test

const sandu = Player('sandu', true)

// gameplay.checkWinner(gameplay.gameArr)






