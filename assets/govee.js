// start coco-modal.js 
let handlers = {};
let root = document.body.querySelector("body");
let content = document.body.querySelector("#MainContent");

const addEvent = (el, name, fn) => {
  el.addEventListener(name, fn);
};

const clickHandler = (btn) => {
  let type = btn.getAttribute("data-type");
  let fn = handlers[type];
  fn && fn();
};
const example = (type, fn) => {
  handlers[type] = fn;
};
const addSpan = (btn) => {
  let span = document.createElement('span');
  span.innerText = btn.innerText
  btn.innerText = ''
  btn.appendChild(span)
}
addEvent(document, "DOMContentLoaded", (_) => {
  let arr = document.body.querySelectorAll(".coco_btn");

  Array.from(arr).forEach((btn) => {
    addSpan(btn)
    addEvent(btn, "click", (_) => {
      clickHandler(btn);
    });
    content.appendChild(btn);
  });
});
coco.init();

// end coco-modal.js

$(function () {  
  if (window.location.href.split('/')[4] === undefined) { // 如果是在首页
    $('#MainContent').css('paddingTop', $('.fixed_icon_wrap').height() + $('.announcement').height());
  }else {
    $('#MainContent').css('paddingTop', window.isMobile ? 0 : $('.header-wrapper').height());
  }

  $(document).scroll(function () {
    let scroll_top = window.scrollY;
    $('#shopify-section-header .site-header.in_index').css('background-color', `rgba(255, 255, 255,${ scroll_top / 400 })`)
    if (scroll_top > 380) {
      $('#shopify-section-header .site-header.in_index').addClass('active')
    } else {
      $('#shopify-section-header .site-header.in_index').removeClass('active')
    }

    if ($('.product_tab_wrap').length) {
      if (scroll_top > $('.tab_hr_mark').offset().top - $('.product_tab_wrap').height() - 100 ) {
        $('.product_tab_wrap').css({ 
          'position':'fixed',
          'top': $('.site-header-sticky').height() + $('.product_tab_wrap').height() + 2 + 'px',
          'z-index': 8,
          'width':  window.isMobile ? 'calc(100% - 70px)' : '100%',
          'padding': '20px 0',
          'background': '#fff'
        })
      }else {
        $('.product_tab_wrap').css({ 
          'position':'static',
          'z-index': 1,
          'width': '100%',
          'padding': 0,
          'background': '#fff'
        })
      }
    }

  })
  window.isMobile ? $('.country-selector-pc').addClass('hide'): $('.country-selector-pc').removeClass('hide')
  let host = window.location.host.split('.')[0];
  if (host == 'test-govee'|| host == 'dev-us' || host == 'store') host = 'us';
  //  国旗设置
  $('.country_img img').attr('src',
    `https://cdn.shopify.com/s/files/1/0556/4203/0246/files/${host}.jpg?v=1619160762`)
  // 国名设置
  $('.country_name').html(host.toUpperCase())

  $('.country_list .country_item').each((index, item) => {
    if ($(item).data('url') == host) {
      $(item).addClass('selected')
    }
  })

  $('.country_list .country_item').on('click', function () {
    let url = $(this).data('url')
    if (window.location.host.split('.')[0] == 'store' && url == 'us') {
      url = 'store'
    }
    window.location.href = `https://${url}.govee.com`; // 要把https加上
  })


  if ($('.hot_categories:last').length) {
    $('.hot_categories:last').css('padding-bottom',window.isMobile ? '5vw' : '50px');
  }

})