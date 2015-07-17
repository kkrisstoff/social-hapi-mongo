(function (win) {
    win.anyImgApp = win.anyImgApp || {};
    var anyImgNetwork = {};

    var proxyEnabled = true,
        proxyURL = 'http://184.168.88.94/eWorkwell/Request.aspx?uri=',
        BASE_URL = (proxyEnabled ? proxyURL : '') + "http://techsett-01.cloudapp.net/WorkWell/WWAnalytics/",
        defaultHeaders = {
            //"Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache,max-age=0",
            "Pragma": "no-cache"
        };

    var reqTypesMap = {
        delete_image: deleteImage
    };
    anyImgNetwork.sendRequest = function (reqType, data) {
        if (typeof reqTypesMap[reqType] == "function"){
            reqTypesMap[reqType](data);
        }
    };
    function sendRequest(data) {
        var type = data.type || "GET",
            id = data.id || "",
            baseUrl = data.baseUrl || BASE_URL,
            path = baseUrl + data.path + id,
            success = data.success || function () {};

        ajaxRequest({
            type: type,
            path: path,
            success: success,
            error: data.error || function () { }
        });
    }

    function ajaxRequest(obj) {
        var headers = obj.headers ? $.extend(defaultHeaders, obj.headers) : defaultHeaders,
            url = obj.path,
            body = obj.data ? JSON.stringify(obj.data) : null,
            beforeSend = function () {
                if (obj.hasOwnProperty("before") && typeof obj.before == 'function') {
                    obj.before();
                }
            },
            success = function (data, status, jqXHR) {
                var parsed = parseJSON(data);
                console.log("success: " + data);
                if (obj.hasOwnProperty("success") && typeof obj.success == 'function'){
                    obj.success(parsed);
                }
            },
            error = function (jqXHR, statusString, errorThrown) {
                console.log(jqXHR.status);
                console.error(errorThrown);
                if (obj.hasOwnProperty("error") && typeof obj.error == 'function') {
                    obj.error(errorThrown);
                }
            },
            complete = function (jqXHR, status) {
                if (obj.hasOwnProperty("complete") && typeof obj.complete == 'function') {
                    obj.complete(jqXHR, status);
                }
            };

        $.ajax({
            type: obj.type,
            url: url,
            data: body,
            headers: headers,
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            timeout: obj.timeout || 90000,
            beforeSend: beforeSend,
            success: success,
            error: error,
            complete: complete
        });
    }

    function parseJSON(raw) {
        var response = (raw !== '') ? raw : '{}';
        try {
            response = JSON.parse(response);
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
        } catch (e) {
            console.error('Server Response is not JSON');
            console.error(e);
            response = {};
        }

        return response;
    }


    function deleteImage(data) {
        var type = "DELETE",
            id = data.id;
        ajaxRequest({
            type: type,
            path: '/image/delete/' + id,
            success: data.success
        });
    }
    win.anyImgApp.Network = anyImgNetwork;
})(window);
