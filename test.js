const api="AIzaSyDvcVMjXpVnR55euaLVvfwl8m6sJXVvvmA";

// async function vid(){
// const url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=AOGX29Rv3b0&key=${api}`;
// const response = await fetch(url);
// const data = await response.json();
// // const results = data.items[0].id;
// const link = "https://www.youtube.com/embed/"+ data.items[0].id;
// const vidlink = document.createElement("iframe");
// vidlink.src=link;
// vidlink.width = 560;
// vidlink.height = 315;
// vidlink.allowFullscreen = true;
// const vidcont = document.getElementById("vid");
// vidcont.appendChild(vidlink);
// // console.log(link);
// }
// vid();


let nextPageToken = "";

async function playlistItems(nextPageToken){

    document.getElementById("text").innerHTML="";
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&pageToken=${nextPageToken}&playlistId=PLq71IJk8mCV4-DqsZ7W6zRS7uzKOmmT8j&key=${api}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.prevPageToken, data.nextPageToken)
    document.getElementById("text").innerHTML="Next Page Token: "+data.nextPageToken
    let results = data.items;
    results.forEach( item => {

        // const para = document.createElement("p");
        const link = document.createElement("a");
        const br = document.createElement("br");
        link.href = "https://www.youtube.com/embed/"+item.snippet.resourceId.videoId;
        link.innerText = item.snippet.title;
        document.getElementById("title").appendChild(link);
        document.getElementById("title").appendChild(br);

        console.log(item.snippet.title);
        console.log(item.snippet.resourceId.videoId);
    });
    
    return data.nextPageToken;
}

document.getElementById("loadmore").addEventListener('click', async ()=>{
    nextPageToken = await playlistItems(nextPageToken);
})


// GET https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=PLq71IJk8mCV4-DqsZ7W6zRS7uzKOmmT8j&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
