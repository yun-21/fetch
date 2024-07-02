import http from 'http'
import fs from 'fs'
let port = 8080;
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
          response.writeHead(404, {"Content-Type":"text/html"});
          response.end("페이지를 찾을 수 없습니다.");
        }
        else{
          response.writeHead(500);
          response.end(`서버 오류: ${err.code}`);
        }
      }
      else{
        res.writeHead(200,{'Content-Tpye':'text/html; charset=utf-8'});
        res.write(data);
        res.end();
      }
    })
  }
})

server.listen(port,(err)=>{
  if(err){
    console.error(err)
  }
  console.log(`http://locahost:${port}`)
})