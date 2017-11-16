/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var dropdown_videotype;
var dropdown_dropChan;
var dropdown_dropNet;
var dropdownSelected;
var facetsearch="";

var matchterm=JSON.stringify({"query": {"match": "sunglass", "field": "title"},"highlight":{}, "fields":["*"],"facets": null,"explain": false});
var matchPhrase=JSON.stringify({"query": {"match_phrase": "polarized sunglass", "field": "title"}, "fields":["*"]});
var fuzzy=JSON.stringify({"query": {"term": "Pepper", "fuzziness": 2, "field": "brand"}, "fields":["*"]});
var prefix=JSON.stringify({"query": {"prefix": "1617160", "field": "asin"}, "fields":["*"]});
var regexp=JSON.stringify({"query": {"regexp": "jo[e|n]", "field": "reviews.review.reviewerName"}, "fields":["*"]});
var wildcard=JSON.stringify({"query": {"wildcard": "alina*", "field": "reviews.review.reviewerName"}, "fields":["*"]});
var conjunction=JSON.stringify({"query": {"conjuncts": [{"match": "casual", "field": "description"}, {"match": "shirt", "field": "description"}]}, "fields":["*"]});
var disjunction=JSON.stringify({"query": {"disjuncts": [{"match": "casual", "field": "description"}, {"match": "shirt", "field": "description"}]}, "fields":["*"]});
var booleans=JSON.stringify({"query": {"must": {"conjuncts": [{"match": "fashion", "field": "description"}]}, "must_not": {"disjuncts": [{"match": "trend", "field": "description"}]}}, "fields":["*"]});
var docid=JSON.stringify({"query": {"ids": ["9789814232", "9822490682"]}, "fields":["*"]});
var boolquerystr=JSON.stringify({"query": {"query": "+description:fashion -description:trend"}, "fields":["*"]});
var boostquerystr=JSON.stringify({"query": {"query": "description:fashion description:trend^5"}, "fields":["*"]});
var numericquerystr=JSON.stringify({"query": {"query": "price: > 100"}, "fields":["*"]});
var numericrange=JSON.stringify({"query": {"min": 9, "max": 10, "field": "price"}, "fields":["*"]});
var numericrangecp=JSON.stringify({"query": {"conjuncts": [{"match": "nylon", "field": "description"}, {"match": "cozy"}]}, "facets": {"category_tokens": {"field": "categories", "size": 15}}, "fields":["*"]});
/*
querystring
 matchterm
 matchPhrase
 fuzzy
 prefi
 regexp
 wildcard
 conjunction
 disjunction=
 booleans
 docid
 boolquerystr
 boostquerystr
 numericquerystr
 numericrange
 numericrangecp
*/
var querystring= matchterm;
//var querystring= JSON.stringify({"query": {"match": "sunglass", "field": "title"},"highlight":{},"fields":["*"],"facets": null,"explain": false});

