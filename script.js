let allHomepageData = JSON.parse(localStorage.getItem('allHomepageData_key'))? (JSON.parse(localStorage.getItem('allHomepageData_key'))): 0;
let heroSectionMenus;
let heroSectionSlideshow;
let labTestSlideshowData;
let newLaunchData;

function saveToLocalStorage(key, value) {
    localStorage.setItem(`${key}`, JSON.stringify(value));
}

function showHeroSectionMenus(data){
    if(data.length > 0){
        let parent = document.getElementById('cardRowOne');

        data.map((item)=>{
            const anchor = document.createElement('a');
            anchor.href = item.cardUrl;

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'row_one_card_height_width');

            const img = document.createElement('img');
            img.src = item.imgUrl;
            img.classList.add('cardrow1_img');
            img.alt = '';

            const titlePara = document.createElement('p');
            titlePara.classList.add('cardrow1_title');
            titlePara.textContent = item.title;

            const discountPara = document.createElement('p');
            discountPara.classList.add('cardrow1_discount');
            discountPara.textContent = item.discountOffer>0?`upto ${item.discountOffer}% Of`:'';

            cardDiv.appendChild(img);
            cardDiv.appendChild(titlePara);
            cardDiv.appendChild(discountPara);

            anchor.appendChild(cardDiv);
            parent.append(anchor);
            
        })
    }
}

function showLabTestSlideshow(parentID,data){
    if(data.length > 0){
        // Get the parent ul element
        const parentUl = document.getElementById(`${parentID}`);

        // Loop through the data and create list items dynamically
        data.forEach(item => {
        
            // console.log(item.imgUrl)
        
            // Create li element

            const anchor = document.createElement('a');
            anchor.href = './pages/labTest.html';

        const li = document.createElement('li');

       

        // Create div element with background image
        const div = document.createElement('div');
        div.classList.add('slide_labtest');
        if (item.imgUrl) {
            div.style.backgroundImage = `url('${item.imgUrl}')`;
            div.style.backgroundSize = 'cover';
        }

        li.appendChild(div);
        anchor.appendChild(li);

        // Append li to ul
        parentUl.appendChild(anchor);
        });
    }
}

function showGeneralCardSlider(parentID,data,cardHeight){
    console.log(data)
    if(data.length > 0){
        // Get the parent ul element
        const parentDiv = document.getElementById(`${parentID}`);

        // Loop through the data and create list items dynamically
        data.forEach(item => {
        
                    
        const a = document.createElement('a');
        a.setAttribute('href', './pages/buyproduct.html');

        const li = document.createElement('li');

        const divSlide = document.createElement('div');
        divSlide.classList.add('slide_general');
        if(cardHeight>0){
            divSlide.style.height = cardHeight + 'px';

        }

        const divItemImg = document.createElement('div');
        divItemImg.classList.add('itemImg_div');

        const img = document.createElement('img');
        img.src= `${item.imgUrl}`;
         img.classList.add('itemImage');
        img.setAttribute('alt', '');
        divItemImg.appendChild(img);

        const divItemData = document.createElement('div');
        divItemData.classList.add('item_data');

        const divItemTitle = document.createElement('div');
        divItemTitle.classList.add('item_title');

        // Create elements
        const pTitle = document.createElement('p');
        const truncatedDescription = item.description.length > 35 ? item.description.substring(0, 35) + '...' : item.description;
        pTitle.textContent = truncatedDescription;


        const divOriginalPrice = document.createElement('div');
        divOriginalPrice.classList.add('originalPrice_general');

        const pMRP = document.createElement('p');
        pMRP.textContent = 'MRP ';

        const spanPrice = document.createElement('span');
        spanPrice.classList.add('item_price_general');
        spanPrice.textContent = `₹ ${item.price}`;

        pMRP.appendChild(spanPrice);

        const divDiscount = document.createElement('div');
        divDiscount.classList.add('discount_general');

        const pDiscount = document.createElement('p');
        pDiscount.textContent = `₹ ${item.price-(item.price*(item.discount/100))}`;

        const spanDiscount = document.createElement('span');
        spanDiscount.classList.add('redColor_discount');
        spanDiscount.textContent = ` (${item.discount}%)`;

        // Append elements
        divItemTitle.appendChild(pTitle);
        divOriginalPrice.appendChild(pMRP);
        divDiscount.appendChild(pDiscount);
        pDiscount.appendChild(spanDiscount);
        divItemData.appendChild(divItemTitle);
        divItemData.appendChild(divOriginalPrice);
        divItemData.appendChild(divDiscount);
        divSlide.appendChild(divItemImg);
        divSlide.appendChild(divItemData);
        li.appendChild(divSlide);
        a.appendChild(li);

        parentDiv.appendChild(a);

        });
    }
}


