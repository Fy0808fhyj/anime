import fs from "fs";
let path="G:\\newNodeJs\\puppeteercore\\outputImages X2"
fs.readdir(path,
    (err, files) => {
    if (err) throw err;
    else {
        fs.readFile(`${path}\\${files[0]}`,
            (err1, data) => {
            if(err1) throw err;
            else {
                console.log( data.toJSON());
                // let dataBuffer=new Buffer.from(data,"base64")
                fs.writeFile("1.txt",data,(err2)=>{
                    if (err2) throw err2;
                    else {
                        console.log("图片保存成功");
                    }

                })
            }
            })
    }
    })