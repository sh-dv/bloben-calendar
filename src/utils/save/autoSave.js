
import React, {
    useState,
    useEffect,
  } from "react";

export const AutoSave = (text, callback) => {
// Handle autosaving

useEffect(() => {
  // timeoutId for debounce mechanism
  let timeoutId = null;
    // prevent execution of previous setTimeout
    clearTimeout(timeoutId);
    // change width from the state object after 150 milliseconds
    timeoutId = setTimeout(() => callback.call(), 5000);
    }, [text]);
};