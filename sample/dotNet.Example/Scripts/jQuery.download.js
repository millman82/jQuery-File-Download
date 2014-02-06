/*
 * --------------------------------------------------------------------
 * jQuery Download Plugin v1.1.0 - allows for simple get/post requests for files
 * by Scott Jehl, scott@filamentgroup.com and Tim Miller, millman82@gmail.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/jquery_plugin_for_requesting_ajax_like_file_downloads/
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * --------------------------------------------------------------------
 */
 
(function ($) {
    $.extend({
        download: function (url, data, method) {
            if ($.isFunction(url) || $.isFunction(url, data)) {
                method = 'get';
            }

            var inputs = '';
            if (url && data) {
                //data can be string of parameters or array/object
                if (typeof data == 'string') {
                    //split params into form inputs
                    jQuery.each(data.split('&'), function () {
                        var pair = this.split('=');

                        inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
                    });
                } else {
                    if (Array.isArray(data)) {
                        data = jQuery.param(data);

                        jQuery.each(data.split('&'), function () {
                            var pair = this.split('=');

                            // Remove the characters that would be added for an array.  We want a list of inputs sharing the same name
                            // to represent the array matching a $.ajax({traditional: true}); ajax call.
                            pair[0] = pair[0].replace(/%5B%5D$/, '');

                            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
                        });
                    } else {
                        jQuery.each(data, function (k, v) {
                            if (typeof v == 'string') {
                                inputs += '<input type="hidden" name="' + k + '" value="' + v + '" />';
                            } else {
                                jQuery.each(v, function (key, val) {
                                    inputs += '<input type="hidden" name="' + k + '" value="' + val + '" />';
                                });
                            }
                        });
                    }
                }
            }

            $('<form action="' + url + '" method="' + method + '" enctype="application/x-www-form-urlencoded; charset=UTF-8;">' + inputs + '</form>').appendTo('body').submit().remove();
        }
    });
})(jQuery);
