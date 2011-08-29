var UA = {};
UA.HOST = "https://go.urbanairship.com:443/"; //TODO: figure out why we need to specify the port number here?
UA.APP_KEY = "BH8OW8AVR8-4YHZya5RlFw";
UA.APP_SECRET = "W-p8HmuVQVC3A-20nptpsw";

function registerUA(){
  var deviceToken = $params.deviceToken;
  $fh.log({message: 'receive deviceToken : ' + deviceToken});
  var url = UA.HOST + "api/device_tokens/" + deviceToken;
  var res = $fh.web({url: url, method:'PUT', auth:{username:UA.APP_KEY, password:UA.APP_SECRET}});
  $fh.log({message:'UA register response : ' + $fh.stringify(res)});
  var status = res.status;
  if(status == 200 || status == 201){
    return {result:'ok'};
  } else {
    return {result:'error'};
  }
}