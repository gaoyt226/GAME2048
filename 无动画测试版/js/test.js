function printArr(){
    // console.log('----------')
    for(var m = 0; m < 4; m++){
        var mm = arr[m];
        var ll = [];
        for(var j = 0; j < 4; j++){
            ll[j] = $(mm[j]).text();
        }
        console.log(ll);
    }
}