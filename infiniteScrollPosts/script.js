const postContainer = document.getElementById("post-container");
const loading = document.querySelector('.loader');
const filter = document.getElementById("filter");
let limit = 5;
let page = 1;


//Fetch posts from API
async function getPosts(){
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    
    
    return data;
}

//Show posts in DOM
async function showPosts(){
    const posts = await getPosts();

    posts.forEach(post => {
        const element = document.createElement('div');
        element.classList.add("post");
        element.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `;
        postContainer.appendChild(element);
    });
}

function showLoading(){
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
        
        setTimeout(() => {
            page++;
            showPosts();
        },300);

    }, 1000);
}

function filterPosts(e){
    const text = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    
    posts.forEach(post => {
        const title = post.querySelector(".post-title").innerText.toLowerCase();
        const body = post.querySelector(".post-body").innerText.toLowerCase();

        if (title.includes(text) || body.includes(text)){
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    });
}

//Event Listeners
window.addEventListener('scroll', () =>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight - 5){
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);

//Show initial posts
showPosts();



