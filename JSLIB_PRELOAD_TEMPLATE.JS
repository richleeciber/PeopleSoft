<script>
    var jQurl = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';

    var jsurls = [];
    jsurls.push('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
    jsurls.push('https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js');
    jsurls.push('https://cdnjs.cloudflare.com/ajax/libs/parsley.js/2.3.11/parsley.min.js');
    jsurls.push('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.1/js/bootstrap-datepicker.min.js');

    var linkurls = [];
    linkurls.push('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
    linkurls.push('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.1/css/bootstrap-datepicker3.min.css');

    function loadScript(url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function() {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function loadOtherScripts(callback) {
        var matchIndex = 0;
        for (var i = 0; i < jsurls.length; i++) {
            var jsname = jsurls[i].substring(jsurls[i].lastIndexOf('/') + 1, jsurls[i].length);
            if ($("script[src$='" + jsname + "']").length == 0) {
                matchIndex = i;
            }
        }
        if (matchIndex > 0) {
            for (i = 0; i < jsurls.length; i++) {
                jsname = jsurls[i].substring(jsurls[i].lastIndexOf('/') + 1, jsurls[i].length);
                if ($("script[src$='" + jsname + "']").length == 0) {
                    if (matchIndex == i) {
                        loadScript(jsurls[i], function() {
                            finalFunctions();
                        });
                    } else {
                        loadScript(jsurls[i], function() {});
                    };
                };
            }
            for (i = 0; i < linkurls.length; i++) {
                var linkname = linkurls[i].substring(linkurls[i].lastIndexOf('/') + 1, linkurls[i].length);
                if ($("link[href$='" + linkname + "']").length == 0) {
                    var mylink = document.createElement('link');
                    mylink.rel = 'stylesheet';
                    mylink.href = linkurls[i];
                    document.getElementsByTagName("head")[0].appendChild(mylink);
                };
            }
        } else {
            finalFunctions();
        }

    }

    if (window.jQuery) {
        // jQuery is loaded
        loadOtherScripts();
    } else {
        // jQuery is not loaded
        loadScript(jQurl, function() {
            loadOtherScripts();
        });

    }


    function finalFunctions() {

	// put your custom js here!

    }
</script>