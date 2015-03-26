var options = [];
function restore_options() {
  chrome.storage.sync.get({
    loveOn: true,
    urls: []
  }, function(result) {
    options = result;
    $('#love-on').prop('checked', options.loveOn);
    for (var i = 0; i < options.urls.length; i++) {
        var newEl = '<div class="url">' 
                      +'<img src="'+options.urls[i].favIconUrl+'">'
                      +options.urls[i].title
                      +'<a href="#" class="delete-item icon-trash" data-id="'+i+'"></a>'
                    +'</div>';
        $('#urls').append(newEl);
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
  $('#love-on').change(function(){
    var el = $(this);
    chrome.storage.sync.set({
      loveOn: el.prop('checked')
    })
    toggleIcon(el.prop('checked'))
  })
});