// Update the relevant fields with the new data
function setDOMInfo(info) {
  document.getElementById('Price').textContent   = info.Price;
  document.getElementById('Donation').textContent  = info.Donation;
  document.getElementById('buttons').textContent = info.buttons;
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
});

function showDonate() {
  var donateItem = document.getElementById('donate-info');
  donateItem.style.display = 'block';
}

function showNewCC() {
  var ccItem = document.getElementById('new-cc');
  ccItem.style.display = 'block';
}

function changeCC() {

  var currentCC = document.getElementById('current-cc');
  var newCC = document.getElementById('frmCCNum');
  console.log(currentCC);
  console.log(newCC);
  // currentCC.innerHTML = newCC.innerHTML;
}


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', showDonate);
  document.querySelector('#add-cc').addEventListener('click', showNewCC);
  document.querySelector('#save-link').addEventListener('click', changeCC);
});

