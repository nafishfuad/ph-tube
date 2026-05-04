console.log("Script is connected");
function removeActiveClass () {
    const activeButtons = document.getElementsByClassName('active');
    for (let btn of activeButtons) {
        btn.classList.remove('active');
    }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        document.getElementById('btn-all').classList.add("active");
        displayVideos(data.videos)
    });
};

const loadCAtegoriesVideos = (id) => {
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

// {
//     "category_id": "1001",
//     "video_id": "aaag",
//     "thumbnail": "https://i.ibb.co/DRxB1Wm/sunris.jpg",
//     "title": "Sunrise Reverie",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/yQFJ42h/ava.jpg",
//             "profile_name": "Ava Johnson",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "16950"
//     },
//     "description": "'Sunrise Reverie' by Ava Johnson takes listeners on a serene journey through tranquil melodies and soft harmonies. With 1.1K views, this track is perfect for morning relaxation or an evening wind-down. Ava's heartfelt lyrics and soothing voice create a sense of peace, making it a go-to for fans seeking calm and inspiration in their musical choices."
// }

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
    return;
  }

  videos.forEach((video) => {
    console.log(video);

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
            <h2>Midnight Serenade</h2>
            <p class="text-sm text-gray-400 flex gap-1">
              ${video.authors[0].profile_name}
              <img
                class="w-5 h-5"
                src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png"
              />
            </p>
            <p class="text-sm text-gray-400">${video.others.views}</p>
          </div>
        </div>
      </div>
        `;
    videoContainer.append(videoCard);
  });
};

loadCategories();
