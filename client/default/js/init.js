

$fh.ready({}, function(){
  $fh.push({act:'receive'}, function(notification){
    receive_push(notification);
  }, function(err){
  })
})

/**
 * Customize following callbacks in your application
*/

// Customized callback for receiving notification
var receive_push = function (notification) {
    var msg = '';
    for (var property in notification) {
        msg += property + ' : ' + notification[property] + '<br>';
    }
    message.innerHTML='notification received:<br><br>' + msg;
};

// when APN register succeeded
function successCallback(e) {
  if(e.deviceToken){
    result.innerHTML="Device registered. Device token:<br>" + e.deviceToken + '.<br><br>';
    result.innerHTML += "Now registering with UrbanAirship...";
    $fh.act({act:'registerUA', req:{deviceToken: e.deviceToken}}, function(res){
      if(res.result == 'ok'){
        result.innerHTML += "Registration Finishied.<br>";
      } else {
        result.innerHTML += "Error when registering with UrbanAirship.<br>";
      }
    })
  } else if(e.apid){
    result.innerHTML="Device registered. Push Id:<br>" + e.apid + '.<br><br>';
  }
}

// when APN register failed
function errorCallback(e) {
    result.innerHTML='Error during registration: '+e.error;
    registerButton.disabled=false;
}

// register button action
function registerAPN() {
    registerButton.disabled=true;
    result.innerHTML='Registering...';
    
    $fh.push({act:'register'}, successCallback, errorCallback);
}