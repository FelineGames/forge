function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function loadMarked() {
  if (typeof marked !== 'undefined') return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const containers = document.querySelectorAll('.github-changelog');
  if (containers.length === 0) return;

  try {
    await loadMarked();
  } catch (e) {
    console.warn('Marked.js failed to load; falling back to plain text.');
  }

  await Promise.all(
    Array.from(containers).map(async (container) => {
      const owner = container.dataset.owner;
      const repo = container.dataset.repo;
      const count = Math.max(1, parseInt(container.dataset.count || '1', 10));

      if (!owner || !repo) return;

      const endpoint =
        count === 1
          ? `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/latest`
          : `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases?per_page=${count}`;

      try {
        const response = await fetch(endpoint, {
          headers: { Accept: 'application/vnd.github+json' }
        });

        if (response.status === 404) {
          container.innerHTML = '<p>No releases published yet.</p>';
          return;
        }

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        const releases = Array.isArray(data) ? data : [data];

        if (releases.length === 0) {
          container.innerHTML = '<p>No releases published yet.</p>';
          return;
        }

        container.innerHTML = releases
          .map((release) => {
            const title = escapeHtml(release.name || release.tag_name || 'Release');
            const date = release.published_at
              ? escapeHtml(new Date(release.published_at).toLocaleDateString())
              : '';
            const rawBody = release.body || '';
            const bodyHtml =
              typeof marked !== 'undefined'
                ? marked.parse(rawBody)
                : `<p>${escapeHtml(rawBody).replace(/\n/g, '<br>')}</p>`;
            const releaseUrl = release.html_url ? escapeHtml(release.html_url) : '';

            return `
              <div class="gh-release-item">
                <h4>${title}${date ? ` <small style="opacity: 0.65; font-weight: normal;">(${date})</small>` : ''}</h4>
                ${bodyHtml}
                ${releaseUrl ? `<p><a href="${releaseUrl}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>` : ''}
              </div>
            `;
          })
          .join('<hr style="border: 0; border-top: 1px solid #eaeaea; margin: 12px 0;">');
      } catch (error) {
        container.innerHTML = '<p>Unable to load updates.</p>';
        console.error(`GitHub Changelog Error (${owner}/${repo}):`, error);
      }
    })
  );
});
