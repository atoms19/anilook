

function elem(qry){
  return document.querySelector(qry)
}




function openMenu(){
        elem(".sidenav").classList.toggle("active")
    elem(".nav-menu").classList.toggle("active")
  
    }

/*fetch('https://animechan.xyz/api/random')
    .then(response => response.json())
    .then(quote => console.log(quote))*/
    //https://api.consumet.org/anime/
    
const url = "https://api.consumet.org/anime/gogoanime/"

function createAnimeCard(anime, location){
  acard=document.createElement('div')
  acard.classList.add('card')
  acard.classList.add('anime-card')
  acardbody=document.createElement('div')
  aimg=document.createElement('img')
  aimg.setAttribute('src',anime.image)
  acardbody.classList.add('card-content')
  atitle=document.createElement('h3')
  atitle.classList.add('font-2')
  atitle.innerText=anime.title
  
  ageners=document.createElement('div')
  if(anime.genres){
  anime.genres.forEach((gener)=>{
    tag=document.createElement('span')
    tag.innerText=gener
    tag.classList.add('tag')
    tag.classList.add('anime-tag')
    ageners.appendChild(tag)
  })
}
  acardbody.appendChild(atitle)
  acardbody.appendChild(ageners)
  
  
  acard.appendChild(aimg)
  acard.appendChild(acardbody)
  
  elem(location).appendChild(acard)
  acard.addEventListener('click',()=>{
    elem('#loader').classList.remove('hide')
    loadAnimeDetails(anime.id)
     })
}
function loadAnimeDetails(id){
  fetch(url+'info/'+id).then((r)=>{
    return r.json()
  }).then(data=>{
    elem('#results').classList.add('hide')
    elem('#details').classList.remove('hide')
    elem('#details-img').setAttribute('src',data.image)
    elem('#details-title').innerText=data.title
    elem('#details-info').innerText=data.description
    elem('#details-episodes').innerText='no of episodes: '+data.totalEpisodes
    elem('#details-sub').innerText='audio: '+data.subOrDub
    elem('#details-status').innerText='staus: '+data.status
    elem('#details-type').innerText='show type: '+data.type
    elem('#details-othername').innerText='also known as : '+data.otherName
    
    //loading episodes 
    qualityOption=0
    
    elem('#watch-episodes').innerHTML=''
    data.episodes.forEach((episode)=>{
    ep=document.createElement('button')
    ep.classList.add('btn')
    ep.classList.add('violet')
    ep.classList.add('opacity')
    ep.innerText=episode.number
    ep.addEventListener('click',()=>{
      watchAnime(episode.id,qualityOption)
    })
    elem('#watch-episodes').appendChild(ep)
    })
    
  elem('#watch-btn').addEventListener('click',()=>{
    watchAnime(data.episodes[0].id)
  
  })
    elem('#loader').classList.add('hide')

  })
}
function navigateToResults(){
   elem('#results').classList.remove('hide')
    elem('#details').classList.add('hide')
}
function navigateToDetails(){
   elem('#details').classList.remove('hide')
    elem('#watch').classList.add('hide')
    elem('#watch-screen').pause()
}



function watchAnime(id,srcno=0){
  elem('#loader').classList.remove('hide')
elem('#details').classList.add('hide')
    elem('#watch').classList.remove('hide')
 elem('#watch-title').innerText=id
  fetch(url+'watch/'+id).then(r=>{
    return r.json()
  }).then((data)=>{
    
    elem('#watch-screen').setAttribute('src',data.sources[srcno].url)
    elem("#watch-screen").addEventListener('loadstart',()=>{
      elem('#loader').classList.add('hide')
    })
    elem('#watch-quality').innerHTML=''
    elem('#watch-qualityName').innerText='current quality:'+data.sources[srcno].quality
    data.sources.forEach((source,index)=>{
      qualityBtn=document.createElement('button')
      qualityBtn.classList.add('btn')
      qualityBtn.classList.add('qbtn')
      qualityBtn.innerText=source.quality
      elem('#watch-quality').appendChild(qualityBtn)
      
      qualityBtn.addEventListener('click',()=>{
        watchAnime(id,index)
        qualityOption=index
        
      })
      
      
    })
  })
    
}
elem('#search-btn').addEventListener('click',()=>{
  searchval=elem('#search-inp').value
  if(searchval!=''){
    searchpgcount=2
    searchAnime(searchval)
    elem('#search-inp').value=''
  }
})
searchpgcount=2
function searchAnime(aname,pg=1){
elem('#results-container').innerHTML=`<button class="btn violet" onclick="goHome()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg></button>
<h2 class='font-2' >results: ${aname}</h2>`
fetch(url+aname+'?page='+pg).then((r)=>{
  return r.json()
}).then((data)=>{
  data.results.forEach((anime)=>{
    createAnimeCard(anime,'#results-container')
  
    
  })
    if(data.hasNextPage){
    nextdiv=document.createElement('div')
    nextdiv.classList.add('center')
    nextBtn=document.createElement('button')
    nextBtn.classList.add('btn')
    nextBtn.classList.add('violet')
   nextdiv.appendChild(nextBtn)
    nextBtn.innerText='next'
    elem('#results-container').appendChild(nextdiv)
    nextBtn.addEventListener('click',()=>{
      searchAnime(aname,searchpgcount)
      searchpgcount++
      nextBtn.remove()
    })
  }
})
}


pgCount=2
function loadHome(pageno=1){
  fetch(url+'top-airing?page='+pageno).then((r)=>{
  return r.json()
}).then((data)=>{
  data.results.forEach((anime)=>{
    createAnimeCard(anime,'#home-onfire',)
  })
  if(data.hasNextPage){
    nextdiv=document.createElement('div')
    nextdiv.classList.add('center')
    nextBtn=document.createElement('button')
    nextBtn.classList.add('btn')
    nextBtn.classList.add('violet')
   nextdiv.appendChild(nextBtn)
    nextBtn.innerText='load more'
    elem('#home-onfire').appendChild(nextdiv)
    nextBtn.addEventListener('click',()=>{
      loadHome(pgCount)
      pgCount++
      nextBtn.remove()
    })
  }
})
}
function goHome(){
elem('#results-container').innerHTML=`        <h2 class="font-2">POPULAR</h2>
     <div  id="home-onfire">`
loadHome()
}
goHome()

function tgdarkmode(){
 elem('body').classList.toggle('darkmode')
}
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    tgdarkmode()
}
