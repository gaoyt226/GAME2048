// ----------向右移动 begin-----------
function moveR(){
    for(var i = 0; i < 4; i++){
        var line = arr[i];
        mergeR(line);
    }
    movedNewELem(); 
}

// --------单行移动-----------
function mergeR(line){
    // 队列
    var queue = [];

    for(var i = 3; i >= 0; i--){
        var elem = $(line[i]);
        if (elem.text() == 0){
            // 将零元素压入队列中
            queue.push(i);
        }else{
            // 如果队列不为空, 则移动元素
            if(queue.length != 0){
                // 取出队列中的元素
                var p = queue.shift();
                // 动画: 移动非零元素...
                // 如果还要合并
                if(p < 3 && $(line[i]).text() == $(line[p + 1]).text()){
                    // 合并
                    merge(line, i, p);
                    // 此时产生了两个零元素
                    queue.push(p);
                    queue.push(i);
                }else{
                    // 不需要合并
                    var position = 6 + p * 86;
                    var time = (p - i) * 300;
                    elem.animate({'left': position.toString() +'px'}, time);
                    // 交换id...
                    var tmp = line[i]
                    line[i] = line[p]
                    line[p] = tmp
                }
            }else{
                // 不移动但是可以合并
                if(i < 3 && $(line[i]).text() == $(line[i + 1]).text()){
                    // 合并
                    merge(line, i, i)
                    // 此时产生一个零元素
                    queue.push(i);
                }
            }
        }
    }
}

// 合并
function merge(line, i, p){
    // 动画...
    position = 6 + p * 86;
    var time = (p - i + 1) * 300;
    $(line[i]).animate({'left': position.toString() +'px'}, time, function(){
        // $(line[p])置为零元素...
        $(line[i]).css({'display': 'none'}).text(0);
        // $(line[p + 1])样式变化...
        var num = $(line[p + 1]).text() * 2;
        $(line[p + 1]).text(num);
        $(line[p + 1]).css({
            'background-color': colors[$(line[p + 1]).text()].bg,
            'color': 'red',
        });
        $(line[p + 1]).animate({'font-size': '48px',}, 200, function(){
            $(line[p + 1]).animate({'font-size': '36px',}, 200, function(){
                $(line[p + 1]).css({'color': colors[$(line[p + 1]).text()].font});
            });
        });
    }); 
}

// ----------向右移动 end-----------

// // -------非零元素向右移动（单行）---------
// function moveR(){
//     for(var i = 0; i< 4; i++){
//         var line = arr[i];
//         mergeR(line);
//     }
//     movedNewELem(); 
// }

// function mergeR(l){
//     var line = l;
//     moveEndR(line);

//     for(var i = (3 - 1); i >= 0; i--){
//         var elem = $(line[i]);
//         if($(line[i]).text() == $(line[i + 1]).text() && elem.text() != 0){
//             // merge
//             var length = 6 + 86*(i + 1);
//             elem.animate({'left': length.toString() +'px'}, 300);
//             // 将原来左边的元素的display置为'none'
//             elem.css('display', 'none').text(0);
//             // 合并的元素text×2
//             var next = $(line[i + 1]);
//             next.text(next.text() * 2);
//             next.css({
//                 'background-color': colors[next.text()].bg,
//                 'color': colors[next.text()].font,
//             });

//             // 合并动画
            
//             moveEndR(line);
//         } 
        
//     }    
    
// }

// function moveEndR(l){
//     var line = l;
//     for(var i = 3; i >= 0; i--){
//         var elem = $(line[i]);
//         if(elem.text() != 0){
//             var z = zeroPositionR(line);
//             if(i < z){
//                 var length = 6 + 86 * z;
//                 elem.animate({'left': length.toString() + 'px'}, 500);
//                 // 非零元素与零元素在arr中的值互换
//                 var tmp = line[z];
//                 line[z] = line[i];
//                 line[i] = tmp;
//             }
//         }
//     }
// }








