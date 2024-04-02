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
        const currentPosition = this.slider.scrollLeft;
        const newPosition = currentPosition + position;

        this.slider.scrollTo({
            top: 0,
            left: newPosition,
            behavior: smooth ? 'smooth' : 'instant'
        });


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
                this.handleDotClick(i);
            });
        }
    }
    snapToNearestSlide(){

        const currentPosition = this.slider.scrollLeft;
        const nearestLeftScroll = Math.round(currentPosition / (this.oneSLideWidth+(this.slideMargin*2))) * (this.oneSLideWidth+(this.slideMargin*2));
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


            for (let i = 0; i < this.dots.length; i++) {
                this.dots[i].classList.remove('active');
            }

           try {
            this.dots[currentIndex].classList.add('active');
           } catch (error) {
            
           }

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
// slide show js ends here

function showBuyProductHeroSectionSlideshow(parentID,data){

    if(data.length > 0){
        const sliderContainer = document.getElementById(`${parentID}`);
        
         // Iterate through the image URLs and create slides
         data.forEach((element) => {
 
         let parentAnchor = document.createElement('a');
         parentAnchor.href = '../pages/buyproduct.html';
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
           
}


function showFooterLinks(data){
    let parentID;
   if(data.length >0){
        
        data.map((item)=>{

            if (item.category === "Company") {
                parentID = "f_companyID";
            } else if(item.category === "Our Services") {
                parentID= "f_ourServicesID";
            }else if(item.category === "Featured Categories") {
                parentID = "f_featuredCategoryID";
            }else if(item.category === "Need Help") {
                parentID = "f_needHelpId";
            }else{
                parentID = "f_policyInfoId";
            }
            let parentDiv = document.getElementById(`${parentID}`)

            const listItem = document.createElement('li');

        // Create <a> element
        const anchor = document.createElement('a');
        anchor.href = "./pages/footerLink.html"; // Set href attribute
        anchor.textContent = item.title; // Set link text

        // Append <a> element to <li> element
        listItem.appendChild(anchor);
        parentDiv.appendChild(listItem);
        })
   }
}

function showTextDiv(parentID,data){
    if(data.length > 0){
        const parentDiv = document.getElementById(`${parentID}`);

        data.map((item)=>{
            // Create parent div element
            const textDiv = document.createElement('div');
            textDiv.classList.add('textDiv_buyProductHomepage_subDiv');

             // Create first paragraph element with bold text
             const boldText = document.createElement('p');
             boldText.classList.add('boldText_BPH');
             boldText.textContent = item.title;


            if(item.content){
               
                // Create second paragraph element with regular text
                const regularText = document.createElement('p');
                regularText.style.fontSize = '18px';
                regularText.textContent = item.content;

                // Append paragraphs to the parent div
                textDiv.appendChild(boldText);
                textDiv.appendChild(regularText);
                parentDiv.appendChild(textDiv);   


            }else{
                // Create ul element
                    const ulElement = document.createElement('ul');

                    item.listItems.map((liItem) => {
                        const listItem1 = document.createElement('li');
                        listItem1.textContent = liItem.liContent;
                        listItem1.style.padding = '5px 0px';
                        ulElement.appendChild(listItem1);

                    });
                    // Append list items to ul element
 
                    // Append paragraph and ul to the parent div
                    textDiv.appendChild(boldText);
                    textDiv.appendChild(ulElement);
                    parentDiv.appendChild(textDiv);   

            }
        });
    }
    
}
function showHeroSectionAllProductsGrid(parentID,data){
    if(data.length > 0){
        const parentDiv = document.getElementById(`${parentID}`);

        data.map((item)=>{
                        
            // Create grid item element
            const gridItem = document.createElement('div');
            gridItem.classList.add('gridItem_for_all_category');

            // Create anchor element
            const anchor = document.createElement('a');
            anchor.href = '../pages/buyproduct.html';
            anchor.classList.add('g_anchorDiv');

            // Create first div inside anchor
            const div1 = document.createElement('div');
            div1.classList.add('g_div1');

            // Create image element inside first div
            const img = document.createElement('img');
            img.classList.add('g_div_img');
            img.src = item.imgUrl;
            img.alt = '';

            // Append image to first div
            div1.appendChild(img);

            // Create second div inside anchor
            const div2 = document.createElement('div');
            div2.classList.add('g_div2');

            // Create paragraph element inside second div
            const paragraph1 = document.createElement('p');
            paragraph1.textContent = item.title;

            // Append paragraph to second div
            div2.appendChild(paragraph1);

            // Create third div inside anchor
            const div3 = document.createElement('div');
            div3.classList.add('g_div3');

            // Create paragraph elements inside third div
            const paragraph2 = document.createElement('p');
            paragraph2.textContent = 'Upto';

            const paragraph3 = document.createElement('p');
            paragraph3.textContent = `${item.discount}% off`;

            // Append paragraphs to third div
            div3.appendChild(paragraph2);
            div3.appendChild(paragraph3);

            // Append divs to anchor
            anchor.appendChild(div1);
            anchor.appendChild(div2);
            anchor.appendChild(div3);

            // Append anchor to grid item
            gridItem.appendChild(anchor);

            parentDiv.appendChild(gridItem);

        })
    }
}

async function  getBuyProductPageData(){
    try {
        const response = await fetch('https://customapis.onrender.com/api/v1/getPharmEasyBuyProductData');
        const data = await response.json();
        console.log(data)

        let buyProductHeroSectionSlideshowData = data.message[0].buyProductsPage.buyProductHeroSectionSlideshow;
        showBuyProductHeroSectionSlideshow('buyproductHeroSectionID',buyProductHeroSectionSlideshowData);

        let HeroSectionAllProductsGridData = data.message[0].buyProductsPage.buyproduct_allCategories;
        showHeroSectionAllProductsGrid('buyProductGridContainer_ID',HeroSectionAllProductsGridData);

                   
        let textDivData = data.message[0].buyProductsPage.textDiv;
        showTextDiv('textDivID',textDivData);

        footerData = data.message[0].buyProductsPage.footerLinks;
        showFooterLinks(footerData);



    } catch (error) {
        
    }



    // for hero section slide show
    var container = document.querySelector('.PostSlide .innerContainer');
    new PostSlider(container,3);
}

window.addEventListener('load',function (){
    

    getBuyProductPageData();

})

// js for slider ends- hero section
