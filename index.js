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
            res.statusCode=200;
            res.setHeader("Content-Type","application/x-www-form-urlencoded; chrset=utf-8")
            let body="";
            req.on('data',(chunk)=>{
                body += chunk
            });
            req.on('end',()=>{
                const all = new URLSearchParams(body);
                const id = all.get("ss")
                const html = `<h1>${id}</h1>`
                console.log(id);
                res.write(html)
                res.end()
            })
        }
    }
})
server.listen(8080)