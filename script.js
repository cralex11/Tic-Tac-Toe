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
    if (square)
        square.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) {
                const clickedItem = e.target
                let clickedItemClass = e.target.classList[1]
                if (clickedItem.classList[2] !== 'clicked') {
                    if (!clickedItemClass) {
                        clickedItemClass = e.target.parentNode.classList[1]
                    }
                    // clickedItem.appendChild(createChild('div', 'o'))
                    clickedItem.appendChild(createChild('div', 'x'))
                    clickedItem.classList.add('clicked')
                }
            }
            e.stopPropagation()
        }, false)


})()

const startScreenRender = (() => {
    const choseMode = document.querySelectorAll('.choseMode')
    const drawHash = document.querySelector('#drawHash')
    const PlayersInfo = document.querySelector('.players')
    choseMode[1].addEventListener('click', () => {
        //
        // drawHash.classList.add('change')
        // setTimeout(()=>{
        //     drawHash.style.display = 'none'
        // },500)
        //
        // setTimeout(()=>{
        //     PlayersInfo.classList.add('income')
        //     PlayersInfo.style.display = 'flex'
        // },0)
        //animation Multiplayer button press
        let anim = true
        if (anim) {
            const timeLine = gsap.timeline()
            gsap.to('#drawHash', {duration: .2, opacity: 0, x: '-25%', ease: 'back.in'})
            gsap.to('.players', {duration: .4, opacity: 1, ease: 'back.out', delay: .4})
            gsap.from('.players', {duration: .4, x: '25%', ease: 'back.out', delay: .4})
            console.log(anim)
        }
    })
    return {choseMode, drawHash, anim}
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
console.log('in 3 sec all will be deleted');
setTimeout(function () {
    clear();
}, 1000);


//test

const sandu = Player('sandu', true)








