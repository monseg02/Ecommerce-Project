const form = document.getElementById("google-sheet-form");
const statusMessage = document.getElementById('status-message');
const submitButton = document.getElementById('submit-btn');
const scriptURL = "https://script.google.com/macros/s/AKfycbzguR5aie3WitcXl19NSnb_SXl8Qvt4LcNiLKwjqLNRH5e76LcMZhYvMcXCu_zjPIHM0g/exec";

form.addEventListener('submit', e => {
    // 1. Prevent the page from reloading
    e.preventDefault();

    // 2. Visual feedback for the user
    submitButton.disabled = true;
    statusMessage.style.color = 'black';
    statusMessage.textContent = 'Submitting data...';

    // 3. Automatically package the form fields into FormData
    const formData = new FormData(form);

    // 4. Send the data to your Google Apps Script Exec URL
    fetch(scriptURL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    .then(() => {
        statusMessage.style.color = 'green';
        statusMessage.textContent = 'Submitted successfully!';
        form.reset();
    })
    .catch(error => {
      statusMessage.style.color = 'red';
      statusMessage.textContent = 'Network error or CORS issue occurred.';
      console.error('Error!', error);
    })
    .finally(() => {
      // 5. Re-enable the button
      submitButton.disabled = false;
    });
  });
