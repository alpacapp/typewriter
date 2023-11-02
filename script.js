const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const $typewriter = document.querySelector('#_BLOCK_ .typewriter');
let content = {{ content | json }};
let speedFactor = 1 / {{ speedFactor | json }};

const doWrite = async (str, d=130)=>{
  for(let i=0;i<=str.length;i++) {
    $typewriter.innerText = str.substring(0, i);
    await delay(speedFactor * d);
  }
}
const doErase = async (str, d=130)=>{
  for(let i=str.length;i>=0;i--) {
    $typewriter.innerText = str.substring(0, i);
    await delay(speedFactor * d);
  }
}
{% if effect=="typewriter" %}
  await doWrite(content);
{% elsif effect=="typewriterLoop" %}
  while(true) {
    // Write
    await doWrite(content);
    await delay(speedFactor * 500 + 1000);
    // Erase
    await doErase(content);
    await delay(speedFactor * 500 + 500);
  }
{% else %}
    content = content.split("\n");
    while(true) {
      for(let line of content) {
        // Write
        await doWrite(line);
        await delay(speedFactor * 500 + 1000);
        // Erase
        await doErase(line);
        await delay(speedFactor * 500 + 500);
      }
    }
{% endif %}
