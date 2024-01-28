const jokeSetup = document.getElementById('jokeSetup');
const jokeDelivery = document.getElementById('jokeDelivery')
const generateBtn = document.querySelector('button')
const celbElement = document.querySelector('.confetti')

const countdown = ()=>{
  let sec = 9;
  generateBtn.innerText = '10s';
  const timer = setInterval(()=>{
    generateBtn.innerText = `${sec--}s`;
    if (sec == -1) {
      console.log(sec)
      clearTimeout(timer)
      generateBtn.innerText = 'Generate Again'
    }
  }, 1000);
  
}
generateBtn.addEventListener('click', () => {
  fetchJoke();
})
const celb = (val)=>{
  if (val == 2) {
    celbElement.style.display='flex'
    setTimeout(()=>{
      celbElement.style.display='none'
    },3000)
    generateBtn.disabled = true;
    countdown();
    setTimeout(()=>{
      generateBtn.disabled =  false;
    },10000)
  }
  else {
    celbElement.style.display='none'
  }
}
const jokeResult = (setup, delivery) => {
  jokeSetup.innerText = setup;
  jokeDelivery.innerText = delivery;

}


const fetchJoke = () => {
  fetch('https://v2.jokeapi.dev/joke/Any')
    .then(response => response.json())
    .then(data => {
      if (data.setup != undefined || data.delivery != undefined) {
        jokeResult(data.setup, data.delivery);
        celb(2);
      }
      else {
        jokeSetup.innerText = 'An error occurred!'
        jokeDelivery.innerText = ''
        generateBtn.innerText = 'Try Again'
        celb(1);
      }

    })
}