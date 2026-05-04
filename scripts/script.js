console.log("Script is connected");
const showLoader =() =>{
    document.getElementById("loader").classList.remove('hidden');
    document.getElementById("videos-container").classList.add('hidden');
}
const hideLoader =() =>{
    document.getElementById("loader").classList.add('hidden');
    document.getElementById("videos-container").classList.remove('hidden');
}

function removeActiveClass () {
    const activeButtons = document.getElementsByClassName('active');
    for (let btn of activeButtons) {
        btn.classList.remove('active');
    }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
}

const loadVideos = (searchText = "") => {
    showLoader();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        document.getElementById('btn-all').classList.add("active");
        displayVideos(data.videos)
        
    });
};

const loadCAtegoriesVideos = (id) => {
    showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add('active')
        displayVideos(data.category)
    });
};

const loadVideoDetails = (video_id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayVideoDetails(data.video))

}

const displayVideoDetails = (video) =>{
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img class="w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-grey-600">${video.title}</h2>
    <p class="text-grey-600">${video.description}</p>
  </div>
</div>
    `
}

// {category_id: '1001', category: 'Music'}

function displayCategories(categories) {
  const categoriesContainer = document.getElementById("categories-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCAtegoriesVideos(${cat.category_id})" class="btn text-lg btn-sm rounded-md p-5 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
    categoriesContainer.append(categoryDiv);
  }
}


const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";
    
  if (videos.length === 0) {
    videoContainer.innerHTML = `
            <div
        class="py-20 col-span-full flex flex-col justify-center items-center text-center"
      >
        <img class="w-[120px]" src="assets/Icon.png" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
        `;
        hideLoader();
    return;
  }

  videos.forEach((video) => {

    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100">
        <figure class="relative">
          <img
            class="w-full h-[200px] object-cover rounded-lg"
            src="${video.thumbnail}"
          />
          <span
            class="absolute bottom-2 right-2 text-sm rounded-md text-white bg-black px-2"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class="flex gap-3 px-1 py-5">
          <div class="Profile">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2>${video.title}</h2>
            <p class="text-sm text-gray-400 flex gap-1">
              ${video.authors[0].profile_name}
              ${video.authors[0].verified === true ? `<img
                class="w-5 h-5"
                src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png"
              />` : ''}
              
            </p>
            <p class="text-sm text-gray-400">${video.others.views}</p>
          </div>
        </div>
        <button onclick="loadVideoDetails('${video.video_id}')"class="btn btn-block">Show Details</button>
      </div>
        `;
    videoContainer.append(videoCard);
    hideLoader();
  });
};


document.getElementById('search-input').addEventListener("keyup", (e)=>{
    const input= e.target.value;
    loadVideos(input);
})

loadCategories();