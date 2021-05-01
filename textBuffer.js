import axios from "axios"
import fs from "fs";
axios.get("https://dss1.bdstatic.c" +
    "om/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/http" +
    "s/global/img/nicon_10750f3.png").then(response=>{
    console.log(response.data instanceof fs.WriteStream);
})