const api="AIzaSyDvcVMjXpVnR55euaLVvfwl8m6sJXVvvmA";


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



