$(document).ready(function(){


  var pubnub = PUBNUB.init({
      subscribe_key : 'sub-c-cf99383a-7714-11e7-98e2-02ee2ddab7fe',
      　publish_key   : 'pub-c-e868dd6e-aea2-4b32-9f05-b21bac0e6997'
    });
  var channel = 'theled';



  window.publishUpdate = (data) => {
  console.log('publishing');
  pubnub.publish({
    channel: channel,
    message: data
  });
}


})
