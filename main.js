import fs from "fs";
import pkg from 'baidu-aip-sdk';

const {HttpClient} = pkg;
const {imageProcess} = pkg;
const APP_ID = "21578702";
const API_KEY = "Ov6RYg4BoZI9SsplB1sMTngE";
const SECRET_KEY = "A5gqvZksVLksuOQQR5syIg73cTsqXNZc";
const client = new imageProcess(APP_ID, API_KEY, SECRET_KEY);

//const HttpClient = require("baidu-aip-sdk").HttpClient;
// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({timeout: 5000});
// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function (requestOptions) {
    // 查看参数
    //console.log(requestOptions)
    // 修改参数
    requestOptions.timeout = 100000;
    // 返回参数
    return requestOptions;
});


let path = "images";//输入一个目录,或者一个图片名
let pathX2 = `${path}X2`;
// fs.stat("path",(err,stats)=>{
//     if (stats.isFile()){
//
//     }
// })
fs.readdir(path, (err, files) => {
    if (err) throw err;
    fs.access(pathX2, err => {
        if (err) {
            console.log(`${pathX2}目录不存在`);
            fs.mkdir(pathX2, err => {
                if (err) throw err;
                console.log(`${pathX2}目录创建成功`);
            })
        } else {
            console.log("目录已存在");
        }
    })

    for (const file of files) {
        fs.readFile(`${path}/${file}`, {encoding: "base64"},
            (err1, data) => {
                client.imageQualityEnhance(data).then((result) => {
                    if (err1) throw err1;

                    //返回结果不为streams 所以不能使用pipe进行传输
                    // result.image.pipe(fs.createWriteStream(`${pathX2}/${file}`));
                    // console.log(`${file}正在生成中`);

                    let dataBuffer = new Buffer.from(result.image, "base64");
                    fs.writeFile(`${pathX2}/${file}`, dataBuffer, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log(`${file} 保存成功`);
                    });
                }).catch(console.error);//如果网络发生错误
            });

    }
})
