function toggleChat() {
    const chat = document.getElementById('chat-popup');
    const isVisible = chat.style.display === 'block';
    chat.style.display = isVisible ? 'none' : 'block';
  }

  // Auto-close chat when clicking outside
  document.addEventListener('click', function (event) {
    const iframe = document.getElementById('chat-popup');
    const toggleBtn = document.getElementById('chat-toggle');
    if (
      iframe &&
      !iframe.contains(event.target) &&
      !toggleBtn.contains(event.target)
    ) {
      iframe.style.display = 'none';
    }
  });