document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
  // открытие/закрытие правил акции
var toggleRules = (function() {
  var list = document.querySelector('.official-list');
  full = list.querySelector('.full');
  
  return function() {
    if (list.classList.contains('open')) {
      full.slideUp(400, function() {
        list.classList.toggle('open');
      });
    } else {
      full.slideDown(400, function() {
        list.classList.toggle('open');
      });
    }
    
  }
})();
});