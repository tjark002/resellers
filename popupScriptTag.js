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
style_rules.push(".formPopup" + " { display: none;position: fixed;left: 45%;top: 5%;transform: translate(-50%, 5%);border: 3px solid #999999;z-index: 9; } ");
style_rules.push(".formContainer" + " { max-width: 300px;padding: 20px;background-color: #fff; } ");


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
    formPopup.innerHTML = "<div class='formContainer'><h2>Please Log in</h2><label for='email'>  <strong>Reseller-ID</strong></label><input type='text' id='resellerid' placeholder='Die ID Deines Resellers' name='resellerid' required><button onclick='sendResellerIdToBackend()' class='btn'>Bestätigen</button></div>";
    
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
    
    if (getCookie('resellerid') == null) {
        if (urlSearchParams.has('resellerid')) {
            sendResellerIdToBackend(urlSearchParams.get('resellerid'));
        } else {
            popUp();       
        }
    } else {
        sendResellerIdToBackend(getCookie('resellerid'));
    }

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