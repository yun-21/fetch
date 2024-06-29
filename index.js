const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const server = http.createServer((req,res)=>{
    if(req.method==='GET'){
        if(req.url==='/'){
            fs.readFile("index.html","utf8",(err,data)=>{
                if(err){
                    console.error("에러 : ", err)
                } else{
                    res.statusCode=200;
                    res.setHeader("Content-Type","text/html; chrset=utf-8")
                    res.write(data)
                    res.end()
                }
            })
        }
    } else if(req.method==='POST'){
        if(req.url === '/test'){
            let body="";
            req.on('data',(chunk)=>{
                body += chunk
            });
            req.on('end',()=>{
                const all = JSON.parse(body);
                const id = all.ss;
                const html = `<h1>${id}</h1>`
                console.log(id);
                res.statusCode=200;
                res.setHeader("Content-Type","application/json; chrset=utf-8")
                res.write(html)
                res.end()
            })
        }
    }
})
server.listen(8080,(err)=>{
    if(err){
        console.error(err);
    }
    console.log("http://localhost:8080")
})