/**
 * Created by mengchen on 2015/6/19.
 */
(function($) {
    "use strict";

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

                // create a div similar to the input element
                var $overDiv = $("<div></div>");

                var inputBorderLeftWidth = parseInt($input.css("border-left-width"));
                var inputBorderRightWidth = parseInt($input.css("border-right-width"));
                var inputBorderTopWidth = parseInt($input.css("border-top-width"));
                var inputBorderBottomWidth = parseInt($input.css("border-bottom-width"));

                var overColor = defaults.placeholderColor;
                var overWidth = $input.get(0).offsetWidth - inputBorderLeftWidth - inputBorderRightWidth;
                var overHeight = $input.get(0).offsetHeight - inputBorderTopWidth - inputBorderBottomWidth;
                var overLineHeight = overHeight + "px";
                var overTextIndent = parseInt($input.css("padding-left")) - 2 + "px";
                var overFontSize = $input.css("font-size");
                var overBackgroundColor = $input.css("background-color");
                var overLeft = $input.offset().left + inputBorderLeftWidth + "px";
                var overTop = $input.offset().top + inputBorderTopWidth + "px";

                $overDiv.text(placeholder).css({
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
                });

                $input.after($overDiv);

                $overDiv.bind("mousedown", function() {
                    $overDiv.hide();
                    $(this).prev().focus();
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

