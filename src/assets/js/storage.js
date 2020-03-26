"use strict";
/**
 * storage util
 * @2018.04.16
 * @local data will store for two place => [localStorage, cookie]
 */

const storage = {
  setVal: (name, value, expire = 30, startTime = new Date()) => {
    if (null === name || undefined === name || "" === name) {
      throw TypeError("storage setVal parmes name can not be null.");
    }
    return new Promise((resolve, reject) => {
      try {
        try {
          value = value ? JSON.stringify(value) : "";
        } catch (e) {
          value = value || "";
        }

        try {
          if (null === value || undefined === value || "" === value)
            window.localStorage.removeItem(name.trim());
          else
            window.localStorage.setItem(
              name.trim(),
              escape(
                JSON.stringify({
                  expires: new Date().getTime() + expire * 24 * 3600 * 1000,
                  value: value
                })
              )
            );
        } catch (e) {
          console.log("Current browser has enabled Non-trace mode.");
        }

        if (null === value || undefined === value || "" === value)
          expire = new Date(
            startTime.setTime(startTime.getTime() - expire * 24 * 3600 * 1000)
          ).toGMTString();
        else
          expire = new Date(
            startTime.setTime(startTime.getTime() + expire * 24 * 3600 * 1000)
          ).toGMTString();

        document.cookie =
          name.trim() +
          "=" +
          escape(value) +
          "; expires=" +
          expire +
          "; path=/;";

        resolve();
      } catch (e) {
        reject();
      }
    });
  },
  getVal: name => {
    if (null === name || undefined === name || "" === name) {
      throw TypeError("storage getVal parmes name can not be null.");
    }
    try {
      let result = "";
      try {
        let localData = unescape(window.localStorage.getItem(name.trim()));
        try {
          localData = JSON.parse(localData);
        } catch (e) {
          console.dir(e);
        }

        if (localData) {
          if (new Date().getTime() > localData.expires) {
            storage.setVal(name.trim(), null);
            return result;
          } else {
            try {
              result = JSON.parse(localData.value);
            } catch (e) {
              result = localData.value;
            }
          }
        }
        return result;
      } catch (e) {
        console.log("Current browser has enabled Non-trace mode.");
      }

      let cookieStr = document.cookie,
        cookieArr = cookieStr ? cookieStr.split(";") : [];

      let item = cookieArr
        .map(val => {
          return { name: val.split("=")[0], value: val.split("=")[1] };
        })
        .find(val => {
          return val.name.trim() === name.trim();
        });

      if (item && (result = unescape(item.value))) {
        try {
          result = JSON.parse(result);
        } catch (e) {
          console.dir(e);
        }
      }

      return result;
    } catch (e) {
      return "";
    }
  }
};

export default storage;
