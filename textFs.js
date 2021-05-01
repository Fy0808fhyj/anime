import fs from "fs";
fs.stat("./images",(err,stats)=>{
    if (err) throw err;
    console.log(stats.isDirectory());
    console.log(stats.isFile());
})