$(document).ready(function() {

    $( "#mindate" ).datepicker({
        autoSize: true
    });
    $( "#maxdate" ).datepicker({
        autoSize: true
    });

    $('#querytext').keypress(function(event) {
        if ( event.which == 13 ) {
            $('#loadvideo').click();
        }
    } );
    $('#querybool').keypress(function(event) {
        if ( event.which == 13 ) {
            $('#loadvideo').click();
        }
    } );
    $('#phrasetext').keypress(function(event) {
        if ( event.which == 13 ) {
            $('#loadvideo').click();
        }
    } );
    $('#nottext').keypress(function(event) {
        if ( event.which == 13 ) {
            $('#loadvideo').click();
        }
    } );
    $('#programname').keypress(function(event) {
        if ( event.which == 13 ) {
            $('#loadvideo').click();
        }
    } );
    $('#anchorperson').keypress(function(event) {
        if ( event.which == 13 ) {
            $('#loadvideo').click();
        }
    } );
    $('#transcript').keypress(function(event) {
        if ( event.which == 13 ) {
            $('#loadvideo').click();
        }
    } );


    function handlePaginationClick(new_page_index, pagination_container) {
        // This selects 20 elements from a content array

        if(new_page_index<0)
            return false;

        var resPerPage="5"; //$("#resPerPage").val();
        var startAt=parseInt(new_page_index)*resPerPage+parseInt("1"); //$("#startAt").val();
        var sort=""

        var videotype = dropdown_videotype._gatherChoices(";");
        if(videotype!="")
            videotype=dropdown_videotype.aux.get(dropdown_videotype._gatherChoices(";")+dropdown_videotype.id).innerHTML;

        var channel= dropdown_dropChan._gatherChoices(";");
        if(channel!="")
            channel=dropdown_dropChan.aux.get(dropdown_dropChan._gatherChoices(";")+dropdown_dropChan.id).innerHTML;
        var network= dropdown_dropNet._gatherChoices(";");
        if(network!="")
            network=dropdown_dropNet.aux.get(dropdown_dropNet._gatherChoices(";")+dropdown_dropNet.id).innerHTML;




        // sort=$("#sort").val();
        var querytext=$("#querytext").val();     //query
        querybool=$("#querybool").val();     //and
        phrasetext=$("#phrasetext").val();   //ecaxta
        nottext=$("#nottext").val();           //ninguna
        programname=$("#programname").val();    //field
        anchorperson=$("#anchorperson").val();   //conductor
        transcript=$("#transcript").val();        //transcript
        mindate=$("#mindate").val();
        maxdate=$("#maxdate").val();

        getQuery(resPerPage, startAt, sort, querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network);
    getFacetQuery(resPerPage, startAt, sort, querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network);

        return false;
    }

    /* This holds the onclick for the submit button*/
    $('#loadvideo').click(function() {


        var resPerPage="1"; //$("#resPerPage").val();
        var startAt=parseInt("1"); //$("#startAt").val();
        var sort=""


        var videotype = dropdown_videotype._gatherChoices(";");
        if(videotype!="")
            videotype=dropdown_videotype.aux.get(dropdown_videotype._gatherChoices(";")+dropdown_videotype.id).innerHTML;


        var channel= dropdown_dropChan._gatherChoices(";");
        if(channel!="")
            channel=dropdown_dropChan.aux.get(dropdown_dropChan._gatherChoices(";")+dropdown_dropChan.id).innerHTML;
        var network= dropdown_dropNet._gatherChoices(";");
        if(network!="")
            network=dropdown_dropNet.aux.get(dropdown_dropNet._gatherChoices(";")+dropdown_dropNet.id).innerHTML;

        var querytext=$("#querytext").val();     //query
        querybool=$("#querybool").val();     //and
        phrasetext=$("#phrasetext").val();   //ecaxta
        nottext=$("#nottext").val();           //ninguna
        programname=$("#programname").val();    //field
        anchorperson=$("#anchorperson").val();   //conductor
        transcript=$("#transcript").val();        //transcript
        mindate=$("#mindate").val();
        maxdate=$("#maxdate").val();

        $('#totResFound').html("0");
        $('#resultlist').html(".");
		$('#resultlist1').html(".");
        $("#Pagination").html(".");
//START JSON LOAD
 /*       var json = $.getJSON(searchResultURL, {
            resPerPage:resPerPage,
            startAt:startAt,
            sort:sort,
            querytext:querytext,
            querybool:querybool,
            phrasetext:phrasetext,
            nottext:nottext,
            programname:programname,
            anchorperson:anchorperson,
            transcript:transcript,
            mindate:mindate,
            maxdate:maxdate,
            videotype:videotype,
            channel:channel,
            network:network,
            typeProgram:$("#typecontentProgram").attr("checked"),
            typeNote:$("#typecontentNote").attr("checked")
        },
        function(data) {
            $.each(data, function(i, buf) {
                $('#totResFound').html(buf.iTotalResults);
                // alert(i);
                $("#Pagination").pagination(buf.iTotalResults, {
                    items_per_page:5,

                    callback:handlePaginationClick
                });

            });

        });
//END JSON LOAD
*/
$.ajax({
    type:"POST",
	contentType: 'application/json; charset=utf-8',
    url:"http://username:password@localhost:8099/api/index/engageIT/query",
	crossDomain: true,
	data: querystring,
	headers: {"Authorization" : "Basic QWRtaW5pc3RyYXRvcjpwYXNzd29yZA=="},
    success: function(data) {
     $.each(data, function(i, buf) {
		 transcript:transcript;
                $('#totResFound').html(data.total_hits);
                // alert(i);
                $("#Pagination").pagination(data.total_hits, {
                    items_per_page:5,

                    callback:handlePaginationClick
                });

            });
    }
	
	,
    dataType: 'json',
  });
  
  
    });

    $("h2.expand").click(function() {
        $('div.resultlist').jScrollPane({
            showArrows:true,
            scrollbarWidth: 15,
            arrowSize: 16
        });
    });
    /* settings: the three types  */
  dropdown_videotype = new sFac({
        id : "dropdown_videotype",
        container : "dropdownVideoType",
        coreImages : ["clear.gif","eraser.gif","sortasc.gif","sortdesc.gif"],
        selectionImagePath : "hightower/static/images/",// leave / for root
        width: 190,
        resizable: true,// best for non-dropdowns. Tell uiSelectBox class to be padding:4px; to look nicer.
        toggleStyle : 'closed',
        type : 'dropdown',
        eraser : true,
        count : true,
        isAbsolute : true,
        absolutePosition : {
            top: -30,
            left : 0,
            z:12
        },
        maxSize: 6,
        choices :
        [
        ['0','Video','Video',false,0,["video","vide"]]

        ]
    });
    dropdown_videotype.dOuter.trigger('disable');


    dropdown_dropChan = new sFac({
        id : "dropdown_dropChan",
        container : "dropdownChannel",
        coreImages : ["clear.gif","eraser.gif","sortasc.gif","sortdesc.gif"],
        selectionImagePath : "hightower/static/images/",// leave / for root
        width: 190,
        resizable: true,// best for non-dropdowns. Tell uiSelectBox class to be padding:4px; to look nicer.
        toggleStyle : 'closed',
        type : 'dropdown',
        eraser : true,
        count : true,
        isAbsolute : true,
        absolutePosition : {
            top: -30,
            left : 0,
            z:11
        },
        maxSize: 6,
        choices :
        [
        ['0','cat','Cat',false,0,["eyes","teeth"]]
        ]
    });

    dropdown_dropChan.dOuter.trigger('disable');


    dropdown_dropNet = new sFac({
        id : "dropdown_dropNet",
        container : "dropdown_dropNetwork",
        coreImages : ["clear.gif","eraser.gif","sortasc.gif","sortdesc.gif"],
        selectionImagePath : "hightower/static/images/",// leave / for root
        width: 190,
        resizable: true,// best for non-dropdowns. Tell uiSelectBox class to be padding:4px; to look nicer.
        toggleStyle : 'closed',
        type : 'dropdown',
        eraser : true,
        count : true,
        isAbsolute : true,
        absolutePosition : {
            top: -30,
            left : 0,
            z:10
        },
        maxSize: 6,
        choices :
        [
        ['0','TvAzteca','Cat',false,0,["tvazteca","tvazteca"]]

        ]
    });
    dropdown_dropNet.dOuter.trigger('disable');




});

