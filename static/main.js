const vapidPublicKey = "BLopEDYPbeESlGuxRdCsXZxUFLTP1nY-bJsS8eu6TTkkYeJP7tQ9ZZijXOmFwSUcyE3vrUSu95tWHxZeWOyd8X4";

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

function subscribe() {
  navigator.serviceWorker.ready.then(function(registration) {
    return registration.pushManager.subscribe({
        userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
          });
        })
    .then(function(subscription) {
      //console.log(JSON.stringify(subscription));
      sendSubscriptionInfo(subscription);
    })
    .catch(err => console.error(err));
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
  navigator.serviceWorker.ready
    .then(function(registration) {
      return registration.pushManager.getSubscription();
    })
    .then(function(subscription) {
      if (!subscription) {
        subscribe();
      } else {
        //console.log(
        //  JSON.stringify(subscription)
	//);
        //sendSubscriptionInfo(subscription);
      }
    });
}

function sendSubscriptionInfo (subscriptionInfo) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (xhttp.status === 200) {
      console.log("Successfully subscribed");
    }
  }
  xhttp.open("POST", "//api.hah.gay/subscribe", true);
  xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhttp.send(JSON.stringify(subscriptionInfo));
}
