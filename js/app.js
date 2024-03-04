const allPostContainer = document.getElementById("all-post-container");
const allReadSmsContainer = document.getElementById("all-Read-Sms-Container");
const latesCardContainer = document.getElementById("latesCard");
const loadingB = document.getElementById("loading-spinner");
const loadingL = document.getElementById("loading-spinner-lates");
let readCounter = 0;

const loadAllPost = () => {
    isLoading(true)
    setTimeout(async() => {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
        const {posts} = await res.json();
        displayPost(posts)
        isLoading(false)
    }, 2000)
}

const displayPost = (posts) => {

    posts.forEach(post => {
        let isActiveDiv = null;
        if (post.isActive === true) {
            isActiveDiv = `
            <div class="w-4 border-2 border-white absolute rounded-full z-10 -top-2  inline -right-2 h-4 bg-green-500"></div>
            `
        }
        else {
            isActiveDiv = `
            <div class="w-4 border-2 border-white absolute rounded-full z-10 -top-2  inline -right-2 h-4 bg-[#FF3434]"></div>
            `
        }

        const div = document.createElement("div");
        div.classList.add("bg-[#F3F3F5]", "p-8", "rounded-2xl", "flex", "flex-col", "md:flex-row", "items-center", "md:items-start", "gap-5", "mb-5", "card-content");
        div.innerHTML = `
            <div class="avatar relative">
                ${isActiveDiv}
                <div class="w-16 h-16 rounded-xl">
                    <img src="${post?.image}" />
                </div>
            </div>

            <div class="flex-1">
                <div class="text-[#12132DCC] text-sm font-medium font-inter flex">
                    <p class="mr-5"># ${post?.category}</p>
                    <p>Author : ${post?.author?.name}</p>
                </div>
                <h3 class="mt-2 mb-3 text-[#12132D] font-extrabold text-xl">${post?.title}</h3>
                <p class="text-[#12132D99] text-base border-b pb-4 border-[#12132D40] border-dashed font-inter">${post?.description}</p>
                <div class="flex justify-between mt-4">
                    <div class="flex flex-wrap gap-5 items-center text-[#12132D99] text-base font-inter">
                        <div class="flex items-center gap-3">
                            <img src="./images/comment.png" alt="">
                            <p>${post?.comment_count}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <img src="./images/eye.png" alt="">
                            <p>${post?.view_count}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <img src="./images/clock.png" alt="">
                            <p>${post?.posted_time} min</p>
                        </div>
                    </div>
                  
                    <button class="scale-[1.5] md:scale-[1]" onclick = "addReadCard('${post.title.replace(/'/g,'@')}','${post.view_count}')"><img src="./images/gmail.png" alt="">   </button>
                </div>
            </div>
        `
        allPostContainer.appendChild(div);
    });
    document.getElementById("input-cate").value = "";
}

// add read mark card   
const addReadCard = (title, viewCount) => {
    console.log(title.replace(/@/g,"'"), viewCount)
    readCounter++;
    document.getElementById("counter").innerText = readCounter;
    const divInfo = document.createElement("div");
    divInfo.className = "flex justify-between p-4 bg-white rounded-2xl";
    divInfo.innerHTML = `
        <h3 class="w-2/3 font-bold text-base text-black leading-normal">${title.replace(/@/g,"'")}</h3>
        <div class="flex items-center font-inter gap-2 text-[#12132D99] text-base">
            <img src="./images/eye.png" alt="">
            <p>${viewCount}</p>
        </div>
    `
    allReadSmsContainer.appendChild(divInfo)
    document.querySelectorAll(".card-content").forEach(card => {
        card.classList.remove("bg-[#797DFC1A]", "border", "border-[#797DFC]")
        card.addEventListener("click", (e) => {
            card.classList.add("bg-[#797DFC1A]", "border", "border-[#797DFC]")
        })
    })

}


// load latest data 
const loadLatesData = async () => {
    isLoadingLates(true)
    setTimeout(async() => {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
        const data = await res.json();
        displayLatesData(data)
        isLoadingLates(false)
    }, 2000)

}

// display latest data 
const displayLatesData = (latests) => {
    latests.forEach(post => {
        const lateDiv = document.createElement("div");
        lateDiv.className = "rounded-2xl border p-5 border-[#12132D26] mb-5";
        lateDiv.innerHTML = `
            <figure><img class="w-full overflow-hidden rounded-2xl" src="${post?.cover_image}" alt=""></figure>
            <div class="flex items-center gap-3 mt-6 mb-4">
                <div>
                    <img src="./images/calender.png" alt="">
                </div>
                <p class="text-[#12132D99] font-inter text-base">${post?.author?.posted_date || "No Publish Date"}</p>
            </div>
            <h1 class="text-[#12132D] font-extrabold text-lg">${post?.title}</h1>
            <p class="text-[#12132D99] font-normal pt-2 font-inter text-base">${post?.description}</p>
            <div class="flex gap-3 items-center mt-4">
                <div><img class="w-[40px] h-[40px] rounded-full" src="${post?.profile_image}" alt=""></div>
                <div class="text-[#12132D]">
                    <h5 class="font-bold text-base">${post?.author?.name}</h5>
                    <h5 class="text-sm font-normal">${post?.author?.designation || "Unknown"}</h5>
                </div>
            </div>
        `
        latesCardContainer.appendChild(lateDiv)
    })
}

// load data  search by category
const loadCategoryData = (categoryName) => {
    isLoading(true)
    setTimeout(async() => {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
        const {posts} = await res.json();
        displayPost(posts)
        isLoading(false)
    }, 2000)

}

const searchCate = () => {
    const value = document.getElementById("input-cate").value.toLowerCase();
    document.getElementById("all-post-container").innerHTML = "";
    loadCategoryData(value)
}

const isLoading = (value) => {
    if (value === true) {
        loadingB.classList.remove("hidden")
    }
    else {
        loadingB.classList.add("hidden")
    }
}
const isLoadingLates = (value) => {
    if (value === true) {
        loadingL.classList.remove("hidden")
    }
    else {
        loadingL.classList.add("hidden")
    }
}


loadLatesData()
loadAllPost()