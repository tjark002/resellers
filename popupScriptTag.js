/*jQuery(document).ready(function() {

		const path = window.location.pathname;
	    // The pathname most likely looks like /collections/something/products/product-handle
	    const productHandle = path.substring(path.lastIndexOf("/") + 1);
		console.log(productHandle);
		
		const requestPath = "/apps/valette/product/"+productHandle+"/preorder_settings/"

		$.get(requestPath)
		  .done(function( data ) {

			var stringified = JSON.stringify(data);
		    var preorderDetails = JSON.parse(stringified);
		    console.log( "Data Loaded: " + stringified );

		    const parentDivClasses = 'product-form__item product-form__item--submit product-form__item--payment-button';
		    const buttonStyle = 'display: block; width: 100%; font-size: 16px; font-family: font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 1.4; padding: 8px; margin-top: 10px; margin-bottom: 10px; min-height: 44px; background-color: #000; color: #3a3a3a; border-color: #3a3a3a;';
		    const buttonClass = 'shopify-payment-button';
		    const message = '<p>'+preorderDetails.messageText+'</p>'

//		    $('.product-form__item--payment-button').prepend('<div class="'+parentDivClasses+'"><button type="submit" class="'+buttonClass+'" style="'+buttonStyle+'" data-testid="Checkout-button">'+preorderDetails.buttonText+'</button>'+message+'</div>')
			
			$('.product-form__item--payment-button').hide();

			if(preorderDetails.goalReached){
				$('.product-form__controls-group--submit').prepend('<div class="'+parentDivClasses+'"><button type="submit" class="'+buttonClass+'" style="'+buttonStyle+'" data-testid="Checkout-button" disabled>'+preorderDetails.disabledButtonText+'</button></div>')	
	
			}else{
				$('.product-form__controls-group--submit').prepend('<div class="'+parentDivClasses+'"><button type="submit" class="'+buttonClass+'" style="'+buttonStyle+'" data-testid="Checkout-button">'+preorderDetails.buttonText+'</button>'+message+'</div>')	
			}
		

			console.log('Button Added!');

		  }).fail(function(){ 
			  // Handle error here
			  console.log("Not a preorder");
		});

});*/

var style_rules = [];

style_rules.push("#ac-wrapper" + " { position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(255,255,255,.6);z-index: 1001; } ");
style_rules.push("#popup" + " { width: 555px;height: 375px;background: #FFFFFF;border: 5px solid #000;border-radius: 25px;-moz-border-radius: 25px;-webkit-border-radius: 25px;box-shadow: #64686e 0px 0px 3px 3px;-moz-box-shadow: #64686e 0px 0px 3px 3px;-webkit-box-shadow: #64686e 0px 0px 3px 3px;position: relative;top: 150px; left: 375px; } ");
style_rules.push(".loginPopup" + " { position: relative;text-align: center;width: 100%; } ");
style_rules.push(".formPopup" + " { display: none;position: fixed;left: 45%;top: 5%;transform: translate(-50%, 5%);border: 2px solid #333333;z-index: 9; border-radius:7px; } ");
style_rules.push(".formContainer" + " { max-width: 300px;padding: 20px;background-color: #fff; border-radius:7px} ");
style_rules.push("#resellerid" + " { background-color: white;color: #333333; border-color: #d9d9d9; border: 1px solid; background-clip: padding-box; border-radius: 5px; display: block; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; padding: 0.9285714286em 0.7857142857em; word-break: normal; line-height: inherit; } ");
style_rules.push(".btn" + " { cursor: pointer; display: inline; margin: 0 auto; justify-content: center; align-items: center; box-sizing: border-box; font: inherit; text-decoration: none; border: 0; border-radius: 0; background-color: var(--color-button-background); box-shadow: 0 0 0 .1rem var(--color-button-border); color: var(--color-button-text); min-width: 12rem; min-height: 4.5rem; transition: box-shadow var(--duration-short) ease; -webkit-appearance: none; appearance: none; } ");
style_rules.push("#flex-btns" + "{ display: flex; justify-content: space-between; margin-top: 20px; } ");


var style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.innerHTML = style_rules.join("\n");

document.head.append(style);
    
function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}


ready(function(){
    
    var loginPopup = document.createElement('div');
    loginPopup.setAttribute("class", "loginPopup");
    
    var formPopup = document.createElement('div');
    formPopup.setAttribute("class", "formPopup");
    formPopup.setAttribute("id", "popupForm");
    formPopup.innerHTML = "<div class='formContainer'><h2>Bitte gebe Deine Reseller-ID ein:</h2><input type='text' id='resellerid' placeholder='Die ID Deines Resellers' name='resellerid' required></input><div id='flex-btns'><button onclick='sendResellerIdToBackend(0)' class='btn'>Ich habe keine</button><button onclick='sendResellerIdToBackend()' class='btn'>Bestätigen</button></div></div>";
    
    document.body.appendChild(loginPopup);
    document.getElementsByClassName('loginPopup')[0].appendChild(formPopup);

    
    /*const acwrapper = document.createElement('div');
    acwrapper.setAttribute("id", "ac-wrapper");
    
    var popup = document.createElement('div');
    popup.setAttribute("id", "popup");
    popup.innerHTML = "<center> <h2>Popup Content Here</h2></center>";
    
    document.body.appendChild(acwrapper);
    document.getElementById('ac-wrapper').appendChild(popup);*/
    
    console.log("It works");
    
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    console.log(urlSearchParams.has('resellerid')); // true
    
    //if (getCookie('resellerid') == null) {
        if (urlSearchParams.has('resellerid')) {
            sendResellerIdToBackend(urlSearchParams.get('resellerid'));
        } else {
            popUp();     
            var checkout_buttons = document.getElementsByName("checkout");
            for (var i = 0; i < checkout_buttons.length; i++) {
                checkout_buttons[i].disabled = true;
            }
        }
    //} else {
    //    sendResellerIdToBackend(getCookie('resellerid'));
    //}

});
/*document.g
$(document).ready(function(){
   setTimeout(function(){
      PopUp();
   },5000); // 5000 to load it after 5 seconds from page load
});
*/
function popUp(){
    document.getElementById("popupForm").style.display = "block";
}

function popDown(){
    document.getElementById("popupForm").style.display = "none";
}

function sendResellerIdToBackend(id) {
    if (id == null) {
        id = document.getElementById("resellerid").value;
    }
    console.log("ID to fetch", id);
    fetch(`/a/reseller/id?resellerid=${id}`);
    createCookie("resellerid", id, 90);
}

function createCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toUTCString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}

function checkCookie() {
    // Get cookie using our custom function
    var resellerid = getCookie("resellerid");
    
    if(resellerid != "") {
        console.log("Cookie Reseller", resellerid)
        return resellerid;
    } else {
        return null;
    }
}