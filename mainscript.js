// //-- last Edit 01.10.2020
function delay(URL, delay) {
  setTimeout(function () {
    window.scrollTo(
      0,
      document.querySelector(URL).getBoundingClientRect().top - 75
    );
  }, delay);
}

var user_looking = true, stacks = 0;

window.onload = () => {
  document.addEventListener('scroll', function () {
    if (window.pageYOffset > 10) {
      document.querySelector(".head").style.transition = "0.6s";
      document.querySelector(".head").style.background = "#0066B3";
      document.querySelector(".head").style.boxShadow = "0px 2px 6px rgba(0, 0, 0, 0.70), 0px 2px 10px rgba(0, 0, 0, 0.5)";
      document.querySelector(".head").style.color = '#FFAC30';

    } else {
      document.querySelector(".head").style.transition = "0.3s";
      document.querySelector(".head").style.background = 'transparent';
      document.querySelector(".head").style.boxShadow = 'none';
      document.querySelector(".head").style.color = '#179BFF';
    }
  })

  document.addEventListener('mousemove', function () {
    user_looking = true;
    stacks = 0;
  })
  document.addEventListener('scroll', function () {
    user_looking = true;
    stacks = 0;
  })


  const click_cv_str = new MouseEvent('click');
  setInterval(() => {
    if (user_looking) {
      document.getElementById("anim_bt_2").dispatchEvent(click_cv_str);
    }
  }, 10000);

  var click_event = new MouseEvent("click", { clientX: Math.random() * 400 + document.getElementById("anim_c_3").getBoundingClientRect().left, clientY: Math.random() * 400 + document.getElementById("anim_c_3").getBoundingClientRect().top })
  setInterval(() => {
    if (user_looking) {
      document.getElementById('anim_c_3').dispatchEvent(click_event);
      click_event = new MouseEvent("click", { clientX: Math.random() * 400 + document.getElementById("anim_c_3").getBoundingClientRect().left, clientY: Math.random() * 400 + document.getElementById("anim_c_3").getBoundingClientRect().top }
      )
      stacks++;
      if (stacks > 3) {
        user_looking = false;
      }
    }
  }, 8000);

  document.getElementById('JS_on_off').addEventListener('mouseover', () => {
    document.querySelector('.js_button_prompt_button').style.visibility = 'visible';
  });

  document.getElementById('JS_on_off').addEventListener('mouseout', () => {
    document.querySelector('.js_button_prompt_button').style.visibility = 'hidden';
  });
};

