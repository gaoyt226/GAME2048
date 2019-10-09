// -------非零元素向下移动（单行）---------
function moveD(){
    // 转置
    var matrix = [
        [], [], [], []
    ]
    matrix = matrix_(arr, matrix);

    for(var i = 0; i< 4; i++){
        var line = matrix[i];
        mergeD(line);
    }

    matrix_(matrix, arr);

    movedNewELem();
}

function mergeD(l){
    var line = l;
    moveEndD(line);

    for(var i = (3 - 1); i >= 0; i--){
        var elem = $(line[i]);
        if($(line[i]).text() == $(line[i + 1]).text() && elem.text() != 0){
            // merge
            var length = 6 + 86*(i + 1);
            elem.animate({'top': length.toString() +'px'}, 300);
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
            
            moveEndD(line);
        } 
        
    }    
    
}

function moveEndD(l){
    var line = l;
    for(var i = 3; i >= 0; i--){
        var elem = $(line[i]);
        if(elem.text() != 0){
            var z = zeroPositionR(line);
            if(i < z){
                var length = 6 + 86 * z;
                elem.animate({'top': length.toString() + 'px'}, 500);
                // 非零元素与零元素在arr中的值互换
                var tmp = line[z];
                line[z] = line[i];
                line[i] = tmp;
            }
        }
    }
}








