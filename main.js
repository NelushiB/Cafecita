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
   const commentForm = document.querySelector('.comment-form');
   const originalParent = commentForm.parentElement; 
   const originalSibling = commentForm.nextElementSibling;


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

      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();
      const email = emailInput.value.trim();

      if(comment != '' && name != '' && email != '') {
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
         <ul class="children"></ul>`;
         commentList.appendChild(newComment);

         nameInput.value = '';
         commentInput.value = '';
         emailInput.value = '';
      } else {
         console.log("Fill the fields")
      }
   });


   commentList.addEventListener('click', (e) => {
      let target = e.target;
      const replyLink = target.closest('.reply-link');

      if(replyLink) {
         const comment = e.target.closest('li');

         // Display the reply form
         comment.appendChild(commentForm);

         // Add close button and change reply title
         const replyForm = comment.querySelector('.comment-form');

         if (replyForm) {
            // Check if a close button already exists and remove it
            const existingCloseForm = replyForm.querySelector('.close');

            if (existingCloseForm) {
            existingCloseForm.remove();
            }

            // Add close button
            const closeForm = document.createElement('div');
            closeForm.classList.add('close');
            closeForm.innerHTML = '<span>Cancel reply</span>'
            replyForm.insertBefore(closeForm, replyForm.firstChild);

            // Change title
            const nameUser = comment.querySelector('h4');
            const h3 = comment.querySelector('h3');
            h3.textContent = `Reply to ${nameUser.textContent}`;

            // Close reply form when click on the close button
            const closeButton = replyForm.querySelector('.close span');
               // Close reply form
               closeButton.addEventListener('click', () => {
                  commentForm.remove();
               // Restore the reply form to its original position
               if (originalSibling) {
                  originalParent.insertBefore(commentForm, originalSibling);
               } else {
                  originalParent.appendChild(commentForm);
               }
               
               closeButton.remove();
               h3.textContent = 'Leave a reply'
            });

            // Add a new reply
            const ulChildren = comment.querySelector('.children');
            const replyComment = replyForm.querySelector('#comment').value.trim();
            const replyName = replyForm.querySelector('#name').value.trim();
            const replyEmail = replyForm.querySelector('#email').value.trim();

            if(replyComment != '' && replyName != '' && replyEmail != '') {
               const newReply = document.createElement('li');
      
               //Format Date
               const date = new Date();
               let formattedDate = date.toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
               }).replace(/\//g, '-');;
      
               newReply.innerHTML = `
               <div class="single-comment">
                  <div class="comment-text">
                     <div class="user-img">
                        <img src="img/user1.jpg" alt="User 1" width="100" height="100">
                     </div>
                     <div class="comment">
                        <div class="title-date">
                           <h4>${replyName}</h4>
                           <p>${formattedDate}</p>
                        </div>
                        <p>${replyComment}</p>
                     </div>
                  </div>
                  <div class="reply-comment">
                     <span class="reply-link">Reply <i class="fa-solid fa-reply"></i></span>
                  </div>
               </div>
               <ul class="children"></ul>`;
               ulChildren.appendChild(newReply);
      
               /* nameInput.value = '';
               commentInput.value = '';
               emailInput.value = ''; */
            } else {
               console.log("Fill the fields")
            }
            
            replyForm.addEventListener('submit', () => {

            })
         }
      }
   });
});

