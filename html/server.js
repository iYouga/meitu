const http = require("http");
const url = require("url");
const path = require("path");
const router = require("./router");

const server = http.createServer((req,res)=>{
        if(req.url!=="/favicon.ico"){
            var pathname = url.parse(req.url,true).pathname;
            pathname = pathname.replace(/\//,"");
            if(path.extname(pathname)==".html"){
                router.allhtml(pathname,res);
            } else if(path.extname(pathname)==".css"){
                router.allcss(pathname,res);
            } else if(path.extname(pathname)==".js"){
                router.alljs(pathname,res);
            } else if(path.extname(pathname)==".ico"){
                router.allico(pathname,res);
            } else if(path.extname(pathname)==".png"){
                router.allpng(pathname,res);
            } else if(path.extname(pathname)==".jpg"){
                router.alljpg(pathname,res);
            } else{
                router[pathname](req,res);
            }
        }
    });
server.listen(666,"10.35.167.88",function(){
    console.log("running");
});
