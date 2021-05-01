import {createGzip} from "zlib";
import {pipeline} from "stream";
import {createReadStream, createWriteStream} from "fs";
const gzip = createGzip();
const source = createReadStream('images');
const destination = createWriteStream('3.txt.gz');

pipeline(source, gzip, destination, (err) => {
    if (err) {
        console.error('发生错误:', err);
        process.exitCode = 1;
    }
});