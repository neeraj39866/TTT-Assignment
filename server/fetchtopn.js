require('es6-promise').polyfill();
require('isomorphic-fetch');
exports.fetchtopn = function(){
    return fetch("http://terriblytinytales.com/test.txt").then(res=>{
        if(res.status==200)
            return res.text();
    }).then(data=>{
        data = data.toLowerCase();

        let dataList2 = data.split(/\s+|\?|-|\(|\)|\,|;|\"/g);
        let finalData = [];
        for(dt of dataList2){
            if(dt!==''|| dt!=='.'){
                if(dt.slice(-1)==='.')
                    finalData.push(dt.substring(0,dt.length-1));
                else
                    if(dt!==''){
                        finalData.push(dt);
                    }
            }
        }
        return finalData;
    }).catch(err=>{
        console.log(err);
    });
}