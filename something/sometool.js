/********
DATE=2020-03-22
********/

/****
You can also use this link:
<script src="https://shc7432.github.io/public/something/sometool.js"></script>
Are you want test your code's error?You can use this link:
<script src="https://shc7432.github.io/public/getLinkInput/testcode.js"></script>
****/

(function () {

  //"use strict";

  Number.prototype.pow = function (a) {
    if (isNaN(a)) a = 1;
    return (this ** a);
  }
  String.prototype.showByAlert = function () {
    alert(this);
  }
  String.prototype.dmwrite = function () {
    document.write(this);
  }
  Object.prototype.clone = function () {
    let a = JSON.stringify(this);
    return JSON.parse(a);
  }
  NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
  }
  Object.defineProperty(Number.prototype, "pow", {
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(String.prototype, "showByAlert", {
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(String.prototype, "dmwrite", {
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Object.prototype, "clone", {
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(NodeList.prototype, "forEach", {
    writable: false,
    enumerable: false,
    configurable: true
  });

  /*
  PsTools:
  https://download.sysinternals.com/files/PSTools.zip
  */

  window.copytext = function (text) {
    /* support for new browsers */
    if (window.navigator.clipboard) {
      return window.navigator.clipboard.writeText(text);
    }

    /* supports for old browsers */ {
      if (typeof document.execCommand !== "function") {
        //alert("复制失败，请长按复制");
        return false;
      }
      var dom = document.createElement("textarea");
      dom.value = text;
      dom.setAttribute('style', 'position:absolute;top:-1000%;');
      if (document.body) {
        document.body.appendChild(dom);
      } else if (document.documentElement) {
        document.documentElement.appendChild(dom);
      } else {
        //alert("复制失败，请长按复制");
        return false;
      }
      dom.select();
      var result = document.execCommand('copy');
      if (document.body) {
        document.body.removeChild(dom);
      } else if (document.documentElement) {
        document.documentElement.removeChild(dom);
      } else {
        //alert("复制失败，请长按复制");
        return false;
      }
      if (result) {
        //alert("复制成功");
        return true;
      }
      if (typeof document.createRange !== "function") {
        //alert("复制失败，请长按复制");
        return false;
      }
      var range = document.createRange();
      var div = document.createElement('div');
      div.innerHTML = text;
      div.setAttribute('style', 'position:absolute;top:-1000%;');
      if (document.body) {
        document.body.appendChild(div);
      } else if (document.documentElement) {
        document.documentElement.appendChild(div);
      } else {
        //alert("复制失败，请长按复制");
        return false;
      }
      range.selectNode(div);
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        selection.removeAllRanges();
      }
      selection.addRange(range);
      document.execCommand('copy');
      //alert("复制成功")
      return true;
    } /* [End] supports for old browsers [enD] */
  }

  window.loadjs = window.loadJS = (function () {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = arguments[0];
    head.appendChild(script);
    if (/ie/i.test(navigator.userAgent)) return script;
    script.onload = arguments[1];
    if (typeof arguments[1] != "function") script.onload = undefined;
    return script;
  })
  String.prototype.loadJS = String.prototype.loadjs =
    String.prototype.loadJSFromThis = function () {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = this;
      head.appendChild(script);
    }
  Object.prototype.loadJS = Object.prototype.loadjs =
    Object.prototype.loadJSFromThis = function () {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = this.src;
      head.appendChild(script);
      if (/ie/i.test(navigator.userAgent)) return script;
      script.onload = this.callback;
      if (typeof this.callback != "function") script.onload = undefined;
      return script;
    };

      (function () {

        window.pwTools = new Object();
        Object.defineProperty(window, "pwTools", {
          writable: false,
          enumerable: true,
          configurable: true
        });

        pwTools.base64 = new Object();
        pwTools.base64.add = function (str) {
          return btoa(encodeURIComponent(str));
        }
        pwTools.base64.unadd = function (str) {
          return decodeURIComponent(atob(str));
        }
        Object.defineProperty(pwTools, "base64", {
          writable: false,
          enumerable: true,
          configurable: true
        });

      })();

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

})()
