/**
 * Created by mengchen on 2015/6/19.
 */
(function($) {
    "use strict";

    var isSupportPlaceholder = function() {
        return "placeholder" in document.createElement("input");
    };

    $.fn.extend({
        mcPlaceholder: function() {
            if (isSupportPlaceholder()) {
                return;
            }

            $(this).find("input[type='text'], input[type='password']").each(function() {
                var $input = $(this);
                var placeholder = $input.attr("placeholder");
                if (!placeholder) {
                    return;
                }

                var $overDiv = $("<div></div>");

                var overColor = "#777777";
                var overWidth = $input.get(0).offsetWidth - 4;
                var overHeight = $input.get(0).offsetHeight - 4;
                var overLineHeight = overHeight + "px";
                var overTextIndent = parseInt($input.css("padding-left")) - 2 + "px";
                var overFontSize = $input.css("font-size");
                var overBackgroundColor = $input.css("background-color");
                var overLeft = $input.offset().left + 2 + "px";
                var overTop = $input.offset().top + 2 + "px";
                $overDiv.css({
                    color: overColor,
                    width: overWidth,
                    height: overHeight,
                    "line-height": overLineHeight,
                    "text-indent": overTextIndent,
                    "font-size": overFontSize,
                    "background-color": overBackgroundColor,
                    position: "absolute",
                    left: overLeft,
                    top: overTop
                }).text(placeholder);

                $input.after($overDiv);

                $overDiv.bind("mousedown", function() {
                    $overDiv.hide();
                    $(this).prev().focus();
                });

                $input.bind("input", function() {
                    if (!$(this).val()) {
                        $overDiv.show();
                    }
                }).bind("blur", function() {
                    if (!$(this).val()) {
                        $overDiv.show();
                    }
                }).bind("focus", function() {
                    $overDiv.hide();
                });

            });
        }
    });
})(window.jQuery);

