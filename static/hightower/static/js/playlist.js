/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


PlayList = function(pl, startIndex) {
    this.playList = new Array()
    this.playList[0]=pl;
    this.currentIndex = startIndex;
}

PlayList.prototype.playList;
PlayList.prototype.currentIndex;


PlayList.prototype.getCurrentItem = function() {
    if (this.playList.length == 0) {
        return {};

    } else {

        return this.playList[this.currentIndex];
    }
}

PlayList.prototype.getNextItem = function() {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > playList.length)
        return false;
    return this.playList[this.currentIndex];
}

PlayList.prototype.getPreviousItem = function() {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0)
        return false;
    return this.playList[this.currentIndex];
}

PlayList.prototype.addElement = function(key, value) {
    var currentElement = this.playList[this.currentIndex];
    var Element = eval('currentElement.' + key);
    Element = value;
}

PlayList.prototype.addComboClipURL = function(key, value) {
    var currentElement = this.playList[this.currentIndex];
    currentElement.comboClipURL = value;
}

PlayList.prototype.addPlayClipURL = function(key, value) {
    var currentElement = this.playList[this.currentIndex];
    currentElement.playClipURL = value;
}
