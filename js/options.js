var bg = chrome.extension.getBackgroundPage();

var options = [];
function restore_options() {
  chrome.storage.sync.get({
    urls: []
  }, function(result) {
    options = result;
    for (var i = 0; i < options.urls.length; i++) {
      var newEl = '<div class="url">' 
                    +'<img src="'+options.urls[i].favIconUrl+'">'
                    +options.urls[i].title
                    +'<a href="#" class="delete-item icon-trash" data-id="'+i+'"></a>'
                  +'</div>';
      $('#urls').append(newEl);
    }
  });
  chrome.storage.sync.get('facebookTimeline',function (result){
    $('#facebook-timeline').attr('checked', result.facebookTimeline)
  })

  var port = chrome.runtime.connect({name: "knockknock"});
  port.postMessage({isEnabled: true});
  port.onMessage.addListener(function(response) {
    if(!response.enabled){
      $('#section-disable').addClass('disabled');
    }
  });

}

$(function() {
  restore_options();
  $('#urls').on('click', '.delete-item', function(e){
    var el = $(this)
    options.urls.splice(el.data('id'), 1);
    chrome.storage.sync.set(options);
    $(this).parent().remove();
    e.preventDefault();
  })
  $('input[type=checkbox]').change(function(){
    var elValue = $(this).is(':checked')
    chrome.storage.sync.set({
       'facebookTimeline': elValue
    })
  })
  $('.disable-start').click(function(){
    chrome.runtime.sendMessage({disable: true, minutes: parseInt($('.disable-value').val())});
    $('#section-disable').addClass('disabled');
  })
  $('.disable-stop').click(function(e){
    chrome.runtime.sendMessage({enable: true});
    $('#section-disable').removeClass('disabled');
    e.preventDefault();
  })
});