// get data using async & await- recommended approach
async function getAllHomepageData(){
    // use try-catch block to avoid runtime errors
    try {
        const response = await fetch('https://customapis.onrender.com/api/v1/getPharmEasyHomepageData');
        const data = await response.json();
        console.log(data)
        // console.log data to check structure of data then assign particular property or whole data to global variables
        heroSectionMenus = data.message[0].homPageData.heroSectionMenus;
        showHeroSectionMenus(heroSectionMenus);
        
        heroSectionSlideshow = data.message[0].homPageData.heroSectionSlideshow;
        showHeroSectionSlider(heroSectionSlideshow);

        labTestSlideshowData = data.message[0].homPageData.labTestSlideshow;
        showLabTestSlideshow("labtest_ul_parent",labTestSlideshowData);   
        
        newLaunchData = data.message[0].homPageData.newLaunchData;
        showGeneralCardSlider("shopByCategoryID",newLaunchData,320);

        




        var container = document.querySelector('.PostSlide .innerContainer');
        new PostSlider(container,3);
        return data;

    } catch (error) {
        console.log(error);
    }
}





// Define the URLs for the background images
// const imageUrls = [
//     'https://images.unsplash.com/photo-1504730030853-eff311f57d3c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1485811661309-ab85183a729c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1517805686688-47dd930554b2?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1700317440746-7e16b87199b5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1512310604669-443f26c35f52?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1527736947477-2790e28f3443?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//   ];
  
function showHeroSectionSlider(data){
     // Get the container element
  const sliderContainer = document.getElementById('herosectionSlider');
  
  // Iterate through the image URLs and create slides
  data.forEach((element) => {

    let parentAnchor = document.createElement('a');
    parentAnchor.href = element.cardUrl;
    parentAnchor.classList.add('slide');

    // Create slide div
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slide');
  
    // Create inner div with background image style
    const innerDiv = document.createElement('div');
    innerDiv.style.background = `url('${element.imgUrl}')`;
    innerDiv.style.backgroundSize = 'cover';
  
    // Append inner div to slide div
    slideDiv.appendChild(innerDiv);
  
    parentAnchor.appendChild(slideDiv);

    // Append slide div to slider container
    sliderContainer.appendChild(parentAnchor);
  });
}
  


// js for slider starts- hero section
var autoplayIntervalInSeconds = 3;


class PostSlider {

    constructor(containerElement,autoplayIntervalInSeconds) {
        this.container = containerElement;
        if (!this.container) {
            throw new Error(`Container not found.`);
        }

        this.slider = this.container.querySelector('.slider');
        this.prevBtn = this.container.querySelector('.handles .prev');
        this.nextBtn = this.container.querySelector('.handles .next');

        this.sLiderWidth = this.slider.clientWidth;
        this.oneSLideWidth = this.container.querySelector('.slide:nth-child(2)')?.clientWidth;
        // console.log(this.oneSLideWidth);
        this.sildesPerPage = Math.trunc(this.sLiderWidth / this.oneSLideWidth);
        this.slideMargin = ((this.sLiderWidth - (this.sildesPerPage * this.oneSLideWidth)) / (this.sildesPerPage * 10)).toFixed(5);
        this.changeSlidesMargins();

        // Assign this.dots before calling bindDotClickHandlers
        this.dots = this.container.querySelectorAll('.dots span');
        this.bindDotClickHandlers();

        this.makeSliderScrollable();
        this.prevBtn.addEventListener('click', () => this.prevSlider());
        this.nextBtn.addEventListener('click', () => this.nextSlider());

        this.createDots();
        this.setActiveDotByScroll();

        this.autoplayInterval = null;
        this.autoplayDelay = autoplayIntervalInSeconds*1000;

        this.startAutoplay()
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());

