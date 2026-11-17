
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
  var AVAILABILITY={full:'full',camp:'open',holiday:'open',short:'open'};
  var NAMES={full:'Full Livery',camp:'Boot Camp',holiday:'Holiday Livery',short:'Short Stay'};
  document.querySelectorAll('.rate[data-service]').forEach(function(card){
    var k=card.getAttribute('data-service'),open=AVAILABILITY[k]==='open',n=NAMES[k];
    var st=document.createElement('p');
    st.className='status '+(open?'is-open':'is-full');
    st.innerHTML='<span class="dot" aria-hidden="true"></span>'+(open?'Spaces available':'Currently full');
    card.querySelector('h3').parentNode.appendChild(st);
    var a=document.createElement('a');
    a.className='btn';a.href='#contact';a.textContent=open?'Enquire now':'Join the waitlist';
    a.setAttribute('aria-label',(open?'Enquire about ':'Join the waitlist for ')+n);
    card.querySelector('.price').appendChild(a);
    a.addEventListener('click',function(){
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

/* Facilities: arrows, lightbox, and no right-click or drag on images */
(function(){
  var strip=document.querySelector('.gallery .strip');
  document.addEventListener('contextmenu',function(e){if(e.target.closest('img'))e.preventDefault()});
  document.addEventListener('dragstart',function(e){if(e.target.closest('img'))e.preventDefault()});
  if(!strip)return;
  document.querySelectorAll('.gal-arrow').forEach(function(b){b.addEventListener('click',function(){
    var t=strip.querySelector('.tile');var step=t?t.getBoundingClientRect().width+14:320;
    strip.scrollBy({left:step*+b.getAttribute('data-gal'),behavior:'smooth'});
  })});
  var tiles=[].slice.call(strip.querySelectorAll('.tile.photo')),i=0,lb,img,cap,last;
  function render(){var t=tiles[i],m=t.querySelector('img');img.src=m.getAttribute('src');img.alt=m.alt;cap.textContent=t.querySelector('span').textContent}
  function open(n){
    if(!lb){
      lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Facilities photo');
      lb.innerHTML='<figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-x" aria-label="Close">&times;</button><button type="button" class="lb-p" aria-label="Previous photo">&larr;</button><button type="button" class="lb-n" aria-label="Next photo">&rarr;</button>';
      img=lb.querySelector('img');cap=lb.querySelector('figcaption');
      lb.addEventListener('click',function(e){
        if(e.target.closest('.lb-x')||e.target===lb)close();
        else if(e.target.closest('.lb-p'))go(-1);
        else if(e.target.closest('.lb-n'))go(1);
      });
      var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
      lb.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(d<0?1:-1);x0=null});
      document.body.appendChild(lb);
    }
    last=document.activeElement;i=n;render();lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lb-x').focus();
  }
  function close(){lb.hidden=true;document.body.style.overflow='';if(last)last.focus()}
  function go(d){i=(i+d+tiles.length)%tiles.length;render()}
  document.addEventListener('keydown',function(e){if(!lb||lb.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')go(-1);else if(e.key==='ArrowRight')go(1)});
  tiles.forEach(function(t,n){t.setAttribute('tabindex','0');t.setAttribute('role','button');t.setAttribute('aria-label','Enlarge photo: '+t.querySelector('span').textContent);
    t.addEventListener('click',function(){open(n)});
    t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(n)}});
  });
})();
