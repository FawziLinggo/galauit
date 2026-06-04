document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("latest-posts");
  if (!container) return;

  const apiKey = "8a807ef9238c16445f22d4626c";
  const apiUrl = "https://galauit.com/blog/ghost/api/content/posts/";
  const requestUrl = `${apiUrl}?key=${apiKey}&limit=3&order=published_at%20desc&include=tags,authors`;

  const formatDate = (value) => {
    if (!value) return "Tanggal belum tersedia";

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  };

  fetch(requestUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Blog API tidak merespons");
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.posts)) throw new Error("Format artikel tidak valid");

      container.innerHTML = "";

      data.posts.forEach((post) => {
        const article = document.createElement("article");
        article.className = "blog-card";

        if (post.feature_image) {
          const image = document.createElement("img");
          image.src = post.feature_image;
          image.alt = post.title || "Artikel Galauit";
          image.loading = "lazy";
          article.appendChild(image);
        }

        const body = document.createElement("div");
        body.className = "blog-card__body";

        const date = document.createElement("p");
        date.className = "blog-card__date";
        date.textContent = formatDate(post.published_at);

        const title = document.createElement("h3");
        title.textContent = post.title || "Artikel Galauit";

        const excerpt = document.createElement("p");
        excerpt.textContent = post.excerpt || "Baca catatan terbaru dari Galauit.";

        const link = document.createElement("a");
        link.className = "blog-card__link";
        link.href = post.url || `https://galauit.com/blog/${post.slug || ""}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Baca Selengkapnya";

        body.append(date, title, excerpt, link);
        article.appendChild(body);
        container.appendChild(article);
      });
    })
    .catch((error) => {
      container.innerHTML = `
        <div class="blog-error">
          Gagal memuat artikel terbaru. Coba refresh halaman atau cek koneksi internet.
        </div>
      `;
      console.error("Blog API error:", error);
    });
});
