document.addEventListener('DOMContentLoaded', () => {
   const header = document.querySelector('.header');
   const burger = document.querySelector('.burger');
   const menu = document.querySelector('.menu');
   const sticky = header.offsetTop;
   const faqs = document.querySelectorAll('.faq');

   //Burger Button
   burger.addEventListener('click', () => { menu.classList.toggle('wide')});

   // Sticky Navbar
   window.onscroll = function() {
      if(window.pageYOffset > sticky) {
         header.classList.add('sticky');
      } else {
         header.classList.remove('sticky');
      }
   }

   // Scroll Single Faq
   faqs.forEach((faq) => {
      faq.addEventListener('click', () => {
         faq.classList.toggle('active-faq');
      });
   });

})

