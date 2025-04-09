const express = require("express");
const path = require('path')
const app = express();
// const { json } = require("express");
// 启⽤ JSON 解析中间件
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // 允许的HTTP ⽅法
    res.header("Access-Control-Allow-Headers", "Content-Type"); // 允许的请求头
    
    //浏览器在发送实际请求之前会发送一个OPTION请求，以确认服务器是否允许该跨域请求
    if (req.method === "OPTIONS") {
    return res.sendStatus(200); // 直接响应预检请求
    }
    
    next();
});

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})
// 处理 POST 请求
app.post("/api", (req, res) => {
    const requestBody = req.body; // 获取请求体
    console.log("接收到的请求体:", JSON.stringify(requestBody,null,2));//注意这里要把请求体转为字符串格式
    res.json({ status: "success", data: requestBody });
});

app.listen(3000, () => console.log("后端运⾏在 http://localhost:3000"));
