// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

const settings = document.getElementsByTagName('img')[0]
window.onpopstate = function(event) {
  setState(location.hash, history.state)
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let i = 0;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener('click', e => {
          history.pushState(newPost.entry, `#entry${i}`)
          window.location.hash = `#entry${i}`
          setState('entry', { ...entry, idx: i })
        })
        i++;
      });
    });
});

settings.addEventListener('click', e => {
  history.pushState({}, `#settings`)
  window.location.hash = `#settings`
})

