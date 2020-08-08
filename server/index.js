const express = require('express');
const fetcher = require('./fetchtopn');
const solver = require('./topN');
const app = express();
const port = 3000;
const redis = require('redis');
const client = redis.createClient();

console.log(fetcher);

app.get('/topn',(req, res)=>{
    console.log(req.query.number);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','http://localhost:1234');
    let number = parseInt(req.query.number);

    client.get('listsize',(err,reply)=>{
        // if(reply!=null){
        //     console.log(">",reply);
        //     if(number>reply){
        //         console.log(">",reply);
        //         number=reply;
        //     }
        // }
        console.log(number);
        client.zrevrange(['topwords',0,number-1,'WITHSCORES'],(err,rep)=>{
                if(rep.length==0){
                    console.log("From Network");
                    fetcher.fetchtopn(req.query.number).then(data=>{
                        let topList = solver.getTopN(data,req.query.number);
                        let all = ['topwords'];
                        let ret = [];
                        topList.forEach(item=>{
                            all.push(item[1]);
                            all.push(item[0]);

                            ret.push(item[0]);
                            ret.push(item[1]);
                        });
                        client.zadd(all);
                        client.set("listsize",Math.floor(topList.length));
        
                        res.send(JSON.stringify(ret));
                    });
                }else{
                    console.log("cached data");                   
                    res.send(JSON.stringify(rep));
                }
            });
    });
});

app.listen(port,()=>{
    console.log("server listening on port ",port);
});