exports.getTopN = function(data,number){
    let frequencies = {};
    data.forEach(item=>{
        if(!frequencies[item])
            frequencies[item]=1;
        else
            frequencies[item] += 1;
    });
    let keysSorted = [];
    for (let freq in frequencies) {
        keysSorted.push([freq, frequencies[freq]]);
    }
    
    keysSorted.sort(function(a, b) {
        return a[1] - b[1];
    });
    return keysSorted.reverse();
}