document.addEventListener('DOMContentLoaded', () => {
   const header = document.querySelector('.header');
   const burger = document.querySelector('.burger');
   const menu = document.querySelector('.menu');
   const sticky = header.offsetTop;
   const faqs = document.querySelectorAll('.faq');
   const addCommentButton = document.querySelector('.submit');
   const commentInput = document.querySelector('#comment');
   const nameInput = document.querySelector('#name');
   const emailInput = document.querySelector('#email');
   const commentList = document.querySelector('ul#comment-list');
   const singleComment = document.querySelector('.single-comment');
   const commentForm = document.querySelector('.comment-form')
   

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

   let commentCount = 0

   // Add a new comment
   addCommentButton.addEventListener('click', (e) => {
      e.preventDefault();

      if(commentInput != '' || nameInput != '' || emailInput != '') {
      
      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();

      commentCount ++
      const newComment = document.createElement('li');
      newComment.id = `comment-${commentCount}`;

      //Format Date
      const date = new Date();
      let formattedDate = date.toLocaleDateString('en-GB', {
         year: 'numeric',
         month: 'numeric',
         day: 'numeric'
      }).replace(/\//g, '-');;

      
      newComment.innerHTML = `
      <div class="single-comment">
         <div class="comment-text">
            <div class="user-img">
               <img src="img/user1.jpg" alt="User 1" width="100" height="100">
            </div>
            <div class="comment">
               <div class="title-date">
                  <h4>${name}</h4>
                  <p>${formattedDate}</p>
               </div>
               <p>${comment}</p>
            </div>
         </div>
         <div class="reply-comment">
            <span class="reply-link">Reply <i class="fa-solid fa-reply"></i></span>
         </div>
      </div>
      `;
      commentList.appendChild(newComment);

      nameInput.value = '';
      commentInput.value = '';
      emailInput.value = '';
      };
   });

   const replyButtons = commentList.querySelectorAll('.reply-link');

   replyButtons.forEach((replyButton) => {
      replyButton.addEventListener('click', (e) => {
         const comment = e.target.closest('li');
         const nameUser = comment.querySelector('h4');
         const childrenContainer = comment.querySelector('.children');
         childrenContainer.appendChild(commentForm);
         
         const h3 = childrenContainer.querySelector('h3');
         
         h3.textContent = `Reply to ${nameUser.textContent}`;
      })
   })


  /*commentList.addEventListener('click', (e) => {
      let target = e.target;
      
      if(target.tagName = 'span') {
         const comment = e.target.closest('li');
         const nameUser = comment.querySelector('h4');

         console.log(nameUser);

         // Display the reply form
         const childrenContainer = comment.querySelector('.children');
         childrenContainer.appendChild(commentForm);
         
         const h3 = childrenContainer.querySelector('h3');
         
         h3.textContent = `Reply to ${nameUser.textContent}`;
      }

      
   })*/
})

