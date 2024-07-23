document.addEventListener('DOMContentLoaded', () => {
   const header = document.querySelector('.header');
   const sticky = header.offsetTop;
   const faqs = document.querySelectorAll('.faq');

   window.onscroll = function() {
      if(window.pageYOffset > sticky) {
         header.classList.add('sticky');
      } else {
         header.classList.remove('sticky');
      }
   }

   faqs.forEach((faq) => {
      faq.addEventListener('click', () => {
         faq.classList.toggle('active-faq');
      });
   });

})

