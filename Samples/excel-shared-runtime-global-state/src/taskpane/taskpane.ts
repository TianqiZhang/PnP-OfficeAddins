import { getValueForKeyCF, setValueForKeyCF, getValueForKey, setValueForKey } from "../functions/functions";
import { getGlobal } from "../commands/commands";

/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/* global document, Office */

// The initialize function must be run each time a new page is loaded
Office.initialize = () => {
  let g = getGlobal() as any;
  let keys: any[] = [];
  let values: any[] = [];
  g.state = {
    keys: keys,
    values: values,
    storageType: "globalvar"
  } as any;

  document.getElementById("sideload-msg").style.display = "none";
  document.getElementById("app-body").style.display = "flex";
  document.getElementById("btnStoreValue").onclick = btnStoreValue;
  document.getElementById("btnGetValue").onclick = btnGetValue;
  document.getElementById("globalvar").onclick = btnStorageChanged;
  document.getElementById("localstorage").onclick = btnStorageChanged;

  // eslint-disable-next-line no-undef
  CustomFunctions.associate("GETVALUEFORKEY", getValueForKeyCF);

  // eslint-disable-next-line no-undef
  CustomFunctions.associate("SETVALUEFORKEY", setValueForKeyCF);
};

function btnStoreValue() {
  // @ts-ignore
  let key = document.getElementById("txtKey").value;
  // @ts-ignore
  let value = document.getElementById("txtValue").value;
  setValueForKey(key, value);
}

function btnGetValue() {
  // @ts-ignore
  let key = document.getElementById("txtKey").value;
  // @ts-ignore
  document.getElementById("txtValue").value = getValueForKey(key);
}

// Handle updating storage mechanism when the user choose the global variable or
// local storage radio buttons.
function btnStorageChanged() {
  let g = getGlobal() as any;
  // @ts-ignore
  if (document.getElementById("globalvar").checked) {
    g.state.storageType = "globalvar";
  } else {
    g.state.storageType = "localstorage";
  }
}