/*

function getQueryTagValuesChanels(querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network) {
    var json = $.getJSON(channelURL, {
        querytext:querytext,
        querybool:querybool,
        phrasetext:phrasetext,
        nottext:nottext,
        programname:programname,
        anchorperson:anchorperson,
        transcript:transcript,
        mindate:mindate,
        maxdate:maxdate,
        videotype:videotype,
        channel:channel,
        network:network,
            typeProgram:$("#typecontentProgram").attr("checked"),
            typeNote:$("#typecontentNote").attr("checked")
    },
    function(dataChan) {

        dropdown_dropChan.dOuter.trigger('enable');
        //dropdown_dropChan._removeChoices(dropdown_dropChan.uiChoices);
        var chamRem =new Array();
        $.each(dropdown_dropChan.choices, function(_i, bufCN) {
            chamRem.push(bufCN[0]+"");
        });
        dropdown_dropChan._removeChoices(chamRem);

        $.each(dataChan, function(i, buf) {
            dropdown_dropChan._addChoices([[i,buf.channelName,buf.channelName,false,0,['claws','stripes']]]);
            if (debug == 'true')
                console.debug('getQuery');
        });
    });
}
function getQueryTagValuesChains(querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network) {

    var json = $.getJSON(networkURL, {
        querytext:querytext,
        querybool:querybool,
        phrasetext:phrasetext,
        nottext:nottext,
        programname:programname,
        anchorperson:anchorperson,
        transcript:transcript,
        mindate:mindate,
        maxdate:maxdate,
        videotype:videotype,
        channel:channel,
        network:network,
            typeProgram:$("#typecontentProgram").attr("checked"),
            typeNote:$("#typecontentNote").attr("checked")
    },
    function(dataNet) {
        dropdown_dropNet.dOuter.trigger('enable');
       // dropdown_dropNet._removeChoices(dropdown_dropNet.uiChoices);
        var netRem =new Array();
        $.each(dropdown_dropNet.choices, function(_i, bufC) {
            netRem.push(bufC[0]+"");
        });
        dropdown_dropNet._removeChoices(netRem);


        $.each(dataNet, function(i, buf) {
            dropdown_dropNet._addChoices([[i,buf.chainName,buf.chainName,false,0,['claws','stripes']]]);
            if (debug == 'true')
                console.debug('getQuery');
        });
    });
}
function getQueryTagValuesSource(querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network) {
    var json = $.getJSON(programURL, {
        querytext:querytext,
        querybool:querybool,
        phrasetext:phrasetext,
        nottext:nottext,
        programname:programname,
        anchorperson:anchorperson,
        transcript:transcript,
        mindate:mindate,
        maxdate:maxdate,
        videotype:videotype,
        channel:channel,
        network:network,
            typeProgram:$("#typecontentProgram").attr("checked"),
            typeNote:$("#typecontentNote").attr("checked")
    },
    function(dataVid) {
        dropdown_videotype.dOuter.trigger('enable');
        //dropdown_videotype._removeChoices(dropdown_videotype.uiChoices);
        var vidRem =new Array();
        $.each(dropdown_videotype.choices, function(_i, bufV) {
            vidRem.push(bufV[0]+"");
        });
        dropdown_videotype._removeChoices(vidRem);

        $.each(dataVid, function(i, buf) {
            dropdown_videotype._addChoices([[i,buf.medium,buf.medium,false,0,['claws','stripes']]]);
            if (debug == 'true')
                console.debug('getQuery');
        });
    });
}
*/

