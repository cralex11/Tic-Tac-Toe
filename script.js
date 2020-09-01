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

    // variables
    let steps = 0,
        currentSign = '',
        gameArr = [/*
            'o', 'x', 'o',
            'x', 'x', 'o',
            'o', 'o', 'x'*/
            'a', 'b', 'c',
            'd', 'f', 'g',
            'e', 'j', 'h'
        ]

    const gameOver = () => {
        console.log('Game Over')
        alert('gameOver')
    }

    // check if player has won
    const checkWinner = () => {
        if (gameArr.length > 5) {
            console.log(`checking...`)
            let winCheck = 0,
                sign,
                gameArr2d = [],
                gameArrCopy = [...gameArr]

            while (gameArrCopy.length) gameArr2d.push(gameArrCopy.splice(0, 3));

            const horizontalCheck = () => {
                winCheck = 0
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        sign = gameArr2d[i][0]
                        if (sign === gameArr2d[i][j])
                            winCheck++
                    }
                    if (winCheck >= 3) {
                        return 1
                    } else winCheck = 0

                }
            }
            const verticalCheck = () => {
                winCheck = 0
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        sign = gameArr2d[0][i]
                        if (sign === gameArr2d[j][i])
                            winCheck++
                    }
                    if (winCheck >= 3) {
                        return 1
                    } else winCheck = 0

                }
            }
            const mainDiagonalCheck = () => {
                winCheck = 0
                sign = gameArr2d[0][0]
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (i === j)
                            if (sign === gameArr2d[i][j])
                                winCheck++
                    }
                }
                if (winCheck >= 3) {
                    return 1
                }
            }
            const secondaryDiagonalCheck = () => {
                winCheck = 0
                sign = gameArr2d[0][2]
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if ((i + j) === 2)
                            if (sign === gameArr2d[i][j])
                                winCheck++
                    }
                }
                if (winCheck >= 3) {
                    return 1
                }
            }

            //    checking for winner
            if (horizontalCheck()
                || verticalCheck()
                || mainDiagonalCheck()
                || secondaryDiagonalCheck()) {
                gameOver()
                console.log(horizontalCheck(), verticalCheck(), mainDiagonalCheck(), secondaryDiagonalCheck())
            }
        }
    }

    //create DOM for X and O visualization
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

    //change sign (x or o)
    const changeSign = (clickedItem) => {
        if (steps < 9) {
            if (steps % 2 === 0)
                currentSign = 'x'
            else
                currentSign = 'o'
            clickedItem.appendChild(createChild('div', currentSign))
            steps++
        }
    }

    //find square order
    const getSquareNumber = (clickedItem) => {
        let number = clickedItem.classList[1].match(/\d+/)[0]
        return parseInt(number) - 1

    }

    //insert signs into an array
    const insertSquareToArr = (clickedItem) => {
        let squareOrder = getSquareNumber(clickedItem)
        for (let i = 0; i < 9; i++)
            if (i === squareOrder) {
                gameArr[i] = currentSign
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
                    changeSign(clickedItem)

                    //find square order
                    insertSquareToArr(clickedItem)
                    //add class clicked to miniSquare to prevent multiple signs in one square
                    clickedItem.classList.add('clicked')
                    // check winner
                    checkWinner(gameArr)
                }
            }
            e.stopPropagation()
        }, false)


    return {/*checkWinner,*/ gameArr}
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
                    //todo: to revert

                    // if (document.querySelectorAll('.playerName')[0].value.length !== 0 && document.querySelectorAll('.playerName')[0].value.length !== 0)
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






