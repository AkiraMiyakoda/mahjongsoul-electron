// Copyright (c) 2024 Akira Miyakoda
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

"use strict";

import { app, BrowserWindow } from "electron";
import Store from "electron-store";
import { URL } from "url";

const DEFAULT_PLACEMENT = [50, 50, 1600, 900];
const GAME_URL = new URL("https://game.mahjongsoul.com/index.html");

app.on("ready", async () => {
    const store = new Store();

    const lock = app.requestSingleInstanceLock();
    if (lock) {
        const placement = store.get("window.placement") || DEFAULT_PLACEMENT;
        const mainWindow = new BrowserWindow({
            x: placement[0],
            y: placement[1],
            width: placement[2],
            height: placement[3],
            title: "雀魂 -じゃんたま-",
        });
        mainWindow.setMenu(null);

        mainWindow.on("close", () => {
            store.set("window.placement", [...mainWindow.getPosition(), ...mainWindow.getSize()]);
        });

        app.on("second-instance", () => {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        });

        await mainWindow.loadURL(GAME_URL.href);
    } else {
        app.quit();
    }
});
