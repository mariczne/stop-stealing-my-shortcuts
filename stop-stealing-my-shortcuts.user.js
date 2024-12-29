// ==UserScript==
// @name         Stop Stealing My Shortcuts
// @namespace    https://github.com/mariczne/stop-stealing-my-shortcuts
// @version      0.1.0
// @description  Prevent websites from hijacking specific keyboard shortcuts, like Chrome Tab Switcher
// @license      MIT
// @author       mariczne
// @match        https://discord.com/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @supportURL   https://github.com/mariczne/stop-stealing-my-shortcuts/issues
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // List of shortcuts to prevent from hijacking
  const blockedShortcuts = [
    { key: "a", ctrl: false, shift: true, alt: false, meta: true }, // Cmd+Shift+A
    { key: "a", ctrl: true, shift: true, alt: false, meta: false }, // Ctrl+Shift+A
    // Add other shortcuts as needed
  ];

  window.addEventListener(
    "keydown",
    function (event) {
      console.log(
        "Keydown event detected:",
        event.key,
        event.code,
        event.ctrlKey,
        event.shiftKey,
        event.altKey,
        event.metaKey
      );

      for (const shortcut of blockedShortcuts) {
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          event.ctrlKey === shortcut.ctrl &&
          event.shiftKey === shortcut.shift &&
          event.altKey === shortcut.alt &&
          event.metaKey === shortcut.meta
        ) {
          console.log("Blocked shortcut match:", event.key);
          event.stopImmediatePropagation();

          if (document.activeElement) {
            document.activeElement.blur(); // Remove focus from any element
            console.log("Blurred focus on:", document.activeElement);
          }

          const newEvent = new KeyboardEvent("keydown", {
            key: event.key,
            code: event.code,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            metaKey: event.metaKey,
            bubbles: true,
            cancelable: true,
          });

          document.dispatchEvent(newEvent);

          return;
        }
      }
    },
    true
  );
})();
