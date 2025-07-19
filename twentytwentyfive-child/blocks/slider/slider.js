document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.slider-block').forEach(function(slider){
    var index = 0;
    var slides = slider.querySelectorAll('.slide');
    var prev = slider.querySelector('.prev');
    var next = slider.querySelector('.next');
    function show(i){
      slides.forEach(function(s,idx){
        s.style.display = idx === i ? 'block' : 'none';
      });
    }
    function go(delta){
      index = (index + delta + slides.length) % slides.length;
      show(index);
    }
    if(prev){prev.addEventListener('click', function(){ go(-1); });}
    if(next){next.addEventListener('click', function(){ go(1); });}
    show(index);
    setInterval(function(){ go(1); }, 5000);
  });
});
