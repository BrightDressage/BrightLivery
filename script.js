
(function(){
  var f=document.getElementById('enquiry'),s=document.getElementById('sent'),b=f.querySelector('button[type=submit]');
  f.addEventListener('submit',function(e){
    e.preventDefault();b.disabled=true;
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()})
    .then(function(r){if(!r.ok)throw 0;s.textContent='Thank you. Your enquiry has been sent and we will be in touch soon.';s.hidden=false;f.reset()})
    .catch(function(){s.textContent='Sorry, that did not send. Please call or WhatsApp us on 07771 365693.';s.hidden=false})
    .finally(function(){b.disabled=false});
  });
})();

/* AVAILABILITY: change 'open' to 'full' and republish. */
(function(){
  var AVAILABILITY={full:'full',holiday:'open',short:'open'};
  var NAMES={full:'Full Livery',holiday:'Holiday Livery',short:'Short Stay'};
  document.querySelectorAll('.avail').forEach(function(el){
    var k=el.getAttribute('data-service'),open=AVAILABILITY[k]==='open',n=NAMES[k];
    el.classList.add(open?'is-open':'is-full');
    el.innerHTML='<span class="status"><span class="dot" aria-hidden="true"></span>'+(open?'Spaces available':'Currently full')+'</span><a class="btn" href="#contact">'+(open?'Enquire about '+n:'Join the waitlist')+'</a>';
    el.querySelector('a').addEventListener('click',function(){
      document.getElementById('f-service').value=(!open&&k==='full')?'Join Full Livery waitlist':n;
      var m=document.getElementById('f-msg');
      if(!open&&!m.value)m.value='Please add me to the '+n+' waitlist. ';
    });
  });
})();

/* Cookie consent. Put the Google Analytics Measurement ID (starts G-) in GA_ID.
   Analytics only loads after the visitor taps Accept. */
(function(){
  var GA_ID='', KEY='bl-cookie-consent', bar;
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function clearGa(){document.cookie.split(';').forEach(function(c){var n=c.split('=')[0].trim();if(n.indexOf('_ga')===0){document.cookie=n+'=;Max-Age=0;path=/;domain='+location.hostname.replace(/^www\./,'.');document.cookie=n+'=;Max-Age=0;path=/'}})}
  function loadGa(){
    if(!GA_ID||window.__blGa)return;window.__blGa=true;
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',GA_ID);
  }
  function show(){
    if(!bar){
      bar=document.createElement('div');bar.className='cookie-bar';bar.setAttribute('role','region');bar.setAttribute('aria-label','Cookie choices');
      bar.innerHTML='<p>We would like to use analytics cookies to see how the site is used. <a href="/privacy#cookies">Cookie policy</a></p><div class="cookie-btns"><button type="button" data-cookie="declined">Decline</button><button type="button" data-cookie="accepted">Accept</button></div>';
      bar.addEventListener('click',function(e){var b=e.target.closest('[data-cookie]');if(!b)return;var v=b.getAttribute('data-cookie');set(v);bar.hidden=true;if(v==='accepted')loadGa();else{clearGa();if(window.gtag){window['ga-disable-'+GA_ID]=true}}});
      document.body.appendChild(bar);
    }
    bar.hidden=false;
  }
  document.addEventListener('click',function(e){var l=e.target.closest('[data-cookie-settings]');if(!l)return;e.preventDefault();show()});
  var c=get();if(c==='accepted')loadGa();else if(c!=='declined')show();
})();
