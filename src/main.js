// src/main.js
//
// App entry point. Decides which authentication screen to show first,
// then hands control to that screen's module.
// Each screen module lives in src/authentication/ and exports a render()
// function that builds its own HTML into #app and wires up its own events.

import { invoke } from "@tauri-apps/api/core";
import { renderSetPassword } from "./authentication/setPassword.js";
import { renderLock } from "./authentication/lock.js";

const appEl = document.getElementById("app");

async function init() {
  try {
    const firstTime = await invoke("is_first_time");
    if (firstTime) {
      renderSetPassword(appEl);
    } else {
      renderLock(appEl);
    }
  } catch (err) {
    console.error("Failed to check first-time status:", err);
    renderLock(appEl); // fail safe: don't lock the user out of the whole app
  }
}

init();