function getQuery(resPerPage, startAt, sort, querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network) {
    var html="";
    var results=false;
    $('#resultlist').html("");
	
	$.ajax({
    type:"POST",
	contentType: 'application/json; charset=utf-8',
    url:"http://username:password@localhost:8099/api/index/engageIT/query",
	dataType: 'json',
	data: querystring,
	headers: {"Authorization" : "Basic QWRtaW5pc3RyYXRvcjpwYXNzd29yZA=="},
    //success: function(data) {
	
  /*  var json = $.getJSON(searchResultURL, {
        resPerPage:resPerPage,
        startAt:startAt,
        sort:sort,
        querytext:querytext,
        querybool:querybool,
        phrasetext:phrasetext,
        nottext:nottext,
        programname:programname,
        anchorperson:anchorperson,
        transcript:transcript,
        mindate:mindate,
        maxdate:maxdate,
        videotype:videotype,
        channel:channel,
        network:network,
            typeProgram:$("#typecontentProgram").attr("checked"),
            typeNote:$("#typecontentNote").attr("checked")
    },*/
    //function(data) {
		  success: function(data) {
        $.each(data.hits, function(i, buf) {
            // alert(i);
			
            html=html+addResultRow(buf);
            results=true;
            if (debug == 'true')
                console.debug('getQuery');
		});
		
        
        if(results) {
            $('#resultlist').html(html);
            $("h2.expand").toggler({
                method: "slideFadeToggle"
            });

            var ms = 500; //milliseconds
            setTimeout(function() {
                $('#resultlist').jScrollPane({
                    showArrows:true,
                    scrollbarWidth: 15,
                    arrowSize: 16
                });
                $("div.contentres").expandAll({
                    trigger: "h2.expand",
                    ref: "div.demo",
                    showMethod: "slideDown",
                    hideMethod: "slideUp",
                    speed: 200
                });
            }, ms);
    //        if(dropdownSelected!="chanels")
    //            getQueryTagValuesChanels(querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network) ;
   //         if(dropdownSelected!="chains")
    //            getQueryTagValuesChains(querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network) ;
  //          if(dropdownSelected!="source")
   //             getQueryTagValuesSource(querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network) ;
           // dropdownSelected="";
        }

        var closeModal = function(hash)
        {
            var $modalWindow = $(hash.w);

            //$('#jqmContent').attr('src', 'blank.html');
            $modalWindow.fadeOut('2000', function()
            {
                hash.o.remove();
                //refresh parent

                if (hash.refreshAfterClose === 'true')
                {

                    window.location.href = document.location.href;
                }
            });
        };
        var openInFrame = function(hash)
        {
            var $trigger = $(hash.t);
            var $modalWindow = $(hash.w);
            var $modalContainer = $('iframe', $modalWindow);
            var myUrl = $trigger.attr('href');
            var myTitle = $trigger.attr('title');
            var newWidth = 0, newHeight = 0, newLeft = 0, newTop = 0;
            $modalContainer.html('').attr('src', myUrl);
            $('#jqmTitleText').text(myTitle);
            myUrl = (myUrl.lastIndexOf("#") > -1) ? myUrl.slice(0, myUrl.lastIndexOf("#")) : myUrl;
            var queryString = (myUrl.indexOf("?") > -1) ? myUrl.substr(myUrl.indexOf("?") + 1) : null;

            if (queryString != null && typeof queryString != 'undefined')
            {
                var queryVarsArray = queryString.split("&");
                for (var i = 0; i < queryVarsArray.length; i++)
                {
                    if (unescape(queryVarsArray[i].split("=")[0]) == 'width')
                    {
                        var newWidth = queryVarsArray[i].split("=")[1];
                    }
                    if (escape(unescape(queryVarsArray[i].split("=")[0])) == 'height')
                    {
                        var newHeight = queryVarsArray[i].split("=")[1];
                    }
                    if (escape(unescape(queryVarsArray[i].split("=")[0])) == 'jqmRefresh')
                    {
                        // if true, launches a "refresh parent window" order after the modal is closed.

                        hash.refreshAfterClose = queryVarsArray[i].split("=")[1]
                    } else
{

                        hash.refreshAfterClose = false;
                    }
                }
                // let's run through all possible values: 90%, nothing or a value in pixel
                if (newHeight != 0)
                {
                    if (newHeight.indexOf('%') > -1)
                    {

                        newHeight = Math.floor(parseInt($(window).height()) * (parseInt(newHeight) / 50));

                    }
                    var newTop = Math.floor(parseInt($(window).height() - newHeight) / 2);
                }
                else
                {
                    newHeight = $modalWindow.height();
                }
                if (newWidth != 0)
                {
                    if (newWidth.indexOf('%') > -1)
                    {
                        newWidth = Math.floor(parseInt($(window).width() / 100) * parseInt(newWidth));
                    }
                    var newLeft = Math.floor(parseInt($(window).width() / 2) - parseInt(newWidth) / 2);

                }
                else
                {
                    newWidth = $modalWindow.width();
                }

                // do the animation so that the windows stays on center of screen despite resizing
                $modalWindow.css({
                    width: newWidth,
                    height: 800,
                    opacity: 0
                }).jqmShow().animate({
                    width: newWidth,
                    height: 800,
                    top: newTop,
                    left: newLeft,
                    marginLeft: 0,
                    opacity: 1
                }, 'slow');
            }
            else
            {
                // don't do animations
                $modalWindow.jqmShow();
            }

        }

        $('#modalWindow').jqm({
            overlay: 70,
            modal: true,
            trigger: 'a.thickbox',
            target: '#jqmContent',
            onHide: closeModal,
            onShow: openInFrame
        });

    }
	});
	
}
function getFacetQuery(resPerPage, startAt, sort, querytext, querybool, phrasetext, nottext, programname, anchorperson, transcript, mindate, maxdate, videotype, channel, network) {
    var html="";
    var results=false;
    $('#resultlist').html("");
	
	$.ajax({
    type:"POST",
	contentType: 'application/json; charset=utf-8',
    url:"http://username:password@localhost:8099/api/index/engageIT/query",
	dataType: 'json',
	data: JSON.stringify({"query": {"disjuncts": [{"match": "nylon", "field": "description"}, {"match": "cozy"}]}
    ,
   "highlight":{},
    "fields":["*"],
    "facets": {"category_tokens": {"field": "brand", "size": 15}},
    "explain": false
    }),
	headers: {"Authorization" : "Basic QWRtaW5pc3RyYXRvcjpwYXNzd29yZA=="},
    //success: function(data) {
	
  /*  var json = $.getJSON(searchResultURL, {
        resPerPage:resPerPage,
        startAt:startAt,
        sort:sort,
        querytext:querytext,
        querybool:querybool,
        phrasetext:phrasetext,
        nottext:nottext,
        programname:programname,
        anchorperson:anchorperson,
        transcript:transcript,
        mindate:mindate,
        maxdate:maxdate,
        videotype:videotype,
        channel:channel,
        network:network,
            typeProgram:$("#typecontentProgram").attr("checked"),
            typeNote:$("#typecontentNote").attr("checked")
    },*/
    //function(data) {
		  success: function(data) {
        $.each(data.facets.category_tokens.terms, function(i, buf) {
            // alert(i);
			
            html=html+addFacetedResultRow(buf);
            results=true;
            if (debug == 'true')
                console.debug('getQuery');
		});
		
  if(results) {
            $('#resultlist1').html(html);
  }
    }
	});
	
}

