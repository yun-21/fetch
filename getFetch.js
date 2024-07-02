const http = require('http')
const fs = require('fs')
const getUrl = {
  filePath : (url)=>{
    let filePath;
    if(url === "/"){
        filePath = "./public/getFetch.html";
    }
    else{
      filePath = "./public" + url
    }
    return filePath;
  }
}

const server = http.createServer((req,res)=>{
  let url = getUrl.filePath(req.url);
  if(req.method==='GET'){
    fs.readFile(url, (err,data)=>{
      if(err){
        if(err.code === "ENOENT"){
          res.writeHead(404, {"Content-Type":"text/html"});
          res.end("페이지를 찾을 수 없습니다.");
        }
        else{
          res.writeHead(500);
          res.end(`서버 오류: ${err.code}`);
        }
      }
      else{
        res.writeHead(200,{'Content-Tpye':'text/javascirpt; charset=utf-8'});
        res.write(data);
        res.end();
      }
    })
  }
})

server.listen(8080,(err)=>{
  if(err){
    console.error(err)
  }
  console.log(`http://locahost:8080`)
})