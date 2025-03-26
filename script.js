const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('message');

sendBtn.addEventListener('click', async function () {
  const message = messageInput.value;

  if (message.trim() !== "") {
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'sent');
    userMessageElement.textContent = message;
    chatBox.appendChild(userMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    const response = await fetch('https://livechat-five-pi.vercel.app/api/server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });

    const data = await response.json();

    const replyMessageElement = document.createElement('div');
    replyMessageElement.classList.add('message', 'received');
    replyMessageElement.textContent = data.reply;
    chatBox.appendChild(replyMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    messageInput.value = '';
  }
});
