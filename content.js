// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    
    var domInfo = {
      total:   getPrice(window.location.href),
      inputs:  document.querySelectorAll('input').length,
      buttons: document.querySelectorAll('button').length
    };

    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(domInfo);
  }
});


function getPrice (url) {

  var price;
  var priceNum;
  var ceiling;
  var donation;
  if (url.indexOf("forever21") !== -1){
    price = document.getElementsByClassName("total_price")[0].innerHTML.substring(1); // gets the innerHTML -> $31.86
    priceNum = parseFloat(price);
    ceiling = Math.ceil(priceNum);
    donation = Math.round(100*(ceiling - priceNum))/100;
  } else if (url.indexOf("sephora") !== -1){
    price = document.getElementsByClassName("Receipt-price")[0].innerHTML.substring(1); // gets the innerHTML -> $31.86
    priceNum = parseFloat(price);
    ceiling = Math.ceil(priceNum);
    donation = Math.round(100*(ceiling - priceNum))/100;
  }  

  if (donation == 0) {
    donation = 1;
  }
  return donation;
};


