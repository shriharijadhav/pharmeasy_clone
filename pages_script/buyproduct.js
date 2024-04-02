let allProductsData;
let cart = JSON.parse(localStorage.getItem('pharmEasyCart'))?JSON.parse(localStorage.getItem('pharmEasyCart')): [];


function addItemToCart(productId){

    allProductsData.map((item) =>{
        if(item.productId === productId){
            item.productId = productId;
        console.log('item found',item);
        }
        
    })

}



function showAllProductsData(parentID,data){
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
                addToCartBtn.addEventListener('click', () =>{addItemToCart(item.productId);})

                // Append child elements to their respective parent elements
                subDiv.appendChild(originalPrice);
                subDiv.appendChild(discountBG);
                allProductsGridItem.appendChild(img);
                allProductsGridItem.appendChild(title);
                allProductsGridItem.appendChild(subDiv);
                allProductsGridItem.appendChild(price);
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

window.addEventListener('load',function (){
    

    getAllProductPageData();

    // for footer
    getAllHomepageData();

})

// js for slider ends- hero section
