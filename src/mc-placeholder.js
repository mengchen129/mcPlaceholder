/**
 * Created by mengchen on 2015/6/19.
 */
(function($) {
    "use strict";

    if (!$) {
        throw new Error("Please include jQuery first.");
    }

    /**
     * check placeholder support
     * Note: IE10+ supports placeholder
     * @returns {boolean}
     */
    var isSupportPlaceholder = function() {
        return "placeholder" in document.createElement("input");
    };

    var defaults = {
        placeholderColor: "#777"
    };

    $.fn.extend({
        mcPlaceholder: function() {

            // if supports, nothing to do
            if (isSupportPlaceholder()) {
                return;
            }

            $(this).find("input[type='text'], input[type='password']").each(function() {
                var $input = $(this);
                var placeholder = $input.attr("placeholder");

                // if placeholder is not specified, nothing to do
                if (!placeholder) {
                    return;
                }

                // create a span overlay the input element
                var $overDiv = $("<span></span>");

                var inputBorderLeftWidth = parseInt($input.css("border-left-width"));

                var overColor = defaults.placeholderColor;
                var overWidth = $input.get(0).offsetWidth;
                var overHeight = $input.get(0).offsetHeight;
                var overLineHeight = overHeight + "px";
                var overTextIndent = inputBorderLeftWidth + parseInt($input.css("padding-left")) + "px";
                var overFontSize = $input.css("font-size");
                var overMarginLeft = -overWidth + "px";
                var overAlign = $input.css("text-align");

                $overDiv.text(placeholder).css({
                    color: overColor,
                    width: overWidth,
                    height: overHeight,
                    "line-height": overLineHeight,
                    "text-indent": overTextIndent,
                    "font-size": overFontSize,
                    "background": "transparent",
                    position: "absolute",
                    "margin-left": overMarginLeft,
                    "text-align": overAlign
                });

                $input.after($overDiv);

                $overDiv.bind("mousedown", function() {
                    $overDiv.hide();
                    $input.focus();
                });

                $input.bind("focus", function() {
                    $overDiv.hide();
                }).bind("blur", function() {
                    if (!$(this).val()) {
                        $overDiv.show();
                    }
                });
            });
        }
    });
})(window.jQuery);

