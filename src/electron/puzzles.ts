import sqlite3 from "sqlite3";
import { Downloader } from "nodejs-file-downloader";
import { deflate, unzip } from 'node:zlib';


export function setupLichessPuzzles() {
    const downloadStatus = downloadLichessPuzzles();
    console.log(downloadStatus)
    downloadStatus.then(
        result => createPuzzleDatabase(),
    );
    downloadStatus.catch(
        error => createPuzzleDatabase(),
    );
}


async function downloadLichessPuzzles() {
    const url = "https://database.lichess.org/lichess_db_puzzle.csv.zst"
    const downloader = new Downloader({
        url: url,
        directory: "./data/scratch", //This folder will be created, if it doesn't exist.   
    });
    const { filePath, downloadStatus } = await downloader.download(); //Downloader.download() resolves with some useful properties.
    return downloadStatus
}

    
function createPuzzleDatabase() {
    new sqlite3.Database("./database/puzzles/lichess_db_puzzle.db");
}


import { createReadStream, createWriteStream } from 'node:fs';
import { createZstdDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { PathLike } from "fs";

export async function decompress_zstd(input: PathLike, output: PathLike) {
    const zstdDecompress = createZstdDecompress();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipeline(source, zstdDecompress, destination);
}
