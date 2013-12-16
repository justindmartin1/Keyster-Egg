KeysterEgg = function(props){
  window.keyHistory = new Array();
  this.props = {
    callback: (props.callback !== undefined) ? props.callback : function(){alert('EASTER EGG!');},
    keyCombo: (props.keyCombo !== undefined) ? props.keyCombo.toUpperCase() : '↑↑↓↓←→←→ba',
    keyComboLength: 0
  };

  this.props.keyComboLength = this.props.keyCombo.length;

  this.bindAction();
};

KeysterEgg.prototype.bindAction = function(){
  var _this = this;
  window.onkeydown = function(e){
    _this.watchKeys(e, _this);
  };
};

KeysterEgg.prototype.isKeyComboCode = function(){
  var matchesFound = 0;
  for(var i = 0; i < window.keyHistory.length; i++){
    if(window.keyHistory[i] === 37 && this.props.keyCombo.charAt(i) === '←'){
      matchesFound++;
    }else if(window.keyHistory[i] === 38 && this.props.keyCombo.charAt(i) === '↑'){
      matchesFound++;
    }else if(window.keyHistory[i] === 39 && this.props.keyCombo.charAt(i) === '→'){
      matchesFound++;
    }else if(window.keyHistory[i] === 40 && this.props.keyCombo.charAt(i) === '↓'){
      matchesFound++;
    }else if(window.keyHistory[i] === this.props.keyCombo.charCodeAt(i)){
      matchesFound++;
    }
  }
  if(matchesFound === this.props.keyComboLength){
    return true;
  }else{
    return false;
  }
};

KeysterEgg.prototype.watchKeys = function(e, _this){
  if(_this.props.keyComboLength <= window.keyHistory.length){
    window.keyHistory = window.keyHistory.slice(1);
  }
  window.keyHistory.push(e.keyCode);

  if(_this.isKeyComboCode()){
    _this.props.callback();
  }
};