const form = document.getElementById('shorten-link-form');
const formBox = document.getElementById('form-box');
const inputWrapper = document.getElementById('input-wrapper');
const input = document.getElementById('form-input');
const result = document.getElementById('result');
const linkResults = document.getElementById('link-results');
let prevBtn;

/*Note! Could not access Clean URL API, used Spoo.me instead for link shortening*/
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload

  const url = input.value.trim();
  // Fetch short url from API using input value url
  try {
    const response = await fetch('https://spoo.me', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ url })
    });
    // Throw an API error if received bad response
    if (!response.ok) throw new Error('API request failed');
    // Otherwise get the data
    const data = await response.json();

    // Create new short link result divs under form
    const newDiv = document.createElement('div');
    newDiv.className = 'result-div';
    const prevURL = document.createElement('p');
    prevURL.textContent = url;
    prevURL.className = 'prev-url-p';
    const linkSpan = document.createElement('span');
    linkSpan.className = 'link-span';
    const newURL = document.createElement('p');
    newURL.textContent = data.short_url;
    newURL.className = 'new-url-p';
    const copyBtn = document.createElement('button');
    copyBtn.classList = 'copy-btn btn--filled btn--small';
    copyBtn.textContent = "Copy";
    linkSpan.appendChild(newURL);
    linkSpan.appendChild(copyBtn);
    newDiv.appendChild(prevURL);
    newDiv.appendChild(linkSpan);
    linkResults.appendChild(newDiv);

    // Listen for click to copy on copy button
    copyBtn.addEventListener('click', () => {
      // If there was a previous button copied, revert its style
      if (prevBtn && prevBtn !== copyBtn) {
        prevBtn.classList.remove('btn--copied');
        prevBtn.textContent = "Copy";
      }
      // Copy the data, and visually show its been copied
      navigator.clipboard.writeText(data.short_url)
        .then(() => {
          copyBtn.classList.add('btn--copied');
          copyBtn.textContent = "Copied!";
          prevBtn = copyBtn;
        })
        .catch(err => console.error('Failed to copy: ' + err));
    });
    //Remove red border style around input if there was an error before
    if (input.className) {
      input.className = '';
      const reqMsg = document.querySelector('.error-message');
      inputWrapper.removeChild(reqMsg);
    }
  } catch (err) {
    // Create red border style around input field if error
    input.className = 'input-error';
    // Check for existing error message,
    // if message already exists, just handle text
    // else create new div and class, then handle text
    const existingErrorMsg = document.querySelector('.error-message');
    let reqMsg;
    if (existingErrorMsg) {
      reqMsg = existingErrorMsg;
      handleErrorText(reqMsg, input);
    }
    else {
      // Create new div with class
      reqMsg = document.createElement('div');
      reqMsg.className = 'error-message';
      handleErrorText(reqMsg, input);
      // Insert it after the input in wrapper
      inputWrapper.appendChild(reqMsg);
    }
  }
});

//Handles require message text for errors
function handleErrorText(reqMsg, input) {
  if (input.value.trim() === '')
    reqMsg.textContent = 'Please add a link';
  else {
    reqMsg.textContent = 'Please add a valid link (must start with http:// or https://)';
  }
};



