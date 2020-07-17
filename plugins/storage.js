"use strict";
/**
 * storage util
 * @2020.04.01
 * @local data will store for two place => [localStorage, cookie]
 */
export default function({ app }, inject) {
  const isServer = process.server //区分端
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

          if (isServer) {
            if (null === value || undefined === value || "" === value)
              expire = new Date(
                startTime.setTime(startTime.getTime() - expire * 24 * 3600 * 1000)
              )
            else
              expire = new Date(
                startTime.setTime(startTime.getTime() + expire * 24 * 3600 * 1000)
              )

              app.$cookiz.set(name.trim(), escape(value), {
                path: '/',
                expires: expire
              })

            resolve();
          }
          else {
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
              )
            else
              expire = new Date(
                startTime.setTime(startTime.getTime() + expire * 24 * 3600 * 1000)
              )

              app.$cookiz.set(name.trim(), escape(value), {
                path: '/',
                expires: expire
              })
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    getVal: name => {
      if (null === name || undefined === name || "" === name) {
        throw TypeError("storage getVal parmes name can not be null.");
      }
      try {
        let result = ""
        if (isServer) {
          return JSON.parse(unescape(app.$cookiz.get(name.trim())))
        }
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
        return JSON.parse(unescape(app.$cookiz.get(name.trim())))
      } catch (e) {
        return "";
      }
    }
  };
  inject('storage', storage)
}
