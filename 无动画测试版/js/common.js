// ----全局变量， arr是用于存放<div>元素id的二维数组-----
arr = [];

// -----初始化 begin---------
function initElems(){
    for(r = 0; r < 4; r++){
        for (c = 0; c < 4; c++){
            arr[r][c] = '#' + r + c;
            var id = r.toString() + c.toString();
            initElem(id);
        }
    }
}

function initElem(id){
    // 初始化一个display为none的<div>元素，并插入'#elems'父元素中
    var elem = $('<div></div>');
    elem.text(0);
    elem.prop('id', id);
    elem.css({'display': 'none'});
    $('#elems').append(elem);
}
// ------初始化 end----------


// --------产生新元素 begin-------
function generateNewElem(){
    var res = generateLocNum();
    var r = res.row;
    var c = res.col;
    var n = res.num;
    $(arr[r][c]).css(newElemCSS(r, c, n)).text(n);
    // $(arr[r][c]).fadeIn(10000);
}
// -----零元素数组---------
function getZeros(){
    var arr_zero = []
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            if ($(arr[r][c]).text() == 0){
                arr_zero[arr_zero.length] = [r, c];
            }
        }
    }
    return arr_zero;
}
// ------新元素的位置及数值---------
function generateLocNum(){
    var zeros_ = getZeros();
    var length = zeros_.length;
    if (length == 0){
        return;
    }
    var loc = zeros_[Math.floor(Math.random()*length)];
    var num = (Math.floor(Math.random()*10) == 1 ? 4 : 2);
    var result = {
        'row': loc[0],
        'col': loc[1],
        'num': num,
    }
    return result;
}
// -----新元素样式---------
function newElemCSS(r, c, n){
    var top = 6 + r * 86 + 'px';
    var left = 6 + c * 86 + 'px';
    var bg_color = colors['2'].bg;

    // 背景颜色选择
    switch (n){
        case 2: 
            break;
        case 4:
            bg_color = colors['4'].bg;
            break;
    }
    css_ = {
        'position': 'absolute',
        'width': '80px',
        'height': '80px',
        'border-radius': '5px',
        'color': '#506776',
        // d0d9db   506776
        'text-align': 'center',
        'line-height': '80px',
        'fontSize': '36px',
        // 将display置为block；
        'display': 'block',
        'background-color': bg_color,
        'top': top,
        'left': left,
        
    };
    return css_;
}
// ----------产生新元素 end-----------

// ------游戏的开始和结束 begin-----------
// -------判断游戏是否结束----------
function isGameOver(){
    if (getZeros().length != 0) return false;
    for(var r = 0; r < 4; r++){
        for(var c= 0; c < 3; c++){
            if($(arr[r][c]).text() == $(arr[r][c + 1]).text() || 
               $(arr[c][r]).text() == $(arr[c + 1][r]).text())
            {
                return false;
            }
        }
    }
    return true;
}

// ---------游戏结束做的事情--------
function doGameOver(){
    // 弹框询问是否继续
    alert('重新开始');
}

// ---------重置游戏----------
function newGame(){
    if(arr.length == 0) return;
    for(r = 0; r < 4; r++){
        for (c = 0; c < 4; c++){
            $(arr[r][c]).remove();
        }
    }
    arr = [];
}

// -------开始游戏-------
function startGame(){
    newGame();
    arr = [
        [], [], [], []
    ];
    initElems();
    generateNewElem();
    generateNewElem();

    console.log('=====开始 start======');
    printArr();
}
// ------游戏的开始和结束 end-----------

// ---------四个方向移动通用的函数 begin-------
// 1. 四个方向都要用到的：最靠右的零元素位置
function zeroPositionR(l){
    var z = 3;
    var line = l;
    while (z >= 0){
        if ($(line[z]).text() != 0){
            z--;
        }else{
            break;
        }
    }
    return z;
}

// 2. 转置
function matrix_(source, target){
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            target[r][c] = source[c][r];
        }
    }
    return target;
}

// 3. 向左移动需要对单行进行反转，向上移动中也要用到这一步骤，故封装一个函数，简洁代码
function moveLU(func, array){
    for(var i = 0; i< 4; i++){
        var line = array[i];
        var reverse = []

        // 反转line中元素的位置
        for(var j = 3; j >= 0; j--){
            reverse[3 - j] = line[j];
        }
        func(reverse);

        // 将最终的reverse也反转给arr
        for(var j = 3; j >= 0; j--){
            line[3 - j] = reverse[j];
        }
        array[i] = line;
    }
}
// 4. 移动完后产生新元素
function movedNewELem(){
    // 禁掉方向按钮的可点击性...
    // $('#right').prop("disabled", "disabled");
    // setTimeout(sleep, 1500);
    // function sleep(){
    //     if(isGameOver()){
    //         doGameOver();
    //     }else{
    //         generateNewElem();
    //         // 解禁方向按钮的不可点击性...
    //         // $('#right').removeAttr("disabled");
    //     }
    // }

    if(isGameOver()){
        doGameOver();
    }else{
        generateNewElem();
        // 解禁方向按钮的不可点击性...
        // $('#right').removeAttr("disabled");
    }
}
// ---------四个方向移动通用的函数 end-------

// -----全局变量 不同数值的元素颜色--------
colors = {
    // '0': '#873738',

    '2': {
        'bg': "#c2dcd4",
        'font': "#506776"
    },
    '4': {
        'bg': '#e9d597',
        'font': "#506776"
    },
    '8': {
        'bg': '#dbaa7a',
        'font': "#506776"
    },
    '16': {
        'bg': '#599493',
        'font': "d0d9db"
    },
    '32': {
        'bg': '#ec7768',
        'font': "#506776"
    },
    '64': {
        'bg': '#b0ca91',
        'font': "#506776"
    },
    '128': {
        'bg': '#4f7776',
        'font': "d0d9db"
    },
    '256': {
        'bg': '#c55473',
        'font': "d0d9db"
    },
    '512': {
        'bg': '#a17455',
        'font': "d0d9db"
    },
    '1024': {
        'bg': '#528a92', 
        'font': "d0d9db"
    },
    '2048': {
        'bg': '#873738', 
        'font': "d0d9db"
    },
}











