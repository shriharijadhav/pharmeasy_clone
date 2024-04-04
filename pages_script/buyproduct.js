let allProductsData;
let cart = JSON.parse(localStorage.getItem('pharmEasyCart'))?JSON.parse(localStorage.getItem('pharmEasyCart')): [];
let pageCounter =1;
let itemNotFoundInCart = true;



function updateLocalCart(updatedCart) {
    localStorage.setItem('pharmEasyCart',JSON.stringify(updatedCart));
}

function addItemToCart(productId,quantity){
    // console.log(productId,'clicked');
    console.log(quantity,'revied quantity');
    // make itemNotFoundInCart true before start of process
    itemNotFoundInCart = true;

    allProductsData.map((element) =>{
        if(element.productId === productId){
            element.quantity = quantity?quantity: 1;

            // check if item is already in cart
            cart.map((cartItem) =>{
                if(cartItem.productId === productId){
                    // console.log('found in cart', cartItem.productId, 'quantity has been increased');
                    cartItem.quantity = cartItem.quantity + 1;

                    // set flag false if item is found in cart
                    itemNotFoundInCart = false;
                }
            });

            if(itemNotFoundInCart){
                // console.log('not found in cart',element.productId, 'added to cart');
                cart.push(element);
            }

            
           
            updateLocalCart(cart);
        }
        
    })

}




function showAllProductsData(parentID,data){
    let selectedOption ;
    if (data.length > 0) {
        let parentDiv = document.getElementById(`${parentID}`);

        data.map((item)=>{

            // Create grid item container
                const allProductsGridItem = document.createElement('div');
                allProductsGridItem.className = 'allProductsGrid_item';

                // Create image element
                const img = document.createElement('img');
                img.className = 'BPG_img';
                img.src = item.damImages[0].url;
                img.alt = '';

                // Create title paragraph
                const title = document.createElement('p');
                title.className = 'BPG_title';
                title.textContent = item.name.length > 37 ?( item.name.slice(0, 37) + '...' ): (item.name);

                // Create sub-division container
                const subDiv = document.createElement('div');
                subDiv.className = 'BPG_subDIv';

                // Create original price paragraph
                const originalPrice = document.createElement('p');
                originalPrice.className = 'BPG_OriginalPrice';
                originalPrice.textContent = 'MRP ';
                const span = document.createElement('span');
                span.className = 'lineThrought';
                span.textContent = `₹${item.mrpDecimal}`;
                originalPrice.appendChild(span);

                // Create discount background container
                const discountBG = document.createElement('div');
                discountBG.className = 'discountBG';
                discountBG.textContent = `${item.discountPercent}% OFF`;

                // Create price paragraph
                const price = document.createElement('p');
                price.className = 'BPG_price';
                price.textContent = `₹${item.salePriceDecimal}`;

                // Create add to cart button
                const addToCartBtn = document.createElement('button');
                addToCartBtn.className = 'BPG_addToCartBtn';
                addToCartBtn.textContent = 'Add to Cart';

                // Create a select element
                const select = document.createElement('select');
                select.classList.add('quantityDropdown');

                // Create options and add them to the select element
                for (let i = 1; i <= 10; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                select.appendChild(option);
                }

                // Set the default option to 1
                select.selectedIndex = 0;
                 // Get the select element
                
                // Add change event listener to handle option selection
                select.addEventListener('change', function(event) {
                    selectedOption = select.querySelector('option:checked');
                     // Remove 'Qty' from all options except the selected one
                    const options = select.querySelectorAll('option');
                    options.forEach(option => {
                        // Find and remove the text node containing 'Qty'
                        const qtyText = option.firstChild;
                        if (qtyText.textContent === 'Qty ') {
                        option.removeChild(qtyText);
                        }
                    });
                    
                    // Check if the selected option already contains 'Qty'
                    if (!selectedOption.textContent.startsWith('Qty')) {
                    // Create a new text node containing 'Qty'
                    const qtyText = document.createTextNode('Qty ');
                    
                    // Append the new text node before the existing text content of the selected option
                    selectedOption.insertBefore(qtyText, selectedOption.firstChild);
                    }
                    

                    
                 });



                // Trigger change event to initialize the dropdown
                select.dispatchEvent(new Event('change'));

                 addToCartBtn.addEventListener('click', () =>{addItemToCart(item.productId,selectedOption.value);})



                // Append child elements to their respective parent elements
                subDiv.appendChild(originalPrice);
                subDiv.appendChild(discountBG);
                allProductsGridItem.appendChild(img);
                allProductsGridItem.appendChild(title);
                allProductsGridItem.appendChild(subDiv);
                allProductsGridItem.appendChild(price);
                allProductsGridItem.appendChild(select);
                allProductsGridItem.appendChild(addToCartBtn);

                parentDiv.appendChild(allProductsGridItem);
        })

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

async function  getAllProductPageData(){
    try {
        const response = await fetch('https://customapis.onrender.com/api/v1/getAllProductsData');
        const data = await response.json();
        // console.log(data.message[0].OuterObj.data.products);

        allProductsData = data.message[0].OuterObj.data.products;
        showAllProductsData('allProductsGridID',allProductsData);

        
        


    } catch (error) {
        
    }


}


async function getAllHomepageData(){
    // use try-catch block to avoid runtime errors
    try {
        const response = await fetch('https://customapis.onrender.com/api/v1/getPharmEasyHomepageData');
        const data = await response.json();

        footerData = data.message[0].homPageData.footerLinks;

        showFooterLinks(footerData);
        
    } catch (error) {
    }
}

// function handleScroll() {
//     const scrollHeight = container.scrollHeight;
//     const scrollTop = container.scrollTop;
//     const clientHeight = container.clientHeight;
  
//     console.log(scrollHeight + " " + scrollTop + " "+ clientHeight);
//     if (scrollTop + clientHeight >= scrollHeight) {
//       // User has reached the bottom of the div
//       // Perform your action here, such as fetching more data
//       console.log("reached bottom of div");
//     }
//   }


//   async function getNextSetOfData(pageCounter){
//     // use try-catch block to avoid runtime errors
//     try {
//         const response = await fetch(`https://pharmeasy.in/api/otc/getCategoryProducts?categoryId=9297&page=${pageCounter}`);
//         const data = await response.json();

//         console.log('object', data);
        
//     } catch (error) {
//     }
// }

// // Debounce function
// function debounce(func, delay) {
//     let timeoutId;
//     return function(...args) {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }

// // Function to make network request
// function fetchData() {
//     // Replace this with your actual API endpoint and request logic
//     fetch(`https://pharmeasy.in/api/otc/getCategoryProducts?categoryId=9297&page=${pageCounter}`)
//         .then(response => response.json())
//         .then(data => {
//             // Handle fetched data
//             console.log('Fetched data:', data);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
        
// }



window.addEventListener('load',function (){
    

    getAllProductPageData();
    // for footer
    getAllHomepageData();


//   // Scroll event handler with debouncing
// document.addEventListener('scroll', debounce(function() {
//     const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
//     if (scrollTop + clientHeight >= scrollHeight - 100) {
//         // User has scrolled to the bottom, fetch more data
//         fetchData();
//     }
// }, 300)); // Adjust debounce delay as needed

})





// js for slider ends- hero section
