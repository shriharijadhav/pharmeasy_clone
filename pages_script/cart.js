let cartFetchedFromLocal = getCartFromLocal()?getCartFromLocal():[];

 
function getCartFromLocal(){
    return       JSON.parse(localStorage.getItem('pharmEasyCart'));
}

function updateCartWithNewValues(data){
    if(data){
        localStorage.setItem('pharmEasyCart', JSON.stringify(data));
    }
}

function deleteItemFromCart(productId){
    // console.log('deleted item ', productId);
    cartFetchedFromLocal =  cartFetchedFromLocal.filter(item => item.productId !== productId);
    // console.log(cartFetchedFromLocal);

    updateCartWithNewValues(cartFetchedFromLocal);
    showUIBasedOnCart(cartFetchedFromLocal);
}


function updateQuantity(updatedQuantity,productId){
    console.log(updatedQuantity,productId);
    
    cartFetchedFromLocal.map(item=>{
        if(item.productId === productId){
            item.quantity = Number(updatedQuantity);
            console.log(item)
        }
    })

    
    // update local cart
    updateCartWithNewValues(cartFetchedFromLocal);
    showUIBasedOnCart(cartFetchedFromLocal);

}

function showUIBasedOnCart(cartData){
    // console.log('object',cartData);
    // Part -1 - Update cart UI
     // append items to cart UI
   

    if(cartData.length > 0){
        console.log(cartData.length,'length');
    
        document.getElementById('itemCountID').textContent = cartData.length;
        
        // hide emptyCartDiv & deliveryDiv
        try {
            document.getElementById('deliveryDivId').classList.add('hiddenDiv');
        document.getElementById('emptyCartDivID').classList.add('hiddenDiv');

        document.getElementById('applyCouponDivId').classList.remove('hiddenDiv');
        document.getElementById('billingMainDiv_twoID').classList.remove('hiddenDiv');
        } catch (error) {
            
        }


        let parent1 = document.getElementById('leftSideCartUIDiv');
        parent1.innerHTML = '';





        cartData.map((item,index) => {
               // Create parent div with class 'cartItemDiv' and 'borderBottomDiv'
        const cartItemDiv = document.createElement('div');
        if (index !== cartData.length - 1) {
            cartItemDiv.classList.add('cartItemDiv', 'borderBottomDiv');
        }else{
            cartItemDiv.classList.add('cartItemDiv');

        }

        // Create div for image with class 'c_imgDiv'
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('c_imgDiv');

        // Create image element with class 'c_img' and set its source
        const img = document.createElement('img');
        img.classList.add('c_img');
        img.src = item.damImages[0].url;
        img.alt = '';

        // Append image element to image div
        imgDiv.appendChild(img);

        // Create div for details with class 'c_detailsDiv'
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('c_detailsDiv');

        // Create paragraph for item name with class 'c_itemName' and set text content
        const itemName = document.createElement('p');
        itemName.classList.add('c_itemName');
        itemName.textContent = item.name;

        // Create paragraph for manufacturer with class 'c_manufacturer' and set text content
        const manufacturer = document.createElement('p');
        manufacturer.classList.add('c_manufacturer');
        manufacturer.textContent = `By ${item.manufacturer}`;

        // Create div for pricing and delivery with class 'PDD_div'
        const pddDiv = document.createElement('div');
        pddDiv.classList.add('PDD_div');

        // Create paragraph for MRP with text content and span for line through
        const mrp = document.createElement('p');
        mrp.textContent = 'MRP ';
        const lineThrough = document.createElement('span');
        lineThrough.classList.add('lineThrough');
        lineThrough.textContent = `₹${item.mrpDecimal}*`;
        mrp.appendChild(lineThrough);

        // Create paragraph for discounted price with text content
        const price = document.createElement('p');
        price.textContent = `₹${item.salePriceDecimal}*`;

        // Create paragraph for discount with class 'c_discount' and set text content
        const discount = document.createElement('p');
        discount.classList.add('c_discount');
        discount.textContent = `${item.discountPercent}% OFF`;

        // Append paragraphs to pricing and delivery div
        pddDiv.appendChild(mrp);
        pddDiv.appendChild(price);
        pddDiv.appendChild(discount);

        // Create paragraph for delivery with text content
        const delivery = document.createElement('p');
        delivery.textContent = 'Delivery by Today, before 10:00 pm';

        // Append paragraphs to details div
        detailsDiv.appendChild(itemName);
        detailsDiv.appendChild(manufacturer);
        detailsDiv.appendChild(pddDiv);
        detailsDiv.appendChild(delivery);

        // Create div for buttons with class 'c_btnDiv'
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('c_btnDiv');

        // Create button for delete with class 'deleteBtnDiv'
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtnDiv');
        deleteBtn.addEventListener('click',() => {deleteItemFromCart(item.productId)});

        // Create image for delete button with source
        const deleteImg = document.createElement('img');
        deleteImg.src = '../images/logo_icons/icDelete.svg';
        deleteImg.alt = '';

        // Append image to delete button
        deleteBtn.appendChild(deleteImg);

        // Create div for select parent with class 'selectparent'
        const selectParent = document.createElement('div');
        selectParent.classList.add('selectparent');

        // Create paragraph for quantity with text content
        const qtyPara = document.createElement('p');
        qtyPara.textContent = 'Qty';

        // Create select element with name and id
        const selectQuantity = document.createElement('select');
        selectQuantity.name = 'selectQuantityName';
        selectQuantity.id = 'selectQuantityID';

        // Create options for select element with values and text content
        for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectQuantity.appendChild(option);
        }
 

        // Append paragraph and select to select parent div
        selectParent.appendChild(qtyPara);
        selectParent.appendChild(selectQuantity);
        let allOptions = selectQuantity.querySelectorAll('option');
        allOptions.forEach((option,index) => {
            // console.log(option.value, item.quantity);

            if (Number(option.value) === Number(item.quantity)){
                console.log(option.value, item.quantity);
                selectQuantity.selectedIndex = index;
            } 
        });

        selectQuantity.addEventListener('change', (event) => {updateQuantity(event.target.value,item.productId);});

        // Append delete button and select parent to button div
        btnDiv.appendChild(deleteBtn);
        btnDiv.appendChild(selectParent);

        // Append image div, details div, and button div to cart item div
        cartItemDiv.appendChild(imgDiv);
        cartItemDiv.appendChild(detailsDiv);
        cartItemDiv.appendChild(btnDiv);

        parent1.appendChild(cartItemDiv);
        });
         
    }

    // Part - 2 - Update Billing UI 1
    if(cartData.length > 0) {

        // hide disabled buttons
        document.getElementById('proceedToCheckOutDivID').classList.add('hiddenDiv');
        let totalPrice = cartData.reduce((total, item) => total + (item.quantity * item.salePriceDecimal), 0);

        document.getElementById('totlaPriceDivId').textContent = `₹${totalPrice.toFixed(2)}`;

    }


    // part -3 - update Billing Information 2
    if(cartData.length > 0) {

        
            let totalMRP_value = cartData.reduce((sum,item) => sum + (parseFloat(item.mrpDecimal)*item.quantity),0);
            console.log(totalMRP_value)

            let totalDiscountPrice = cartData.reduce((sum,item) => sum + (parseFloat(item.salePriceDecimal)*item.quantity),0);

            let discountOnMRP = totalMRP_value - totalDiscountPrice;
            console.log(discountOnMRP,totalMRP_value,totalDiscountPrice)

            let totalMRPDiv = document.getElementById('totalMRPID');
            totalMRPDiv.textContent = `₹${totalMRP_value.toFixed(2)}`;

            let discountAmountDiv  = document.getElementById('discountAmountID');
            discountAmountDiv.textContent = `- ₹${discountOnMRP.toFixed(2)}`;

            let totalCartValue = cartData.reduce((total, item) => total + (item.quantity * item.salePriceDecimal), 0);
            document.getElementById('totalCartValueID').textContent = `₹${totalCartValue.toFixed(2)}`;

            let amountToBePaidDiv = document.getElementById('amountToBePaidID');
            amountToBePaidDiv.textContent = ` ₹${totalCartValue.toFixed(2)}`;  
    }



    if(cartData.length <= 0){

        document.getElementById('itemCountID').textContent = cartData.length;
        document.getElementById('totlaPriceDivId').textContent = `00:00`;

        let parent1 = document.getElementById('leftSideCartUIDiv');
        parent1.innerHTML = '';

        try {
            document.getElementById('deliveryDivId').classList.remove('hiddenDiv');
        document.getElementById('emptyCartDivID').classList.remove('hiddenDiv');
        document.getElementById('proceedToCheckOutDivID').classList.remove('hiddenDiv');

        document.getElementById('applyCouponDivId').classList.add('hiddenDiv');
        document.getElementById('billingMainDiv_twoID').classList.add('hiddenDiv');
        } catch (error) {
            
        }
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
// get data using async & await- recommended approach
async function getAllHomepageData(){
// use try-catch block to avoid runtime errors
try {
    const response = await fetch('https://customapis.onrender.com/api/v1/getPharmEasyHomepageData');
    const data = await response.json();
    

    footerData = data.message[0].homPageData.footerLinks;
    showFooterLinks(footerData);

    
    return data;

} catch (error) {
}
}


window.onload= function(){
    getAllHomepageData();

    showUIBasedOnCart(cartFetchedFromLocal);
}

