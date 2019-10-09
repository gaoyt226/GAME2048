// -----向左移动-------
function moveL(){
    moveLU(mergeL, arr);

    movedNewELem();
}

function mergeL(l){
    var line = l;
    moveEndL(line);

    for(var i = (3 - 1); i >= 0; i--){
        var elem = $(line[i]);
        if($(line[i]).text() == $(line[i + 1]).text() && elem.text() != 0){
            // merge
            // ----不同：移动到的元素为(3 - i) - 1) | i + 1
            var length = 6 + 86*((3 - i) - 1);
            elem.animate({'left': length.toString() +'px'}, 300);
            // 将原来左边的元素的display置为'none'
            elem.css('display', 'none').text(0);
            // 合并的元素text×2
            var next = $(line[i + 1]);
            next.text(next.text() * 2);
            next.css({
                'background-color': colors[next.text()].bg,
                'color': colors[next.text()].font,
            });

            // 合并动画
            
            moveEndL(line);
        } 
        
    }    
    
}

function moveEndL(l){
    var line = l;
    for(var i = 3; i >= 0; i--){
        var elem = $(line[i]);
        if(elem.text() != 0){
            var z = zeroPositionR(line);
            if(i < z){
                // ----不同：移动到的元素为3 - z | z
                var length = 6 + 86 * (3 - z);
                elem = $(line[i])
                elem.animate({'left': length.toString() + 'px'}, 500);
                // 非零元素与零元素在arr中的值互换
                var tmp = line[z];
                line[z] = line[i];
                line[i] = tmp;
            }
        }
    }
}








