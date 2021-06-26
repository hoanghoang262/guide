const imgList = [
    {
        name : "caffe",
        img : "caffe.jpg"
    },
    {
        name:"cheeseburger",
        img:"cheeseburger.png"
    },
    {
        name:"fries",
        img:"fries.png"
    },
    {
        name:"hotdog",
        img:"hotdog.png"
    },
    {
        name:"ice-cream",
        img:"ice-cream.png"
    },
    {
        name:"milkshake",
        img:"milkshake.png"
    },
    {
        name:"pizza",
        img:"pizza.png"
    },
    {
        name:"donut",
        img:"donut.jpg"
    }
]


winGame = function(e){
    point = document.querySelector('h3 > span')
    point.innerHTML = parseInt(point.innerHTML) + e
    inputElement.value = 0
    round = document.querySelector('h1 > span')
    round.innerHTML = parseInt(round.innerHTML)+1
}

//Enter table size
inputElement = document.querySelector("#selectTableSize")
tableSize = inputElement.value
//create table game when user enter table size 
inputElement.onchange = function(){
    //delete old table
    oldTable = document.querySelector(".gameTable")
    if(oldTable){
        oldTable.remove()
    }
    //create new table contain 
    tableSize = inputElement.value
    tableGame = document.createElement("div")
    tableGame.classList.add("gameTable")
    //setup attribute 
    Object.assign(tableGame.style,{
        display : "flex",
        flexWrap: "wrap",
        position: "relative",
        margin: "auto"
    })
    document.body.appendChild(tableGame)
    tableGame.style.width = `${100*tableSize+5*(tableSize)*2}px`
    //add list display item by random
    let choosenNumber = parseInt(tableSize*tableSize/2)
    let choosenItem = []
    for(let i=0 ; i<choosenNumber ; i++){
        let random = Math.floor(Math.random()*8)
        let item = imgList[random].img
        if(choosenItem.includes(item)==false){
            choosenItem.push(item)
        }
        else{
            i--;
        }
    }

    let listItem = Array.apply(null,Array(choosenItem.length*2)) 
    for(let i=0;i<choosenItem.length;i++){
        for(let j=0;j<2;j++){
            let random = Math.floor(Math.random()*(choosenItem.length*2))
            if(listItem[random] == null){
                listItem[random] = choosenItem[i]
            } 
            else{
                j--
            }
        }
    }
    if(tableSize % 2 ==1){
        listItem.splice(listItem.length/2,0,"store.jpg")
    }
    for(let i=0;i<tableSize*tableSize;i++){
        let newElement = document.createElement("div")
        newElement.classList.add("gameObject")
        let gameItem = document.createElement("img")      
        gameItem.classList.add("number"+i) 
        gameItem.setAttribute("src","./images/blank.png")
        if(tableSize % 2 ==1 && i==4){
            gameItem.setAttribute("src","./images/store.jpg")
        }
        newElement.appendChild(gameItem) 
        tableGame.appendChild(newElement)
    }
    //Gameplay 
    let cardItems = document.querySelectorAll(".gameObject")
    let count=0
    let location=-99
    let inprocess=false
    let timeWait = 600
    let winCount = 0;
    let getPoint = tableSize*100;
    for(let i=0;i<listItem.length;i++){
        let cardObject = cardItems[i];
        cardObject.onmousedown = function (){
            if(inprocess==false){
                let img = cardObject.querySelector("img")
                img.setAttribute("src","./images/"+listItem[i])
                count=count+1;
                if(location==i){
                    count--
                }

                if(count==1){
                    location=i
                }
                else{
                    inprocess=true
                    if(listItem[location]==listItem[i]){
                        setTimeout(() => {
                            inprocess=false
                            document.querySelector(".number"+i).parentElement.style.cursor='default'
                            document.querySelector(".number"+location).parentElement.style.cursor='default'
                            document.querySelector(".number"+i).remove()
                            document.querySelector(".number"+location).remove()
                            winCount ++
                            if(winCount == choosenItem.length){
                                winGame(getPoint)
                            }
                        }, timeWait);
                    }
                    else{
                        setTimeout(() => {
                           inprocess=false
                           document.querySelector(".number"+i).setAttribute("src","./images/blank.png")
                           document.querySelector(".number"+location).setAttribute("src","./images/blank.png")
                           location = - 99 
                        }, timeWait); 
                    }
                    count=0
                }
            }
        }
    }
}



