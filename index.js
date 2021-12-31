const electron = require("electron");
const path = require("path");

electron.app.on("ready", () => {
    "use strict";

    const lock = electron.app.requestSingleInstanceLock();
    if (lock) {
        const main_window = new electron.BrowserWindow({
            x: 50,
            y: 50,
            width: 1600,
            height: 900,
            resizable: false,
            title: "雀魂 -じゃんたま-",
            icon: path.join(__dirname, "./icon.png"),
        });
        main_window.setMenu(null);
        main_window.loadURL("https://game.mahjongsoul.com/index.html");

        electron.app.on("second-instance", () => {
            if (main_window.isMinimized()) {
                main_window.restore();
            }
            main_window.focus();
        });
    } else {
        electron.app.quit();
    }
});
