const init = function () {
  console.log('script loaded');

  htmlButton = document.querySelector('.js-button');
  htmlJoke = document.querySelector('.js-joke');
  htmlLoader = document.querySelector('.js-loading-state');
  let loadingDelay;

  htmlButton.addEventListener('click', function () {
    getJoke()
      .then((joke) => {
        htmlJoke.innerHTML = joke;
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const showLoader = function () {
    loadingDelay = setTimeout(() => {
        htmlLoader.classList.remove('u-hidden');
    }, 500)
  htmlJoke.classList.add('u-hidden');
};

const removeLoader = function () {
    if(loadingDelay){
        clearTimeout(loadingDelay)
        loadingDelay = null
    }
  htmlLoader.classList.add('u-hidden');
  htmlJoke.classList.remove('u-hidden');
};

async function getJoke() {
  try {
    showLoader();
    removeLoader();
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }

    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return "Sorry, I couldn't fetch a joke at the moment.";
  }
}

init();