function   deleteAsset(assetId,docId,databaseName){
    var json = $.getJSON('deleteAsset.do', {
            assetId:assetId,
            docId:docId,
            dbName:databaseName
        },
        function(data) {
alert(data);
        });
}
function addResultRow(row) {

    var urlinfo="";
    var imgSrc="/vs/";
    if (row.index=="Programas") {
        urlinfo=searchAssetURL+"?assetId=";
    }else if (row.index=="note") {
        urlinfo=searchNoteURL+"?noteId=";
        imgSrc="hightower/static/images/note.png";
    }
    urlinfo=urlinfo+row.id;
   var html = "<HR size='1' color='#404040' NOSHADE><div class='container divspaceTop'>";
    html = html + "<img class='imgindenight2' src='"+imgSrc+"' alt='*'/>";
    html = html + "<em><a class='thickbox' href='"+urlinfo+"' >"  +row.id+"--"+ row.fields.title +"»</a></em>";
    html = html + "<p>"+row.fields.description+"</p>";
    html = html + "<div class='resultsSort'>"+checkEmptyNull(row.fields.brand)+"-"+checkEmptyNull(row.fields.price) +"<span class='source'>"+checkEmptyNull( row.anchorperson)+"</span><span class='network'>"+checkEmptyNull(row.networktext)+"</span></div>";
    html = html + "<div class='alignright'><div class='contentres'><div class='demo'>";
    html = html + "<h2 class='expand'>Expand+</h2><div class='collapse'><div>";
    html = html + "<table cellpadding='5' cellspacing='1' width='100%'><tbody><tr valign='top'><td style='border-right:solid 1px #cccccc;' width='50%'>";
    html = html + "<div ><div style='padding-bottom:3px'><label class='meta'>Id</label><span class='source'>"+checkEmptyNull(row.fields.asin)+"</span></div>";
    html = html + "<div style='padding-bottom:3px'><label class='meta'>"+labelProgram+"</label><span class='source'></span></div>";
    html = html + "<div style='padding-bottom:3px'><label class='meta'>"+labelChannel+"</label><span class='source'></span></div></div></td><td width='50%'>";
    html = html + "<div >	<div style='padding-bottom:3px'><label class='meta'>"+labelNetwork+"</label><span class='source'>"+checkEmptyNull(row.fields.brand)+"</span>";
    html = html + "</div><div style='padding-bottom:3px'><label class='meta'></label><span class='source'></span>";
    html = html + "</div><div style='padding-bottom:3px'><label class='meta'></label><span class='source'></span>";
    html = html + "</div></div> </td></tr></tbody></table></div></div></div> </div></div><!--Results Div. This is the one you dynamically duplicate-->";
    html = html + "</div> <!---END OF THE RESULTS LIST.-->";

    return html;

}
function addFacetedResultRow(row) {

    var urlinfo="";
    var imgSrc="/vs/";
    if (row.index=="Programas") {
        urlinfo=searchAssetURL+"?assetId=";
    }else if (row.index=="note") {
        urlinfo=searchNoteURL+"?noteId=";
        imgSrc="hightower/static/images/note.png";
    }
   // urlinfo=urlinfo+row.id;
   var html = "<HR size='1' color='#404040' NOSHADE><div class='container divspaceTop'>";
    html = html + "<img class='imgindenight2' src='"+imgSrc+"' alt='*'/>";
    html = html + "<em><a class='thickbox' href='"+urlinfo+"' >" + row.term +"("+ row.count +")</a></em>";
    html = html + "";
    html = html + "";
    html = html + "<!--Results Div. This is the one you dynamically duplicate-->";
    html = html + "</div> <!---END OF THE RESULTS LIST.-->";

    return html;

}
function checkEmptyNull(_data_)
{
    if(_data_==null)
        return"";
    return _data_;
}

  

function selectBoxItemHook(box){ //this happens when you press a select box item, now part of the tookit. defaults to nothing (as in this demo).
    // example of what you may want to write.
    if(box.id=="dropdown_videotype")
        dropdownSelected="source";
    //  else
    //      dropdown_videotype.clearIcon.triggerHandler( "click" );
    if(box.id=="dropdown_dropChan")
        dropdownSelected="chanels";
    //  else
    //      dropdown_dropChan.clearIcon.triggerHandler( "click" );
    if(box.id=="dropdown_dropNet")
        dropdownSelected="chains";
    //   else
    //       dropdown_dropNet.clearIcon.triggerHandler( "click" );

    $( "#loadvideo" ).triggerHandler( "click" );

}





