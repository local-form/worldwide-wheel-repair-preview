(() => {
  const els = [...document.querySelectorAll('[data-reveal]')];
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) els.forEach(e => e.classList.add('is-visible'));
  else {
    const n = new Map();
    els.forEach(e => {const p=e.parentElement,i=n.get(p)||0;e.style.setProperty('--d', Math.min(i,3)*.08+'s');n.set(p,i+1);});
    const io = new IntersectionObserver(es => es.forEach(e => {if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.01,rootMargin:'0px 0px -8% 0px'});
    els.forEach(e=>io.observe(e));
    setTimeout(()=>els.forEach(e=>{if(e.getBoundingClientRect().top<innerHeight)e.classList.add('is-visible');}),1500);
  }
  const form=document.getElementById('contact-form'), result=document.getElementById('confirmation');
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form),summary=document.createElement('strong'),detail=document.createElement('p'),notice=document.createElement('p');
    const g=k=>(data.get(k)||'').trim(),parts=[g('service')||'Quote request',g('vehicle'),g('time')?g('time').toLowerCase()+' call':''].filter(Boolean);
    summary.textContent=`${parts.join(', ')}, for ${g('name')} (${g('phone')})`;
    detail.textContent=g('details')||'No details added.';
    notice.textContent='Preview only: nothing was sent. On the real site, the shop confirms by text or call.';
    result.replaceChildren(summary,detail,notice);result.hidden=false;result.focus();
  });
})();
