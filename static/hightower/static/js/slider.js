/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var slider;
(function() {

    var Event = YAHOO.util.Event,
    Dom = YAHOO.util.Dom,
    lang = YAHOO.lang,
    bg = "slider-bg", thumb = "slider-thumb",
    valuearea = "slider-value"

    // The slider can move 0 pixels up
    var topConstraint = -1;

    // The slider can move 200 pixels down
    var bottomConstraint = 150;

    // Custom scale factor for converting the pixel offset into a real value
    var scaleFactor = 1;

    // The amount the slider moves when the value is changed with the arrow
    // keys
    var keyIncrement = 1;

    var tickSize = 1;

    Event.onDOMReady(function() {


        slider = YAHOO.widget.Slider.getHorizSlider(bg,
            thumb, topConstraint, bottomConstraint, 1);

        // Sliders with ticks can be animated without YAHOO.util.Anim
        slider.animate = true;
        slider.keyIncrement = 1;
        slider.tickSize = 1;

        slider.getRealValue = function() {

            return Math.round(this.getValue() * scaleFactor);
        }

        slider.subscribe("change", function(offsetFromStart) {

            var valnode = Dom.get(valuearea);


            // Display the pixel value of the control
            valnode.innerHTML = Math.round(offsetFromStart * 2) - 2;


        });

        slider.subscribe("slideStart", function() {
            YAHOO.log("slideStart fired", "warn");
        });

        slider.subscribe("slideEnd", function() {
            if (slider.valueChangeSource == 2)
                return;
            var currentItem = $.playList.getCurrentItem();
            var assetId = currentItem.assetId;
            var isEncoding;
            var autostart = 'true';
            var startTime;
            var timeShift = 'true';
            var videoTime;
            if (typeof currentItem.assetId == 'undefined') {
                var message = messagenoasset;
                alert(message);
                return;
            }
            isEncoding = isAssetEncoding(assetId);

            if (isEncoding == false) {
                var message = messagenotencoding;
                alert(message);
                return;
            }
            setPlayButtonImage('pause');
            var timeShiftURL = currentItem.timeShiftURL;
            if (timeShiftURL == "" || (typeof timeShiftURL == 'undefined')) {
                var fileName = 'tempfile_';
                var extension = '01.asf';
                fileName = fileName + extension;
                var tempURL = currentItem.mmsUrl;
                tempURL = tempURL.replace('wmstream2', 'wmondemandtemp2');
                tempURL = tempURL.replace('wmstream', 'wmondemandtemp');
                tempURL = tempURL + "/" + fileName;
                $.playList.addElement("timeShiftURL", tempURL);
                currentItem.timeShiftURL = tempURL;
                startTime = '0';
                setEncodingHighlight(0);
                setEncodingVideoTime(1, 0);
            }
            else {
                startTime = '0';
                currentItem.timeShiftURL = timeShiftURL;
                var n = getNumberFromString(timeShiftURL);

                n = slider.getValue();

                var fileName = 'tempfile_';
                var seconds_duration = (n - 1) * 120 * 1000;
                var extension;
                setEncodingVideoTime(n, seconds_duration);
                if (n < 10) {

                    extension = '00' + n.toString() + '.asf';

                } else if (n >= 10 && n < 100) {

                    extension = '0' + n.toString() + '.asf';
                }
                if(n >= 100) {
                    extension =  n.toString() + '.asf';
                }

                fileName = fileName + extension;
                var tempURL = currentItem.mmsUrl;
                tempURL = tempURL.replace('wmstream2', 'wmondemandtemp2');
                tempURL = tempURL.replace('wmstream', 'wmondemandtemp');
                tempURL = tempURL + "/" + fileName;
                $.playList.addElement("timeShiftURL", tempURL);
                currentItem.timeShiftURL = tempURL;
                if (debug == 'true')
                    console.debug("playFromTextTracks (timeShiftURL):" + tempURL);
                startTime = '0';
                setEncodingHighlight(seconds_duration);
            }

            var editingPlayer = loadEditingVideo(currentItem, startTime, autostart, isEncoding, timeShift);
            addEncodingListener();
        });


        // Use setValue to reset the value to white:
        Event.on("putval", "click", function(e) {
            slider.setValue(100, false); //false here means to animate if possible
        });

        // Use the "get" method to get the current offset from the slider's start
        // position in pixels.  By applying the scale factor, we can translate this
        // into a "real value
        Event.on("getval", "click", function(e) {
            YAHOO.log("Current value: " + slider.getValue() + "\n" +
                "Converted value: " + slider.getRealValue(), "info", "example");
        });

        try {
            var currentItem1 = $.playList.getCurrentItem();
            var assetId1 = currentItem1.assetId;
            var isEncoding1 = isAssetEncoding(assetId1);
            var yu = $("#slider-bg");


            if (isEncoding1 == false)
                yu.css("visibility", "hidden");
        } catch(exc)
{
            yu.css("visibility", "hidden");
        }
    });
})();
