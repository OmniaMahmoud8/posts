let section2 = document.querySelector("#s1");
let section = document.querySelector("#s2");
let searchInput = document.querySelector("header input");

async function getPosts() {
  let response = await fetch("https://dummyjson.com/posts");
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
    <button id="tags">#${ele.name}</button>
    `;
  });
}

// search

searchInput.addEventListener("input", async (e) => {
  e.preventDefault();
  let response = await fetch(
    `https://dummyjson.com/posts/search?q=${e.target.value}`
  );
  let data = await response.json();
  let posts = data.posts;
  console.log(posts);
  section.innerHTML = "";
  posts.forEach((ele) => {
    section.innerHTML += `
    <div>
    <h2>${ele.title}</h2>
    <p>${ele.body}</p>
    <button>#${ele.tags[0]}</button>
    <button>#${ele.tags[1]}</button>
    <button>#${ele.tags[2]}</button>
    <hr>
    <p><span><i class="fa-solid fa-eye"></i>${ele.views}</span> <span><i class="fa-solid fa-heart"></i>${ele.reactions.likes}</span> <span><i class="fa-solid fa-thumbs-down"></i>${ele.reactions.dislikes}</span></p>
    </div>
    `;
  });
});
getTags();
getPosts();
