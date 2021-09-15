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
    formPopup.innerHTML = '<form action="/action_page.php" class="formContainer"><h2>Please Log in</h2><label for="email">  <strong>Reseller-ID</strong></label><input type="text" id="resellerid" placeholder="Die ID des Deines Resellers" name="resellerid" required><button type="submit" class="btn">Bestätigen</button><!--<button type="button" class="btn cancel" onclick="popDown()">Close</button>--></form>';
    
    document.body.appendChild(loginPopup);
    document.getElementsByClassName('loginPopup')[0].appendChild(formPopup);
    fetch(`/a/reseller/id`, {
        method: 'POST',
        body: 'test'
    });
    
    /*const acwrapper = document.createElement('div');
    acwrapper.setAttribute("id", "ac-wrapper");
    
    var popup = document.createElement('div');
    popup.setAttribute("id", "popup");
    popup.innerHTML = "<center> <h2>Popup Content Here</h2></center>";
    
    document.body.appendChild(acwrapper);
    document.getElementById('ac-wrapper').appendChild(popup);*/
    
    console.log("It works");
    
    popUp();
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