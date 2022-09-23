'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header=document.querySelector('.header')
const section1=document.querySelector('#section--1')
const scroolBtn=document.querySelector('.btn--scroll-to')
const nav=document.querySelector('.nav')
const allSectinos=document.querySelectorAll('.section')

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrool To
scroolBtn.addEventListener('click',()=>{

  section1.scrollIntoView({behavior:"smooth"})
})


//page navigation

// bad practice
  // document.querySelectorAll('.nav__link').forEach((el)=>{

  //   el.addEventListener('click',function(e){
  //     e.preventDefault();
  //     const id=this.getAttribute('href');
  //      document.querySelector(id).scrollIntoView({behavior:"smooth"})
  //   })
  // })
//good practice event deligation
//adding event listener to parent element 
//and determine wich element originated the event 
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains("nav__link")){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:"smooth"})

  }

})


// Operation Tab Compenets
// tabs ===buttons
const tabs=document.querySelectorAll('.operations__tab');
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');


// bad Practice
// tabs.forEach(t=> t.addEventListener('click',()=>console.log("Clicked")))

// best practise event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});


//Made a Fade Animation 

// refactoring our code 
const hoverHandler=function(e){
  if(e.target.classList.contains('nav__link')){
    
    // lerada linkaka select akain ka hovery lasara 
    const link=e.target;
    // lerada linkanani aroun it select akain  laregay parent navawa 
    const siblings=link.closest('.nav').querySelectorAll('.nav__link')
    // lera logo select akain la rey parent nav awa
    const logo=link.closest('.nav').querySelector('img ')

    siblings.forEach(el=>{
      if(el !=link){
       
        el.style.opacity=this;
        logo.style.opacity=this;
      }
    })
  }

}

// bad Practice
// nav.addEventListener('mouseover',function(e){
//  hoverHandler(e,0.5)
// })

// nav.addEventListener('mouseout',function(e){
//   hoverHandler(e,1)

// })

// Best practice 
nav.addEventListener('mouseover',hoverHandler.bind(0.5))
nav.addEventListener('mouseout',hoverHandler.bind(1))




// Sticky Header 

// Bad Practice
// const initialCoords=section1.getBoundingClientRect()

// window.addEventListener('scroll',function(){
//   console.log(window.scrollY);
//   if(window.scrollY>initialCoords.top){
//     nav.classList.add('sticky')
//   }
//   else{
//     nav.classList.remove('sticky')
//   }
// })

// Best practice

// const obsCallBack=function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry);
//   })}

// const obsOptions={
//   root:null,
//   threshold:0.1  //10%
// }

// const observer=new IntersectionObserver(obsCallBack,obsOptions);
// observer.observe(section1)


// Header Observer

const navHeight=nav.getBoundingClientRect().height
const stickyNavCallBack=function(entries){
  const [entry]=entries //=== entries[0]
  

  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')

}
const options={
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
}
 const headerObserver= new IntersectionObserver(stickyNavCallBack,options);
 headerObserver.observe(header)


//  Reveal Section by Animation

// call back function for observing reavel section
const revealSection=function(entries,observer){
  
  const [entry]=entries;
 

  //guard clauseing
   if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)

}


const sectionObserver=new IntersectionObserver(revealSection,{root:null,threshold:.15});

allSectinos.forEach(function(section){
  sectionObserver.observe(section)
  // section.classList.add("section--hidden")
})



// lazy loading images 

//select those images that has data-src 

const imgTarget =document.querySelectorAll('img[data-src]')

const lodingImg=function( entries,observer){

  const [entry]=entries

  // guard clause
  if(!entry.isIntersecting) return
  //repplace src with data-src
  entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
    
  })

}
const imgObserver =new IntersectionObserver(lodingImg,{
  root:null,
  threshold:0,
  rootMargin:'200px'
})
imgTarget.forEach(img=>imgObserver.observe(img))



// Slider

const Slider=()=>{
const slides=document.querySelectorAll('.slide')
const btnRight=document.querySelector('.slider__btn--right')
const btnLeft =document.querySelector('.slider__btn--left')
const dotContainer=document.querySelector('.dots')

let currentSlide=0
let maxSlide=slides.length




// functions

const createDots=()=>{
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',
   
    `<button class="dots__dot" data-slide="${i}"></button>`)
    
    
  })
}


// Active Dot

const activeDot=(slide)=>{

  // first remove active form a ll
   document.querySelectorAll('.dots__dot')
   .forEach(dot=>dot.classList.remove
    ('dots__dot--active'))

    document.querySelector(`.dots__dot[data-slide="${slide}"`)
    .classList.add('dots__dot--active')
}


// goto slide function
const goToSlide =function(slide){
  slides.forEach(
    (s,i)=> (s.style.transform=`translateX(${100*(i-slide)}%)`)
    
    )
  }
  
const init=()=>{
  createDots();
  activeDot(0)
  goToSlide(0)

}
init()

  const nextSlide=()=>{
    if(currentSlide===maxSlide-1)
  {currentSlide=0}
  else {currentSlide++}
  goToSlide(currentSlide)
  activeDot(currentSlide)
  
}

const prevSlide=()=>{
  if(currentSlide===0){
    currentSlide=maxSlide-1
  }
  else{
    currentSlide--;

  }
  goToSlide(currentSlide)
  activeDot(currentSlide)

}

btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)  

// key board events
document.addEventListener('keydown',(e)=>{
  e.key==="ArrowRight"&&nextSlide();
  e.key==="ArrowLeft"&&prevSlide();

})

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    goToSlide(slide)
    activeDot(currentSlide)


  }
})

};

// invoke slider
Slider();


// lectures




// Creating 
const message=document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML='We use cookied for improve functionality and analytics . <button class="btn btn--close--cookie">Got it!</button>';

// inserting element
header.append(message)
header.prepend(message)
header.before(message)
header.after(message)


// Delete Element

document.querySelector('.btn--close--cookie').addEventListener('click',function(){
  message.remove();
  // or
  message.parentElement.removeChild(message)
})



// const randomInt=(min,max)=>Math.floor(Math.random()*(max-min+1)+min);
// const randomColor=()=> `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`


// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();
// })

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();
// })

// document.querySelector('.nav').addEventListener('click',function(e){
     
//     this.style.backgroundColor=randomColor();
 
// })








