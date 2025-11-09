import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js"
import { decompress_zstd, setupLichessPuzzles } from "./puzzles.js";

setupLichessPuzzles()

// decompress_zstd("./data/scratch/lichess_db_puzzle.csv.zst", "./data/scratch/lichess_db_puzzle.csv")
//   .catch((err) => {
//     console.error('An error occurred:', err);
//     process.exitCode = 1;
//   });

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});
    if (isDev()) {
        mainWindow.loadURL("http://localhost:5123");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
    }
    mainWindow.loadFile(path.join(app.getAppPath(),  "/dist-react/index.html"))
})
