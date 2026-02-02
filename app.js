let section2 = document.querySelector("#s1");
let section = document.querySelector("#s2");
let searchInput = document.querySelector("header input");

async function getPosts(url = "https://dummyjson.com/posts") {
  section.innerHTML = "";
  let response = await fetch(url);
  let data = await response.json();
  let posts = data.posts;
  console.log(posts);
  posts.forEach((ele) => {
    section.innerHTML += `
    <div class="post-card">
    <h2>${ele.title}</h2>
    <p>${ele.body}</p>
    <button>#${ele.tags[0]}</button>
    <button>#${ele.tags[1]}</button>
    <button>#${ele.tags[2]}</button>
    <hr>
    <p>
    <span><i class="fa-solid fa-eye" id="eye"></i>${ele.views}</span>
    <span><i class="fa-solid fa-heart" id="heart"></i>${ele.reactions.likes}</span>
    <span><i class="fa-solid fa-thumbs-down" id="thumbs-down"></i>${ele.reactions.dislikes}</span>
    </p>
    </div>
    `;
  });
}

async function getTags() {
  let response = await fetch("https://dummyjson.com/posts/tags");
  let tags = await response.json();
  console.log(tags);
  tags.forEach((ele) => {
    section2.innerHTML += `
    <button class="tag-btn">#${ele.name}</button>
    `;
  });
  attachTagListeners();
}
function attachTagListeners() {
  document.querySelectorAll(".tag-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      let tag = btn.textContent.replace("#", "");
      let url = `https://dummyjson.com/posts/tag/${tag}`;
      await getPosts(url);
    });
  });
}

// search

searchInput.addEventListener("input", async (e) => {
  e.preventDefault();
  let response = await fetch(
    `https://dummyjson.com/posts/search?q=${e.target.value}`,
  );
  let data = await response.json();
  let posts = data.posts;
  console.log(posts);
  section.innerHTML = "";
  posts.forEach((ele) => {
    section.innerHTML += `
  <div class="post-card">
    <h2>${ele.title}</h2>
    <p>${ele.body}</p>
    <button>#${ele.tags[0]}</button>
    <button>#${ele.tags[1]}</button>
    <button>#${ele.tags[2]}</button>
    <hr>
    <p>
      <span><i class="fa-solid fa-eye" id="eye"></i>${ele.views}</span>
      <span><i class="fa-solid fa-heart" id="heart"></i>${ele.reactions.likes}</span>
      <span><i class="fa-solid fa-thumbs-down" id="thumbs-down"></i>${ele.reactions.dislikes}</span>
    </p>
  </div>
`;
  });
});
getTags();
getPosts();
