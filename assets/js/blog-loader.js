  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("latest-posts");
    const apiKey = "8a807ef9238c16445f22d4626c";
    const apiUrl = "https://galauit.com/blog/ghost/api/content/posts/";
    const limit = 3;

  const requestUrl = `${apiUrl}?key=${apiKey}&limit=${limit}&order=published_at%20desc&include=tags,authors`;

  fetch(requestUrl)
    .then((res) => res.json())
    .then((data) => {
      if (!data.posts) throw new Error("Invalid response");

      container.innerHTML = "";
      data.posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "col-md-4";

        const imageHtml = post.feature_image
          ? `<img src="${post.feature_image}" class="card-img-top brutal-card-img" alt="${post.title}">`
          : "";

        postCard.innerHTML = `
          <div class="brutal-blog-card">
            ${imageHtml}
            <div class="brutal-blog-content">
              <h3>${post.title}</h3>
              <p class="brutal-date">${new Date(post.published_at).toLocaleDateString()}</p>
              <a href="https://galauit.com/blog/${post.slug}" target="_blank" class="brutal-read-btn">Baca Selengkapnya</a>
            </div>
          </div>
        `;
        container.appendChild(postCard);
      });
    })
    .catch((err) => {
      container.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
          Gagal memuat artikel. Coba refresh atau cek koneksi internet.
        </div>
      `;
      console.error("API error:", err);
    });
});
