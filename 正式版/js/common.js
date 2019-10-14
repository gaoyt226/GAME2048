// -------全局变量 begin--------
// 用于存放<div>元素id的二维数组
arr = [];
// 操作的一行
line = [];
// 队列
queue = [];
// 未合并过的元素下标
merged_elem = 3;
// 
TIME = 400;
// -------全局变量 end--------


// ------游戏的开始 begin-----------
// -------开始游戏-------
function startGame(){
    // 1. 移除已有元素
    if(arr.length != 0){
        // 上一次游戏结束, 此时arr是满的
        for(r = 0; r < 4; r++){
            for (c = 0; c < 4; c++){
                // 移除所有可移动元素
                $(arr[r][c]).remove();
            }
        }
    } // 如果刚打开页面, 此时 arr = [], 什么都不做

    // 2. 初始化
    arr = [
        [], [], [], []
    ];
    initElems();

    // 3. 随机产生2或4
    generateNewElem();
    generateNewElem();

    // 纯文字测试
    printArr('新游戏');
}
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
// ------游戏的开始 end-----------


// ------游戏的结束 begin-----------
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
    // 提示游戏失败
    alert('游戏失败');
}
// ------游戏的结束 end-----------


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
        'text-align': 'center',
        'line-height': '80px',
        'fontSize': '36px',
        'display': 'block',
        'background-color': bg_color,
        'top': top,
        'left': left,
        
    };
    return css_;
}
// ----------产生新元素 end-----------


// ---------四个方向移动需要的函数 begin-------
// --------1. 单行移动 begin-----------
function moveTo(direction){
    // direction: 'r'表示向右, 'l'表示向左, 'd'表示向下, 'u'表示向上.

    // 队列
    queue = [];

    // 未合并过的元素
    merged_elem = 3;

    for(var i = 3; i >= 0; i--){
        var elem = $(line[i]);
        if (elem.text() == 0){
            // 将零元素压入队列中
            queue.push(i);
        }else{
            // 如果队列不为空, 则移动元素
            if(queue.length != 0){
                // 1. 取出队列中的元素
                var p = queue.shift();

                // 2. i元素移动到p
                // 相对定位的位置
                var r_p = (direction == 'r' || direction == 'd');
                var position = r_p ? 6 + p * 86 : 6 + (3 - p) * 86;
                // 相对定位的方向
                var r_d = (direction == 'r' || direction == 'l');
                var r_direction = r_d ? 'left' : 'top';
                // 2.1 动画...
                var moved_css = {}
                moved_css[r_direction] = position.toString() + 'px';
                $(line[i]).animate(moved_css, (p - i) * 100);
                // 2.2 交换id
                var tmp = line[i];
                line[i] = line[p];
                line[p] = tmp;               

                // 3.a 如果还要合并
                if(p < merged_elem && $(line[p]).text() == $(line[p + 1]).text()){
                    // 合并
                    merge(p, i);
                }else{
                    // 3.b 只移动的话, 交换完id后, 需要将零元素压入队列中
                    zeroPush(p - 1, i);                 
                }
                
            }else{
                // 不移动但是可以合并
                if(i < 3 && $(line[i]).text() == $(line[i + 1]).text()){
                    // 合并
                    merge(i, i);
                }
            }
        }
    }
}
// 合并
function merge(p, i){
    // 1. 动画: p元素向右合并
    // 1.1 p元素display:none; text(0);
    $(line[p]).css({'display': 'none'}).text(0);
    // 1.2 (p+1)元素text(double);字体变化;
    var num = $(line[p + 1]).text() * 2;
    $(line[p + 1]).text(num);
    $(line[p + 1]).css({
        'background-color': colors[$(line[p + 1]).text()].bg,
        'color': '#c5274a',
    });
    // merge_elem = $(line[p + 1]);
    $(line[p + 1]).animate({
        'font-size': '48px',
    }, 100, function(){
        $(this).animate({
            'font-size': '36px',
        });
        $(this).css({
            'color': colors[$(this).text()].font,
        });
    })
    // 2. 将零元素压入队列中
    zeroPush(p, i);

    // 3. 未合并元素前移
    merged_elem--;
}
// 移动或合并后操作队列
function zeroPush(p, i){
    // 清空队列
    while(queue.length != 0){
        queue.shift();
    }
    // 将合并后的零元素压入队列中
    while(p >= i){
        queue.push(p);
        p--;
    }
}
// -------单行移动 end---------
// --------2. 反转一行--------
function reverseLine(source_line){
    var reverse_line = [];
    for(var i = 0; i < 4; i++){
        reverse_line[i] = source_line[i];
    }
    for(var j = 3; j >= 0; j--){
        source_line[3 - j] = reverse_line[j];
    }   
}
// --------3. 转置--------
function matrixArr(source_arr){
    var matrix_arr = [];
    for(var i = 0; i < 4; i++){
        var matrix_line = []
        for(var j = 0; j < 4; j++){
            matrix_line[j] = source_arr[i][j];
        }
        matrix_arr[i] = matrix_line;
    }
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            source_arr[r][c] = matrix_arr[c][r];
        }
    }
}
// --------4. 每移动一次后, 判断游戏结束还是继续产生新元素--------
function newELemORgameOver(){
    if(isGameOver()){
        doGameOver();
    }else{
        if(getZeros().length != 0){
            generateNewElem();
        }// 如果方格已满, 但游戏未结束, 且该方向上无可合并元素, 则不产生新元素
    }
}
// ---------四个方向移动通用的函数 end-------


// -----全局变量 不同数值的元素颜色--------
colors = {
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
