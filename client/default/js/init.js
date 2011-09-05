var bb_push_port = 30308;
var bb_push_appId = "80303-s67ll735e3D0576O61a27D6441h63l6476";
var bb_push_serverUrl = "http://pushapi.eval.blackberry.com";

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
  if(e.deviceToken || e.devicePIN){
    result.innerHTML="Device registered. Device token:<br>" + e.deviceToken || e.devicePIN + '.<br><br>';
    result.innerHTML += "Now registering with UrbanAirship...";
    $fh.act({act:'registerUA', req:e}, function(res){
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
    alert(e);
    result.innerHTML='Error during registration: ' + e;
    registerButton.disabled=false;
}

// register button action
function registerAPN() {
    registerButton.disabled=true;
    result.innerHTML='Registering...';
    
    $fh.push({act:'register', params:{bb:{port:bb_push_port, appId:bb_push_appId, serverUrl: bb_push_serverUrl}}}, successCallback, errorCallback);
}