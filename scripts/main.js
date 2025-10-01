$(document).ready(function () {
  // 1) Make the thumbnail strip slideable
  $('.slider-nav').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: false,
    swipeToSlide: true,
    focusOnSelect: false, // we’ll handle click ourselves
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
      { breakpoint: 420, settings: { slidesToShow: 1 } }
    ]
  });

  // 2) Build a gallery array from the thumb data (no visible main slider)
  function getGalleryItems() {
    return Array.from(document.querySelectorAll('.slider-nav .thumb'))
      .map(btn => ({ src: btn.dataset.full, type: 'image' }));
  }

  // 3) Fancybox global options -> true modal with an X
  Fancybox.bind('[data-fancybox="unused"]', {}); // noop, just loads lib
  const fbOptions = {
    Toolbar: { display: ['close'] }, // shows the X
    closeButton: 'inside',
    dragToClose: true,
    placeFocusBack: true,
    trapFocus: true
  };

  // 4) Open modal at the clicked thumbnail's index (ignore drags)
  let navDragging = false;

  $('.slider-nav')
    .on('mousedown touchstart', () => { navDragging = false; })
    .on('mousemove touchmove', () => { navDragging = true; })
    .on('click', '.thumb, .slick-slide', function (e) {
      // If user was dragging the carousel, don’t open
      if (navDragging) return;

      e.preventDefault();

      // Determine the *logical* index in the list of thumbs
      // If click is on .thumb, use its index among .thumbs.
      // If click lands on .slick-slide wrapper, drill down to find the button.
      const $thumbs = $('.slider-nav .thumb');
      const $targetThumb = $(this).is('.thumb') ? $(this) : $(this).find('.thumb');
      const idx = $thumbs.index($targetThumb);

      const items = getGalleryItems();
      Fancybox.show(items, { ...fbOptions, startIndex: idx });
    });

});
