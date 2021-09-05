/****
sTools javascript
========
CreateDate: 2020-08-28
LastUpdataDate: 2021-09-05
========
#END#
========
****/
(function (window, document, disabled, extjs_list) {
    
    if (disabled) return false;

    /**
     * loadjs(a,b,c,d)
     * @brief Load a JavaScript file from URL
     * @param a source or a config object
     * @param b config object
     * @param c callback function
     * @param d error handler
     * @returns the script element
     * @example loadjs("/test.js");
     * @example loadjs("/test.js",{async:true});
     * @example loadjs({
     *  src: "/test.js",
     * callback: function(){
     *  /kill @p
     * }
     * })
     */
    function loadjs(a, b, c, d) {
        /**
        @a src or config
        @b config
        @c callback
        @d error handler
        */
        let script = document.createElement('script');
        script.type = "javascript";

        if (typeof (a) == "string") script.src = a;
        if (typeof (a) == "object") {
            script.src = (a.src || a.href || script.src);
            script.async = a.async;
            script.onload = a.callback || a.onload;
            script.onerror = a.onerror;
        }
        else if (typeof (b) == "object") {
            script.src = (b.src || b.href || script.src);
            script.async = b.async;
            script.onload = b.callback || b.onload;
            script.onerror = b.onerror;
        };
        if (script.src === undefined) script.src = "PLACEHOLDER";
        if (script.async === undefined) script.async = false;
        if (script.onload === undefined && typeof (c) == 'function') script.onload = c;
        if (script.onerror === undefined && typeof (d) == 'function') script.onerror = d;

        document.head.appendChild(script);
        return script;
    }

    var s = function (IMPORT_FUNCTION) {
        const RUN_FUNCTION = IMPORT_FUNCTION ? function () {
            //Defined variable
            //Not yet
            //Run function
            return IMPORT_FUNCTION();
        } : false;
        if (new.target) {
            return RUN_FUNCTION ? RUN_FUNCTION() : s.prototype;
        }
        if (!IMPORT_FUNCTION) return s.prototype;
        return RUN_FUNCTION()
    };
    //Config parameter
    s.noConflict = function () {
        return delete window.sTools ? this : false;
    };
    s.unins000 = s.uninstall = function () {
        return delete window.sTools && delete window.gadgetsInDomainShc7432;
    };
    s.addItem = function (itemname, itemcontent) {
        try { if (typeof (itemname) != "string") return false; }
        catch (e) { return false; }
        return (s[itemname] = s.prototype[itemname] = itemcontent) ? true : false;
    };
    s.removeItem = function (itemname) {
        var s = window.gadgetsInDomainShc7432;
        return delete s[itemname] && delete s.prototype[itemname];
    };
    s.addItem('loadjs', loadjs);
    //load JavaScript
    s.addItem('loadDependJs', function () {
        let l = extjs_list.length;
        for (let i = 0; i < l; ++i) {
            loadjs(extjs_list[i]);
        }
        delete s.removeItem('loadDependJs');
    });
    // DO NOT 
    //set toString
    // (function set_functions_toString(obj) {
    //     function F() {
    //         return ("function(){\n" +
    //             "  [native code]\n}")
    //     };
    //     for (let i in obj) {
    //         let sp = obj;
    //         if (typeof sp[i] == 'function') {
    //             sp[i].toString = F;
    //         } else if (typeof sp[i] == 'object') {
    //             set_functions_toString(sp[i]);
    //         } else continue;
    //     };
    //     if (typeof obj == 'function') obj.toString = F;
    // })(s);
    //ok&set window variable
    window.sTools = window.gadgetsInDomainShc7432 = s;
})(window, document, false, [
    'https://shc7432.github.io/public/something/sometool.js',
    'https://shc7432.github.io/public/something/dialog.js',
    'https://shc7432.github.io/cdn/js/stools/copytext.js',
    'https://shc7432.github.io/cdn/js/stools/add-ons.js',
    'https://shc0743.github.io/test/files/compression.js',
]);