        return this;
    }
    changeSlidesMargins() {
        const slides = this.container.querySelectorAll('.slide');
        if (this.oneSLideWidth*2 > this.sLiderWidth){
            this.slideMargin = 1;
            this.oneSLideWidth = this.oneSLideWidth + (this.sLiderWidth - this.oneSLideWidth - 2);
            slides.forEach(slide => {
                slide.style.margin = "0 " + this.slideMargin + "px";
                slide.style.minWidth = this.oneSLideWidth + "px";
            });

        }else {
            slides.forEach(slide => {
                slide.style.margin = "0 " + this.slideMargin + "px";
            });
        }
    }


    scrollToPosition(position, smooth =true) {
        // console.log('Scrolling to position:', position);
        const currentPosition = this.slider.scrollLeft;
        const newPosition = currentPosition + position;

        this.slider.scrollTo({
            top: 0,
            left: newPosition,
            behavior: smooth ? 'smooth' : 'instant'
        });

        // console.log('Current position - New position:', currentPosition - newPosition);

        setTimeout(() => {
            this.snapToNearestSlide();
        }, 5000);
    }
    scrollWithDots(pos) {
        this.slider.scrollTo({
            top: 0,
            left: pos,
            behavior: "smooth"
        });
    }

    handleDotClick(index) {
        const position = index * (this.slider.getBoundingClientRect()['width']);
        this.scrollWithDots(position);
    }

    changeActiveDot(i) {
        for (let j = 0; j < this.dots.length; j++) {
            this.dots[j].classList.remove('active');
        }
        this.dots[i].classList.add('active');
    }


    bindDotClickHandlers() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].addEventListener('click', () => {
                // console.log('Dot clicked:', i);
                this.handleDotClick(i);
            });
        }
    }
    snapToNearestSlide(){

        const currentPosition = this.slider.scrollLeft;
        const nearestLeftScroll = Math.round(currentPosition / (this.oneSLideWidth+(this.slideMargin*2))) * (this.oneSLideWidth+(this.slideMargin*2));
        // console.log(nearestLeftScroll);
        this.slider.scrollTo({
            left:  nearestLeftScroll,
            behavior: 'smooth'
        });
    }
    makeSliderScrollable() {
        let isDragging = false;
        let startPosition;
        let startScrollPosition;

        this.slider.addEventListener('mousedown', (event) => startDrag(event));
        this.slider.addEventListener('touchstart', (event) => startDrag(event));

        const startDrag = (event) => {
            isDragging = true;
            startPosition = event.clientX || event.touches[0].clientX;
            startScrollPosition = this.slider.scrollLeft;

            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
        };

        const drag = (event) => {
            if (isDragging) {
                const currentX = event.clientX || event.touches[0].clientX;
                const deltaX = currentX - startPosition;
                this.slider.scrollLeft = startScrollPosition - deltaX;
            }
        };

        const endDrag = () => {
            if (isDragging) {
                isDragging = false;
                const currentPosition = this.slider.scrollLeft;
                const nearestLeftScroll = Math.round(currentPosition / (this.oneSLideWidth+(this.slideMargin*2))) * (this.oneSLideWidth+(this.slideMargin*2));
                // console.log(nearestLeftScroll);
                this.slider.scrollTo({
                    left:  nearestLeftScroll,
                    behavior: 'smooth'
                });

                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
                document.removeEventListener('mouseup', endDrag);
                document.removeEventListener('touchend', endDrag);
            }
        };
    }

    setActiveDotByScroll() {
       try {
        this.dots = this.container.querySelectorAll('.dots span');
        this.slider.addEventListener('scroll', () => {
            const scrollLeft = this.slider.scrollLeft;
            const currentIndex = Math.trunc((Math.abs(scrollLeft) + 2) / this.slider.clientWidth);

            // console.log('Scroll Left:', scrollLeft);
            // console.log('Current Index:', currentIndex);

            for (let i = 0; i < this.dots.length; i++) {
                this.dots[i].classList.remove('active');
            }

            this.dots[currentIndex].classList.add('active');

            this.prevBtn.style.opacity = Math.abs(scrollLeft) < 1 ? '0' : '1'; /*it means there is no element before so it would hide prev button*/
            this.nextBtn.style.opacity = Math.abs(scrollLeft) + 2 >= this.slider.scrollWidth - this.slider.clientWidth ? '0' : '1'; /*it means there is no element after so it would hide next button*/
        });
       } catch (error) {
        
       }
    }


    nextSlider() {
        const totalWidth = this.slider.scrollWidth;
        const currentScroll = this.slider.scrollLeft;
        const nextScroll = currentScroll + this.oneSLideWidth + (this.slideMargin * 2);

        if (nextScroll + this.slider.clientWidth > totalWidth) {
            // If next slide goes beyond the end, scroll to the beginning
            this.slider.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            this.scrollToPosition(this.oneSLideWidth + (this.slideMargin * 2));
        }
    }

    prevSlider() {
        const currentScroll = this.slider.scrollLeft;
        const prevScroll = currentScroll - (this.oneSLideWidth + (this.slideMargin * 2));

        if (prevScroll < 0) {
            // If previous slide goes before the beginning, scroll to the end
            this.slider.scrollTo({
                left: this.slider.scrollWidth - this.slider.clientWidth,
                behavior: 'smooth'
            });
        } else {
            this.scrollToPosition(-1 * (this.oneSLideWidth + (this.slideMargin * 2)));
        }
    }

    createDots() {
        const dotCount = Math.floor(this.slider.scrollWidth / this.slider.clientWidth);
        const dotsContainer = this.container.querySelector('.dots');
        dotsContainer.innerHTML = '';

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => {
                // this.changeActiveDot(i);
                this.handleDotClick(i);
            });

            if (i === 0) {
                dot.classList.add('active');
            }

            dotsContainer.appendChild(dot);
        }
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlider();
        }, this.autoplayDelay);
    }

    pauseAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}


