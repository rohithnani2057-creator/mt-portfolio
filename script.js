document.documentElement.classList.add('js');
(function(){
  var name=document.querySelector('.name-puzzle');
  if(!name||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var fragment=document.createDocumentFragment(),words=[],word=[];
  Array.prototype.forEach.call(name.textContent,function(character,index){
    if(character===' '){fragment.appendChild(document.createTextNode(character));if(word.length){words.push(word);word=[]}return}
    var piece=document.createElement('span');
    piece.className='name-piece';piece.textContent=character;piece.dataset.final=character;word.push(piece);
    fragment.appendChild(piece);
  });
  if(word.length)words.push(word);
  name.replaceChildren(fragment);
  function jumble(group){
    var letters=group.map(function(piece){return piece.dataset.final}),mixed=letters.slice();
    for(var i=mixed.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),temp=mixed[i];mixed[i]=mixed[j];mixed[j]=temp}
    if(mixed.join('')===letters.join('')&&mixed.length>1)mixed.push(mixed.shift());
    group.forEach(function(piece,index){piece.textContent=mixed[index]});
  }
  words.forEach(jumble);
  var frames=0,timer=setInterval(function(){
    frames++;
    if(frames<5){words.forEach(jumble);return}
    clearInterval(timer);
    Array.prototype.forEach.call(name.querySelectorAll('.name-piece'),function(piece){piece.textContent=piece.dataset.final});
  },70);
})();
(function(){
  var els=document.querySelectorAll('h2,.stat,.card,.job,.contact');
  els.forEach(function(e,i){e.classList.add('reveal');e.style.setProperty('--d',((i%3)*0.09)+'s')});
  function show(e){e.classList.add('in')}
  if(!('IntersectionObserver' in window)){els.forEach(show);return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){show(x.target);io.unobserve(x.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
  var jobs=document.querySelectorAll('.job');
  if('IntersectionObserver' in window&&jobs.length){
    var timeline=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){if(entry.isIntersecting){jobs.forEach(function(job){job.classList.remove('active')});entry.target.classList.add('active')}});
    },{threshold:.45,rootMargin:'-12% 0px -24% 0px'});
    jobs.forEach(function(job){timeline.observe(job)});
  }
})();
(function(){
  var card=document.querySelector('.experience-expander');
  if(!card||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var numbers=Array.prototype.slice.call(card.querySelectorAll('.experience-fact b'));
  var finalValues=numbers.map(function(number){return number.textContent});
  var scrambling=false;
  function scramble(){
    if(scrambling)return;
    scrambling=true;
    var frame=0,timer=setInterval(function(){
      frame++;
      numbers.forEach(function(number,index){
        number.textContent=frame<7?String(Math.floor(Math.random()*10))+(finalValues[index].endsWith('+')?'+':''):finalValues[index];
      });
      if(frame>=7){clearInterval(timer);scrambling=false}
    },65);
  }
  card.addEventListener('pointerenter',scramble);
  card.addEventListener('focus',scramble);
})();
(function(){
  var el=document.getElementById('role');
  if(!el||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var roles=['Splunk & SIEM Engineer','Splunk Administrator','SPL Developer','Security Log Onboarding'];
  var r=0,c=0,del=false;
  el.textContent='';
  function tick(){
    var w=roles[r];
    c+=del?-1:1;
    el.textContent=w.slice(0,c);
    var d=del?35:75;
    if(!del&&c===w.length){del=true;d=1800}
    else if(del&&c===0){del=false;r=(r+1)%roles.length;d=350}
    setTimeout(tick,d);
  }
  setTimeout(tick,900);
  addEventListener('beforeprint',function(){el.textContent='Splunk & SIEM Engineer'});
})();
(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var bar=document.querySelector('.prog b'),hud=document.getElementById('hud');
  var secs=Array.prototype.slice.call(document.querySelectorAll('header.hero,section,.contact'));
  function upd(){
    var h=document.documentElement,b=document.body,scrollTop=Math.max(window.scrollY||0,h.scrollTop||0,b.scrollTop||0),viewHeight=window.innerHeight||h.clientHeight,pageHeight=Math.max(h.scrollHeight,b.scrollHeight),maxScroll=Math.max(0,pageHeight-viewHeight),atBottom=scrollTop>=maxScroll-8||scrollTop+viewHeight>=pageHeight-8,p=maxScroll>0?Math.min(1,scrollTop/maxScroll):0,scanY=scrollTop+viewHeight*.42,active=0;
    bar.style.transform='scaleX('+p+')';
    secs.forEach(function(section,i){if(section.getBoundingClientRect().top+scrollTop<=scanY)active=i});
    if(atBottom){p=1;active=secs.length-1;bar.style.transform='scaleX(1)'}
    hud.textContent='SCAN '+Math.round(p*100)+'% | '+(active+1)+'/'+secs.length+' SECTIONS';
  }
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);
  if('IntersectionObserver' in window){
    var links={};document.querySelectorAll('nav a').forEach(function(a){links[a.getAttribute('href')]=a});
    var o2=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){Object.keys(links).forEach(function(k){links[k].classList.toggle('on',k==='#'+x.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
    ['skills','playbooks','experience','contact'].forEach(function(id){var e=document.getElementById(id);if(e)o2.observe(e)});
  }
  upd();
  var glow=document.getElementById('cursor-glow');
  if(!rm&&glow&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    var x=innerWidth/2,y=innerHeight/2,mx=x,my=y;
    addEventListener('mousemove',function(event){mx=event.clientX;my=event.clientY;glow.classList.add('visible')});
    addEventListener('mouseleave',function(){glow.classList.remove('visible')});
    (function follow(){x+=(mx-x)*.12;y+=(my-y)*.12;glow.style.left=x+'px';glow.style.top=y+'px';requestAnimationFrame(follow)})();
  }
})();
(function(){
  document.querySelectorAll('a[data-u]').forEach(function(a){
    var m=a.getAttribute('data-u')+'@'+a.getAttribute('data-d');
    a.href='mailto:'+m;
    if(a.hasAttribute('data-show')){
      var address=a.querySelector('.mail-address');
      if(address)address.textContent=m;else a.textContent=m;
    }
  });
})();
(function(){
  var openers=document.querySelectorAll('[data-open-resume]'),dialog=document.getElementById('resume-dialog'),close=document.getElementById('resume-close');
  if(!openers.length||!dialog||!close)return;
  var revealTimer;
  openers.forEach(function(open){open.addEventListener('click',function(event){
    if(typeof dialog.showModal==='function'){
      event.preventDefault();dialog.showModal();
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
        clearTimeout(revealTimer);dialog.classList.add('resume-opening');
        revealTimer=setTimeout(function(){dialog.classList.remove('resume-opening')},2200);
      }
    }
  })});
  function clearOpening(){clearTimeout(revealTimer);dialog.classList.remove('resume-opening')}
  close.addEventListener('click',function(){clearOpening();dialog.close()});
  dialog.addEventListener('click',function(event){if(event.target===dialog){clearOpening();dialog.close()}});
  dialog.addEventListener('close',clearOpening);
})();
(function(){
  var examples={
    volume:{label:'event-volume.spl',code:'index=_internal\n| stats count by sourcetype\n| sort -count\n| head 10',description:'Review event volume by source type. Example query only; results depend on your indexes and time range.'},
    status:{label:'http-status.spl',code:'index=web sourcetype=access_combined\n| stats count by status\n| sort -count',description:'Compare HTTP response counts in access logs. Replace the example index or sourcetype with the names used in your environment.'},
    internal:{label:'internal-sources.spl',code:'index=_internal\n| stats count by component\n| sort -count\n| head 10',description:'See which Splunk internal components are contributing events. The available fields can vary by source and time range.'}
  };
  var label=document.getElementById('query-label'),code=document.getElementById('query-code'),description=document.getElementById('query-description');
  if(!label||!code||!description)return;
  document.querySelectorAll('.command').forEach(function(button){
    button.addEventListener('click',function(){
      var example=examples[button.dataset.query];if(!example)return;
      label.textContent=example.label;code.textContent=example.code;description.textContent=example.description;
      document.querySelectorAll('.command').forEach(function(item){var active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});
    });
  });
})();
(function(){
  var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!reduced&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.interactive-card').forEach(function(card){
      var educationTitle=card.classList.contains('education-card')?card.querySelector('h3'):null;
      card.addEventListener('pointermove',function(event){
        var rect=card.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;
        var nx=x/rect.width,ny=y/rect.height;
        card.style.setProperty('--pointer-x',(nx*100)+'%');card.style.setProperty('--pointer-y',(ny*100)+'%');
        card.style.transform='perspective(760px) rotateX('+((.5-ny)*5)+'deg) rotateY('+((nx-.5)*6)+'deg) translateY(-3px)';
        if(educationTitle){educationTitle.style.transform='translate('+((nx-.5)*7)+'px,'+((ny-.5)*3)+'px)'}
      });
      card.addEventListener('pointerleave',function(){card.style.transform='';card.style.removeProperty('--pointer-x');card.style.removeProperty('--pointer-y');if(educationTitle)educationTitle.style.transform=''});
    });
  }
  var education=document.querySelector('.education-card');
  if(education){
    education.addEventListener('click',function(event){
      var rect=education.getBoundingClientRect();
      var x=event.detail===0?rect.width/2:event.clientX-rect.left,y=event.detail===0?rect.height/2:event.clientY-rect.top;
      education.style.setProperty('--flash-x',Math.max(0,Math.min(100,(x/rect.width)*100))+'%');
      education.style.setProperty('--flash-y',Math.max(0,Math.min(100,(y/rect.height)*100))+'%');
      education.classList.remove('flash');void education.offsetWidth;education.classList.add('flash');
      clearTimeout(education.flashTimer);education.flashTimer=setTimeout(function(){education.classList.remove('flash')},700);
    });
  }
})();
(function(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var routes=[
    {id:'skills',selector:'#skills h2',icon:'✦',flight:'skills-flight'},
    {id:'playbooks',selector:'#playbooks h2',icon:'>_',flight:'playbooks-flight'},
    {id:'experience',selector:'#experience h2',icon:'▣',flight:'experience-flight'},
    {id:'contact',selector:'.mail-btn',icon:'✉',flight:'contact-flight'},
    {id:'resume-contact',selector:'#resume-contact',icon:'▤',flight:'resume-flight'}
  ];
  var running=false;
  routes.forEach(function(route){
    var link=document.querySelector('nav a[href="#'+route.id+'"]'),target=document.querySelector(route.selector);
    if(!link||!target)return;
    link.addEventListener('click',function(event){
    if(running){event.preventDefault();return}
    event.preventDefault();running=true;
    var from=link.getBoundingClientRect(),to=target.getBoundingClientRect();
    var startX=from.left+from.width/2,startY=from.top+from.height/2;
    var targetDocY=to.top+window.scrollY+to.height/2;
    var maxScroll=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
    var aimY=(route.id==='contact'||route.id==='resume-contact')?window.innerHeight*.52:window.innerHeight*.38;
    var endScroll=Math.max(0,Math.min(maxScroll,targetDocY-aimY));
    var endX=to.left+to.width/2,endY=targetDocY-endScroll,startScroll=window.scrollY;
    var previousScrollBehavior=document.documentElement.style.scrollBehavior;document.documentElement.style.scrollBehavior='auto';
    var flight=document.createElement('span');flight.className='nav-flight '+route.flight;flight.setAttribute('aria-hidden','true');flight.textContent=route.icon;document.body.appendChild(flight);
    var began=null,duration=1150;
    function frame(now){
      began=began||now;
      var p=Math.min((now-began)/duration,1),ease=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
      window.scrollTo(0,startScroll+(endScroll-startScroll)*ease);
      var x=startX+(endX-startX)*ease,y=startY+(endY-startY)*ease;
      flight.style.transform='translate3d('+x+'px,'+y+'px,0) translate(-50%,-50%) rotate('+(ease*14-7)+'deg) scale('+(1-.12*Math.sin(Math.PI*p))+')';
      if(p<1){requestAnimationFrame(frame);return}
      window.scrollTo(0,endScroll);flight.remove();running=false;document.documentElement.style.scrollBehavior=previousScrollBehavior;
      if(location.hash!=='#'+route.id)history.pushState(null,'','#'+route.id);
      var arrivalClass=route.id==='contact'?'arrival':(route.id==='resume-contact'?'resume-arrival':'nav-arrival');
      target.classList.remove(arrivalClass);void target.offsetWidth;target.classList.add(arrivalClass);
      setTimeout(function(){target.classList.remove(arrivalClass)},950);
    }
    requestAnimationFrame(frame);
    });
  });
})();
