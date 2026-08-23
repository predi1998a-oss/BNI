var header, headerShouldAnimate, body, headerHeight, headerFixed, headerAttVal, offsetVal;

function removeClass(element, className) {
  element && (element.className = element.className.replace(new RegExp(className, 'g'), ''));
}

function addClass(element, className) {
  element && element.classList.add(className);
}

function VariableInit(e) {
  var data = e && e.detail;
  header = document.querySelector('[data-element-type="topbandSection"]'); //NO I18N
  if (data) {
    headerAttVal = data.onscrollingEffect;
  } else {
    headerAttVal = header && header.getAttribute('data-onscrollingeffect-type').trim();
  }
  headerShouldAnimate =  (headerAttVal === 'floating' || headerAttVal === 'transparent'); //NO I18N
  body = document.getElementsByTagName('body')[0];
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (!body) {
    VariableInit();
  }

  if (!header) {
    return;
  }
  if (document.documentElement.clientWidth > 992) {
    headerHeight = header.clientHeight;
    offsetVal = window.scrollY;
    if (offsetVal > headerHeight && headerShouldAnimate) {
      addClass(header, 'theme-topband-animate'); //NO I18N
      if (headerAttVal === 'transparent') {
        addClass(header, 'theme-topband-transparent'); //NO I18N
      }
    }
    headerFixed = header.classList.contains('theme-topband-animate'); //NO I18N
    headerHeight = header.clientHeight;
    if (headerFixed == true) {
      body.style.paddingTop = headerHeight + 'px'; //NO I18N
    }
  }
});

window.addEventListener('resize', function (event) {
  if (!header) {
    return;
  }
  headerHeight = header.clientHeight;
  if (document.documentElement.clientWidth > 992) {
    offsetVal = window.scrollY;
    if (offsetVal > headerHeight && headerFixed == true) {
      body.style.paddingTop = headerHeight + 'px'; //NO I18N
    }
  } else {
    if (headerFixed == true) {
      body.style.paddingTop = '0px'; //NO I18N
    }
  }
});

window.addEventListener('scroll', function (event) {
  if (!body) {
    VariableInit();
  }
  if (!header) {
    return;
  }
  if (document.documentElement.clientWidth > 992) {
    offsetVal = window.scrollY;
    headerFixed = header.classList.contains('theme-topband-animate'); //NO I18N
    if (offsetVal > headerHeight) {
      if (!headerFixed && headerShouldAnimate) {
        addClass(header, 'theme-topband-animate'); //NO I18N
        if (headerAttVal === 'transparent') {
          addClass(header, 'theme-topband-transparent'); //NO I18N
        }
      }
      if (headerFixed == false && headerShouldAnimate) {
        body.style.paddingTop = headerHeight + 'px'; //NO I18N
      }
    } else if (offsetVal == 0) {
      if (header.classList.contains('theme-topband-animate')) {
        removeClass(header, 'theme-topband-animate'); //NO I18N
        if (headerAttVal === 'transparent') {
          removeClass(header, 'theme-topband-transparent'); //NO I18N
        }
        body.style.paddingTop = '0px'; //NO I18N
      }
    }
  }
});

document.addEventListener('canvas:topbandOnScrollEffectChanged', VariableInit);


