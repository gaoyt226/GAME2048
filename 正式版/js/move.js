// ----------向右移动 begin-----------
function moveR(){
    for(var i = 0; i < 4; i++){
        line = arr[i];
        moveTo('r');
    }

    setTimeout(function(){
        newELemORgameOver(); 
    }, TIME)
    

    // -----------
    printArr('右移');
    // -----------
}

// -------向左移动----------
function moveL(){
    for(var i = 0; i < 4; i++){
        line = arr[i];

        reverseLine(line);
        moveTo('l');
        reverseLine(line);
    }
    setTimeout(function(){
        newELemORgameOver(); 
    }, TIME)
    
    // -----------
    printArr('左移');
    // -----------
}

// -------向下移动----------
function moveD(){
    matrixArr(arr);
    for(var i = 0; i < 4; i++){
        line = arr[i];
        moveTo('d');
    }
    matrixArr(arr);
    setTimeout(function(){
        newELemORgameOver(); 
    }, TIME)

    // -----------
    printArr('下移');
    // -----------
}

// -------向上移动----------
function moveU(){
    matrixArr(arr);
    for(var i = 0; i < 4; i++){
        line = arr[i];

        reverseLine(line);
        moveTo('u');
        reverseLine(line);
    }
    matrixArr(arr);
    setTimeout(function(){
        newELemORgameOver(); 
    }, TIME);

    // -----------
    printArr('上移');
    // -----------
}