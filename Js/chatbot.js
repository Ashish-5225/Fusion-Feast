/* =========================
   ChatGPT Chatbot with Avatars
========================= */

const chatbotHeader = document.getElementById('chatbot-header');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

// Toggle chat collapse
chatbotHeader.addEventListener('click', () => {
  chatbotBody.parentElement.classList.toggle('collapsed');
});

// Send message
async function sendMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  // Display user message with avatar
  displayMessage(message, 'user', 'https://i.ibb.co/9HcBv1B/user-avatar.png');
  chatbotInput.value = '';

  // Display "typing..." for bot with avatar
  const typingMessage = displayMessage('Typing...', 'bot', 'https://i.ibb.co/WsH7rYx/bot-avatar.png');

  try {
    // Call OpenAI API (use backend in production for security)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY' // Replace with your key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 200
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content.trim();

    // Replace typing message with bot reply
    typingMessage.querySelector('.text').textContent = reply;
  } catch (error) {
    typingMessage.querySelector('.text').textContent = '⚠️ Error: Unable to fetch response';
    console.error(error);
  }

  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Display message function with avatar
function displayMessage(text, sender, avatarURL) {
  const msg = document.createElement('div');
  msg.classList.add('chatbot-message', sender);

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.style.backgroundImage = `url(${avatarURL})`;

  const textDiv = document.createElement('div');
  textDiv.classList.add('text');
  textDiv.textContent = text;

  msg.appendChild(avatar);
  msg.appendChild(textDiv);

  chatbotBody.appendChild(msg);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
  return msg;
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});