$(document).ready(function() {
    $('.blog-post a[href$="#fancy"]').fancybox();

    var imgs = $('.blog-post img');
    imgs.each(function() {
      var $this = $(this);
      var imgLink = $this.attr('src');
      var idx = imgLink.lastIndexOf('_thumb.');
      var noFancy = imgLink.indexOf('#nofancy') !== -1;
      if (idx !== -1 && !noFancy)
      {
        var caption = $this.attr('alt');
        var extIdx = imgLink.lastIndexOf('.');
        imgLink = imgLink.substr(0, idx);
        imgExt = imgLink.substr(extIdx);
        var html = '<a href=\"' + imgLink + imgExt + '\" class=\"fancy-box\" data-fancybox=\"images\" data-caption=\"' + caption + '\"></a>';
        $this.wrap(html);
      }
    });
  });
