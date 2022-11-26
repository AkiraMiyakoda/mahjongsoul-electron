// Copyright (c) 2022 Akira Miyakoda
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { app, BrowserWindow } = require("electron");
const path = require("path");
const Store = require("electron-store");
const store = new Store();

const DEFAULT_PLACEMENT = [50, 50, 1600, 900];

app.on("ready", () => {
    "use strict";

    const lock = app.requestSingleInstanceLock();
    if (lock) {
        const placement = store.get("window.placement") || DEFAULT_PLACEMENT;
        const main_window = new BrowserWindow({
            x: placement[0],
            y: placement[1],
            width: placement[2],
            height: placement[3],
            title: "雀魂 -じゃんたま-",
            icon: path.join(__dirname, "./icon.png"),
        });
        main_window.setMenu(null);
        main_window.loadURL("https://game.mahjongsoul.com/index.html");

        main_window.on("close", () => {
            store.set("window.placement", [...main_window.getPosition(), ...main_window.getSize()]);
        });

        app.on("second-instance", () => {
            if (main_window.isMinimized()) {
                main_window.restore();
            }
            main_window.focus();
        });
    } else {
        app.quit();
    }
});
