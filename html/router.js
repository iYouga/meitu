const fs = require("fs");
const querystring = require("querystring");
const userinfosdb = require("./userinfosdb");

var fun =  {
    "allhtml":function(filename,res){
        fs.readFile(filename,"utf8",(err,data)=>{
            if(err){
                console.log(err);
            }
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            res.write(data,"utf8");
            res.end();
        });
    },
    "allcss":function(filename,res){
        fs.readFile('../' + filename,(err,data)=>{
            if(err){
                console.log(err);
            }
            res.writeHead(200,{"Content-Type":"text/css;charset=utf-8"});
            res.write(data);
            res.end();
        });
    },
    "alljs":function(filename,res){
        fs.readFile('../' + filename,(err,data)=>{
            if(err){
                console.log(err);
            }
            res.writeHead(200,{"Content-Type":"text/javascript;charset=utf-8"});
            res.write(data);
            res.end();
        });
    },
    "allico":function(filename,res){
        fs.readFile('../' + filename, 'binary',(err, data) => {
            if(err){
                console.log(err);
            }            
            res.writeHead(200, {'Content-Type': 'faviocn/ico'})
            res.write(data, 'binary')
            res.end()
        })
    },
    "allpng":function(filename,res){
        fs.readFile('../' + filename, 'binary',(err, data) => {
            if(err){
                console.log(err);
            }
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.write(data, 'binary')
            res.end()
        })
    },
    "alljpg":function(filename,res){
        fs.readFile('../' + filename, 'binary',(err, data) => {
            if(err){
                console.log(err);
            }
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.write(data, 'binary')
            res.end()
        })
    },
    "regSave":function(req,res){
        var postStr="";
        req.on("data",function(chunk){
            postStr+=chunk;
        });
        req.on("end",function(){
            var queryObj = querystring.parse(postStr);
            console.log(queryObj.username);
            console.log(queryObj.userpass);
            userinfosdb.add(queryObj.username,queryObj.userpass,function(issuccess){
                if(issuccess){
                    res.write("<script>location.href = 'login.html'</script>");
                }else{
                    res.write(`
                    <script src="https://cdn.bootcss.com/jquery/1.8.3/jquery.js"></script>
                    <script>
                        history.back();
                        $('.info').fadeIn().html('该手机号码已经被注册').addClass('info_down');
                        setTimeout(function(){
                            $('.info').fadeOut(300,function(){
                                $('.info').removeClass('info_down');
                            });
                        },2000);
                    </script>`);
                }
                res.end();
            });
        });
    },
    "loginCheck":function(req,res){
        var postStr="";
        req.on("data",function(chunk){
            postStr+=chunk;
        });
        req.on("end",function(){
            var queryObj = querystring.parse(postStr);
            console.log(queryObj.username);
            console.log(queryObj.userpass);
            userinfosdb.find({"username":queryObj.username,"userpass":queryObj.userpass},function(issuccess){
                if(issuccess){
                    res.write("<script>location.href = 'index.html'</script>");
                }else{
                    res.write(`<script>history.back();</script>`);
                }
                res.end();
            });
        });

    }
}

module.exports = fun;