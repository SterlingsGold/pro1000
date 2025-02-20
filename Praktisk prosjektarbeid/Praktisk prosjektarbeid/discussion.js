// discussion.js

window.addEventListener('DOMContentLoaded', () => {
  // Start Lucide
  lucide.createIcons();

  const STORAGE_KEY = 'greenCodeDiscussions';

  // Tre eksempelemner + noen svar
  const defaultDiscussions = [
    {
      title: "Optimalisering av React",
      author: "Ola",
      content: "Hva er deres beste tips for å redusere CPU-bruk og unødvendige renders i React?",
      replies: [
        { author: "Kari", content: "Memoization og useCallback kan spare mye!" },
        { author: "Petter", content: "Code splitting og lazy loading av komponenter." }
      ]
    },
    {
      title: "Hvordan integrere CodeCarbon?",
      author: "Lise",
      content: "Erfaringer med CodeCarbon i Python-prosjekter, gjerne i Docker?",
      replies: [
        { author: "Anne", content: "Jeg syns det funket ganske greit, men usikker på nøyaktigheten." },
        { author: "Martin", content: "Fikk det til å kjøre i Docker ved å legge til pip-install i Dockerfile." },
        { author: "Per", content: "Greit verktøy, men husk å oppdatere avhengigheter ofte." }
      ]
    },
    {
      title: "Bærekraftig Webdesign",
      author: "Jonas",
      content: "Hvordan gjør vi nettstedet mest mulig klimavennlig? Leter etter konkrete forslag.",
      replies: [
        { author: "Greta", content: "Bruk WebP og responsive bilder. Minimer store JS-biblioteker." }
      ]
    }
  ];

  // Hent eksisterende data
  let discussions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  // Flett inn default-discussions om de ikke finnes (basert på tittel)
  defaultDiscussions.forEach(defTopic => {
    const exists = discussions.some(t => t.title === defTopic.title);
    if (!exists) {
      discussions.push(defTopic);
    }
  });

  // Lagre
  localStorage.setItem(STORAGE_KEY, JSON.stringify(discussions));

  // DOM-elementer
  const newTopicForm = document.getElementById('newTopicForm');
  const topicsContainer = document.getElementById('topicsContainer');

  function saveDiscussions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(discussions));
  }

  // Rendre diskusjoner
  function renderTopics() {
    topicsContainer.innerHTML = '';

    if (discussions.length === 0) {
      topicsContainer.innerHTML = `
        <p style="color: var(--text-gray);">Ingen diskusjoner enda.</p>
      `;
      return;
    }

    discussions.forEach((topic, topicIndex) => {
      const topicCard = document.createElement('div');
      topicCard.classList.add('card');
      topicCard.style.marginBottom = '2rem';

      topicCard.innerHTML = `
        <h3>${topic.title}</h3>
        <p style="margin-bottom:0.5rem;">Skrevet av <strong>${topic.author}</strong></p>
        <p style="margin-bottom:1rem;">${topic.content}</p>

        <!-- Slett diskusjon-knapp -->
        <button 
          class="tool-link delete-topic-btn"
          style="background-color:#d9534f; margin-bottom:1rem;"
        >
          Slett Diskusjon
        </button>

        <!-- Vis/skjul svar-knapp -->
        <button 
          class="tool-link toggle-replies-btn"
          style="margin-bottom:1rem; margin-left:1rem;"
        >
          Vis svar (${topic.replies.length})
        </button>

        <div class="replies-container" style="display:none; margin-top:1rem;">
          <div class="replies-list"></div>

          <form class="reply-form" style="margin-top:1.5rem;">
            <div class="form-group">
              <label>Skriv et svar</label>
              <input 
                type="text" 
                name="replyAuthor" 
                placeholder="Navn" 
                required
              />
            </div>
            <div class="form-group">
              <textarea 
                name="replyContent" 
                rows="2" 
                placeholder="Din kommentar..." 
                required
              ></textarea>
            </div>
            <button type="submit">Legg til svar</button>
          </form>
        </div>
      `;

      const deleteTopicBtn   = topicCard.querySelector('.delete-topic-btn');
      const toggleRepliesBtn = topicCard.querySelector('.toggle-replies-btn');
      const repliesContainer = topicCard.querySelector('.replies-container');
      const repliesList      = topicCard.querySelector('.replies-list');
      const replyForm        = topicCard.querySelector('.reply-form');

      // Slett diskusjon
      deleteTopicBtn.addEventListener('click', () => {
        const confirmed = confirm(`Vil du slette diskusjonen: "${topic.title}"?`);
        if (!confirmed) return;

        discussions.splice(topicIndex, 1);
        saveDiscussions();
        renderTopics();
      });

      // Vis/Skjul svar
      toggleRepliesBtn.addEventListener('click', () => {
        const hidden = repliesContainer.style.display === 'none';
        repliesContainer.style.display = hidden ? 'block' : 'none';
        toggleRepliesBtn.textContent = hidden
          ? `Skjul svar (${topic.replies.length})`
          : `Vis svar (${topic.replies.length})`;
      });

      // Rendre alle svar
      function renderReplies() {
        repliesList.innerHTML = '';

        if (!topic.replies || topic.replies.length === 0) {
          repliesList.innerHTML = `
            <p style="color: var(--text-gray);">Ingen svar enda.</p>
          `;
        } else {
          topic.replies.forEach((reply, replyIndex) => {
            const replyDiv = document.createElement('div');
            replyDiv.classList.add('faq-item');
            replyDiv.style.marginBottom = '1rem';

            replyDiv.innerHTML = `
              <strong>${reply.author}</strong><br/>
              <p style="margin-top:0.5rem; margin-bottom:0;">
                ${reply.content}
              </p>
              <button 
                class="tool-link delete-reply-btn"
                style="background-color:#d9534f; margin-top:0.5rem;"
              >
                Slett Svar
              </button>
            `;

            // Slett et enkelt svar
            const deleteReplyBtn = replyDiv.querySelector('.delete-reply-btn');
            deleteReplyBtn.addEventListener('click', () => {
              const confirmReply = confirm(`Vil du slette svaret fra "${reply.author}"?`);
              if (!confirmReply) return;

              topic.replies.splice(replyIndex, 1);
              saveDiscussions();
              toggleRepliesBtn.textContent = `Skjul svar (${topic.replies.length})`;
              renderReplies();
            });

            repliesList.appendChild(replyDiv);
          });
        }
      }

      renderReplies(); // Skjules i utgangspunktet, men “innholdet” lages

      // Nytt svar
      replyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(replyForm);
        const replyAuthor  = formData.get('replyAuthor').trim();
        const replyContent = formData.get('replyContent').trim();

        if (!replyAuthor || !replyContent) return;

        if (!topic.replies) topic.replies = [];

        topic.replies.push({ author: replyAuthor, content: replyContent });
        saveDiscussions();
        toggleRepliesBtn.textContent = `Skjul svar (${topic.replies.length})`;
        renderReplies();
        replyForm.reset();
      });

      topicsContainer.appendChild(topicCard);
    });
  }

  // Nytt emne
  if (newTopicForm) {
    newTopicForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleField   = document.getElementById('newTopicTitle');
      const authorField  = document.getElementById('newTopicAuthor');
      const contentField = document.getElementById('newTopicContent');

      const newTopic = {
        title:   titleField.value.trim(),
        author:  authorField.value.trim(),
        content: contentField.value.trim(),
        replies: []
      };

      discussions.push(newTopic);
      saveDiscussions();
      renderTopics();
      newTopicForm.reset();
    });
  }

  // Første rendering
  renderTopics();
});
