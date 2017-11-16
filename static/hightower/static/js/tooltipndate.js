 function display_c() {

        var refresh = 1000; // Refresh rate in milli seconds

        mytime = window.setTimeout('display_ct()', refresh);
    }

    function display_ct() {
        var now = new Date();

        var x = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
        document.getElementById('ct').innerHTML = x;

        tt = display_c();
        //document.write();
    }

    function xstooltip_findPosX(obj)
    {
      var curleft = 0;
      if (obj.offsetParent)
      {
        while (obj.offsetParent)
            {
                curleft += obj.offsetLeft
                obj = obj.offsetParent;
            }
        }
        else if (obj.x)
            curleft += obj.x;
        return curleft;
    }

function xstooltip_findPosY(obj)
{
    var curtop = 0;
    if (obj.offsetParent)
    {
        while (obj.offsetParent)
        {
            curtop += obj.offsetTop
            obj = obj.offsetParent;
        }
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}
    function xstooltip_show(tooltipId, parentId, posX, posY)
{
    it = document.getElementById(tooltipId);

    if ((it.style.top == '' || it.style.top == 0)
        && (it.style.left == '' || it.style.left == 0))
    {
        // need to fixate default size (MSIE problem)
        it.style.width = it.offsetWidth + 'px';
        it.style.height = it.offsetHeight + 'px';

        img = document.getElementById(parentId);

        // if tooltip is too wide, shift left to be within parent
        if (posX + it.offsetWidth > img.offsetWidth) posX = img.offsetWidth - it.offsetWidth;
        if (posX < 0 ) posX = 0;

        x = xstooltip_findPosX(img) + posX;
        y = xstooltip_findPosY(img) + posY;

        it.style.top = y + 'px';
        it.style.left = x + 'px';
    }

    it.style.visibility = 'visible';
}
    function xstooltip_hide(id)
{
    it = document.getElementById(id);
    it.style.visibility = 'hidden';
}