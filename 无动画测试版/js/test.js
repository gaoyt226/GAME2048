// -----纯文字打印, 用于测试-----
function printArr(description){
    console.log('======' + description + '=====');
    for(var r = 0; r < 4; r++){
        var test = arr[r];
        var t_line = [];
        for(var j = 0; j < 4; j++){
            t_line[j] = $(test[j]).text();
        }
        console.log(t_line);
    }
}