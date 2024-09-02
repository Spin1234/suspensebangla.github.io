const api="AIzaSyDACBqZsfscBxkBVmRdEv39ylmScAudtSY";


let nextPageToken = "";
let nextPageToken1;

// window.addEventListener('load', () => {
//     nextPageToken = "";
//     fetchplaylist(nextPageToken);
//   });


window.addEventListener('load', ()=> fetchplaylist(""));

async function fetchplaylist(nextPageToken){

    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&pageToken=${nextPageToken}&playlistId=PLq71IJk8mCV4-DqsZ7W6zRS7uzKOmmT8j&key=${api}`;
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);

    if (!data || !data.items || data.items.length === 0) {
        // No more data available, hide the "Load More" button
        document.getElementById("loadmore").style.display = "none";
        return;
      }

    const cardsCont = document.getElementById("cards-cont");
    const template = document.getElementById("tem");


    let results = data.items;

    results.forEach((item) => {

        if (item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.medium && item.snippet.thumbnails.medium.url) {
            
        const img = item.snippet.thumbnails.medium.url;
        
        const cardClone = template.content.cloneNode(true);

        const backImg = cardClone.getElementById("im");
        backImg.style.backgroundImage = `url(${img})`;

        const title = cardClone.getElementById("tle");
        title.innerHTML = item.snippet.title;

        const btn = cardClone.getElementById("link");
        btn.href = "play.html?id="+item.snippet.resourceId.videoId+"&img="+item.snippet.thumbnails.medium.url;

        cardsCont.appendChild(cardClone);
        }

    });

    nextPageToken1=data.nextPageToken;
    return data.nextPageToken;
}



document.getElementById("loadmore").addEventListener('click', async ()=>{

    nextPageToken = await fetchplaylist(nextPageToken1);
})



// search functionality

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("Search");
let keyword = "";

async function searchKey(nextPageToken){

    

    keyword = searchBox.value;
    // const url1 =  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCmzj6hXrPZ_AwIZ8lgo-HuQ&maxResults=25&pageToken=${nextPageToken}&q=${keyword}&key=${api}`;
    const url1 =  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&pageToken=${nextPageToken}&q=${keyword}&safeSearch=strict&key=${api}`;
    const response = await fetch(url1);
    const data = await response.json();

    if (data.pageInfo.totalResults === 0) {
        window.alert("no results found!")
        return;
    }

    document.getElementById("tag").innerHTML = "Search reaults for: "+keyword;

    const results1 = data.items;

    results1.forEach(item1 => {

        const cardsCont = document.getElementById("cards-cont");
        const template = document.getElementById("tem");


        if (item1.snippet && item1.snippet.thumbnails && item1.snippet.thumbnails.medium && item1.snippet.thumbnails.medium.url && item1.id.videoId) {
            
            const img = item1.snippet.thumbnails.medium.url;
            
            const cardClone = template.content.cloneNode(true);
    
            const backImg = cardClone.getElementById("im");
            backImg.style.backgroundImage = `url(${img})`;
    
            const title = cardClone.getElementById("tle");
            title.innerHTML = item1.snippet.title;
    
            const btn = cardClone.getElementById("link");
            btn.href = "play.html?id="+item1.id.videoId+"&img="+item1.snippet.thumbnails.medium.url;
    
            cardsCont.appendChild(cardClone);
            }
    });
    

    nextPageToken1=data.nextPageToken;
    return data.nextPageToken;

}

searchForm.addEventListener("submit", (e)=> {
    
    e.preventDefault();
    const cardsCont = document.getElementById("cards-cont");
    document.getElementById("loadmore-search").style.display = "block";
    document.getElementById("loadmore").style.display = "none";
    cardsCont.innerHTML = "";
    nextPageToken = "";
    searchKey(nextPageToken);
})

document.getElementById("loadmore-search").addEventListener("click", async(e)=>{
    e.preventDefault();
    nextPageToken = await searchKey(nextPageToken1);
})

