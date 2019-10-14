// ----------向右移动 begin-----------
function moveR(){
    for(var i = 0; i < 4; i++){
        var line = arr[i];
        moves(line, 'r');
    }

    console.log('======移动=====');
    printArr();

    movedNewELem(); 

    console.log('=====新元素======');
    printArr();
}

// --------单行移动-----------
function moves(line, direction){
    // direction: 'r'表示向右, 'l'表示向左

    // 队列
    var queue = [];

    // 未合并过的元素
    var merged_elem = 3;

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
                var position = direction == 'r' ? 6 + p * 86 : 6 + (3 - p) * 86;
                // 2.1 动画...
                // 2.2 交换id
                var tmp = line[i];
                line[i] = line[p];
                line[p] = tmp;               

                // 3.a 如果还要合并
                if(p < merged_elem && $(line[p]).text() == $(line[p + 1]).text()){
                    // 合并
                    merge(line, p, i, queue, merged_elem);
                }
            }else{
                // 不移动但是可以合并
                if(i < 3 && $(line[i]).text() == $(line[i + 1]).text()){
                    // 合并
                    merge(line, i, i, queue, merged_elem);
                }
            }
        }
    }
}

// 合并
function merge(line, p, i, queue, merged_elem){
    // console.log('***********')
    // 1. 动画: p元素向右合并
    // 1.1 p元素display:none; text(0);
    $(line[p]).text(0);
    // console.log('-----------------------', $(line[p]).text())
    // 1.2 (p+1)元素text(double);字体变化;
    var num = $(line[p + 1]).text() * 2;
    $(line[p + 1]).text(num);

    // 清空队列
    while(queue.length != 0){
        queue.shift();
    }
    // 2. 将合并所产生的零元素压入队列中
    while(p >= i){
        queue.push(p);
        p--;
    }

    // 3. 未合并元素前移
    merged_elem--;
}