window.addEventListener('load',function (){
    // var container = document.querySelector('.PostSlide .innerContainer');
    // new PostSlider(container,3);
})

// js for slider ends- hero section



// js for lab slider starts here

const slider_labtest = document.querySelector("[data-slider_labtest]");

const track = slider_labtest.querySelector("[data-slider-track_labtest]");
const prev = slider_labtest.querySelector("[data-slider-prev_labtest]");
const next = slider_labtest.querySelector("[data-slider-next_labtest]");

if (track) {
  prev.addEventListener("click", () => {
    next.removeAttribute("disabled");

    track.scrollTo({
      left: track.scrollLeft - track.firstElementChild.offsetWidth,
      behavior: "smooth"
    });
  });

  next.addEventListener("click", () => {
    prev.removeAttribute("disabled");

    track.scrollTo({
      left: track.scrollLeft + track.firstElementChild.offsetWidth,
      behavior: "smooth"
    });
  });

  track.addEventListener("scroll", () => {
    const trackScrollWidth = track.scrollWidth;
    const trackOuterWidth = track.clientWidth;

    prev.removeAttribute("disabled");
    next.removeAttribute("disabled");

    if (track.scrollLeft <= 0) {
      prev.setAttribute("disabled", "");
    }

    if (track.scrollLeft === trackScrollWidth - trackOuterWidth) {
      next.setAttribute("disabled", "");
    }
  });
}

// js for lab test slider ends here


// js for general card slider starts here
 
const slider_general = document.querySelector("[data-slider_general]");

const track_general = slider_general.querySelector("[data-slider-track_general]");
const prev_general = slider_general.querySelector("[data-slider-prev_general]");
const next_general = slider_general.querySelector("[data-slider-next_general]");

if (track_general) {
  prev_general.addEventListener("click", () => {
    next_general.removeAttribute("disabled");

    track_general.scrollTo({
      left: track_general.scrollLeft - track_general.firstElementChild.offsetWidth,
      behavior: "smooth"
    });
  });

  next_general.addEventListener("click", () => {
    prev_general.removeAttribute("disabled");

    track_general.scrollTo({
      left: track_general.scrollLeft + track_general.firstElementChild.offsetWidth,
      behavior: "smooth"
    });
  });

  track_general.addEventListener("scroll", () => {
    const trackScrollWidth = track_general.scrollWidth;
    const trackOuterWidth = track_general.clientWidth;

    prev_general.removeAttribute("disabled");
    next_general.removeAttribute("disabled");

    if (track_general.scrollLeft <= 0) {
      prev_general.setAttribute("disabled", "");
    }

    if (track_general.scrollLeft === trackScrollWidth - trackOuterWidth) {
      next_general.setAttribute("disabled", "");
    }
  });
}

 
// js for general slider ends here 

window.onload= function(){
    getAllHomepageData();
}
