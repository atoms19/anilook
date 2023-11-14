
//utilities
function elem(qry){
  return document.querySelector(qry)
}

//menu function
function openMenu(){
        elem(".sidenav").classList.toggle("active")
    elem(".nav-menu").classList.toggle("active")
  
    }

/*some random api

fetch('https://animechan.xyz/api/random')
    .then(response => response.json())
    .then(quote => console.log(quote))*/
    //https://api.consumet.org/anime/

//anime provider
const url = "https://api.consumet.org/anime/gogoanime/"


//to create anime card
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
  
  //load anime details on click
  acard.addEventListener('click',()=>{
    elem('#loader').classList.remove('hide') //loading start
    loadAnimeDetails(anime.id,'search')
    elem('#search-form').classList.add('hide')
     })
}
currentEp=0
//details about anime
function loadAnimeDetails(id,from='home'){
  fetch(url+'info/'+id).then((r)=>{
    return r.json()
  }).then(data=>{
    //hiding results screen
    elem('#results').classList.add('hide')
    elem('#details').classList.remove('hide')
    
    //setting details back button
    elem('#details-back').addEventListener('click',()=>{
      elem('#details').classList.add('hide')
      if(from=='home'){
        
        elem('#home').classList.remove('hide')
        elem('#search-form').classList.remove('hide')
      }else if(from=='search'){
        elem('#results').classList.remove('hide')
      }
    })
    
    
   //loading anime details into elements 
    elem('#details-img').setAttribute('src',data.image)
    elem('#details-title').innerText=data.title
    elem('#details-info').innerText=data.description
    elem('#details-episodes').innerText='no of episodes: '+data.totalEpisodes
    elem('#details-sub').innerText='audio: '+data.subOrDub
    elem('#details-status').innerText='staus: '+data.status
    elem('#details-type').innerText='show type: '+data.type
    elem('#details-genre').innerText='genres:'+data.genres
    
    elem('#details-othername').innerText='also known as : '+data.otherName
    
    
    qualityOption=0 //default quality 360p
    
    //clearing episodes if any from previous call to be removed 
    elem('#watch-episodes').innerHTML=''
    
    //loading episodes as buttons
    data.episodes.forEach((episode,index)=>{
    ep=document.createElement('button')
    ep.classList.add('btn')
    ep.classList.add('violet')
    ep.classList.add('opacity')
    ep.innerText=episode.number
    ep.addEventListener('click',()=>{
      watchAnime(episode.id,qualityOption)
      currentEp=index //changing current episode 
    })
    
    elem('#watch-episodes').appendChild(ep)
    })
  //watch button loads the first episode by default 
  elem('#watch-btn').addEventListener('click',()=>{
    watchAnime(data.episodes[0].id)
  currentEp=0
  })
    elem('#loader').classList.add('hide') //loading finished

  })
}
//function to load next episode uses currentEp variable to keep track 
 function nextEp(){
   try{
   elem('#watch-episodes').children[currentEp+1].click()
   }catch{
     console.log('last episode reached')
   }
 }

//going back to results page
function navigateToResults(){
   elem('#results').classList.remove('hide')
    elem('#details').classList.add('hide')
}
//going back to details page
function navigateToDetails(){
   elem('#details').classList.remove('hide')
    elem('#watch').classList.add('hide')
    elem('#watch-screen').pause() //pausing video if exited
}
function navigateToHome(){
  elem('#results').classList.add('hide')
  elem('#home').classList.remove('hide')
  elem("#search-form").classList.remove('hide')
}

//anime streaming links

function watchAnime(id,srcno=0){
  
  elem('#loader').classList.remove('hide')
elem('#details').classList.add('hide')
    elem('#watch').classList.remove('hide')
    
 elem('#watch-title').innerText=id
 
  fetch(url+'watch/'+id).then(r=>{
    return r.json()
  }).then((data)=>{
    
    elem('#watch-screen').setAttribute('src',data.sources[srcno].url)
    
    //removing loader when video starts
    elem("#watch-screen").addEventListener('loadstart',()=>{
      elem('#loader').classList.add('hide')
    })
    //clearing watch quality option and setting it to current quality 
    elem('#watch-quality').innerHTML=''
    elem('#watch-qualityName').innerText='current quality:'+data.sources[srcno].quality
    
    //loading quality options
    data.sources.forEach((source,index)=>{
      qualityBtn=document.createElement('button')
      qualityBtn.classList.add('btn')
      qualityBtn.classList.add('qbtn')
      qualityBtn.innerText=source.quality
      elem('#watch-quality').appendChild(qualityBtn)
      
      qualityBtn.addEventListener('click',()=>{
        //calling the function again with new src no
        watchAnime(id,index)
        qualityOption=index
        
      })
      
      
    })
  })
    
}

//search box functionality
elem('#search-btn').addEventListener('click',()=>{
  searchval=elem('#search-inp').value
  if(searchval!=''){
    searchpgcount=2
    searchAnime(searchval)
    elem('#search-inp').value=''
    elem('#home').classList.add('hide')
    elem('#results').classList.remove('hide')
  }
})


searchpgcount=2
//search function
function searchAnime(aname,pg=1){
  //shitty code-writing html from js for the bavk button and result title
elem('#results-container').innerHTML=`<button class="btn violet" onclick="navigateToHome()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg></button>
<h2 class='font-2' >results: ${aname}</h2>`

fetch(url+aname+'?page='+pg).then((r)=>{
  return r.json()
}).then((data)=>{
 
  data.results.forEach((anime)=>{
    createAnimeCard(anime,'#results-container')
   
   
  })
  if(data.results.length==0){
     elem('#results-container').innerHTML+='<h3 class="text-salmon font-2">no results found</h3>'
   }
  
  
  //next page button
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
function createAnimeTile(anime,location, position)
{
  tile=document.createElement('div')
  tile.classList.add('anime-tile')
  tile.classList.add('shadow')
  tile.classList.add('card')
  tile.setAttribute('pos', position)
  tile.style.background='url("'+anime.image+'")'
  elem(location).appendChild(tile)
  tile.addEventListener('click',()=>{
    elem('#loader').classList.remove('hide')
    loadAnimeDetails(anime.id)
    elem('#home').classList.add('hide')
    elem('#search-form').classList.add('hide')
    
  })
}


function loadHome(pageno=1){
  fetch(url+'top-airing?page='+pageno).then((r)=>{
  return r.json()
}).then((data)=>{
  data.results.forEach((anime,index)=>{
    createAnimeTile(anime,'#top-airing',index+1)
    //the code below is disgusting (its for the slides)
    
    swh=document.createElement('div')
    swh.classList.add('swiper-slide')
    sw=document.createElement('div')
    sw.classList.add('card')
    sw.classList.add('slide')
    sw.style.background='url("'+anime.image+'")'
    sc=document.createElement('div')
    sc.classList.add('slide-container')
    sd=document.createElement('div')
    sd.classList.add('tobot')
    
    h=document.createElement('h1')
    h.innerText=anime.title
    
    sb=document.createElement('button')
    sb.classList.add('btn')
    sb.classList.add('violet')
    sb.innerText='watch now'
    sb.addEventListener('click',()=>{
      elem('#loader').classList.remove('hide')
      loadAnimeDetails(anime.id)
       elem('#home').classList.add('hide')
    elem('#search-form').classList.add('hide')
      
    })
    sd.appendChild(h)
    sd.appendChild(sb)
    sc.appendChild(sd)
    sw.appendChild(sc)
    swh.appendChild(sw)
    elem('.swiper-wrapper').appendChild(swh)
    
  })

})
}

loadHome()

isDarkMode=false
function tgdarkmode(el){
  if(!isDarkMode){
 elem('body').classList.add('darkmode')
  isDarkMode=true
  if(el){
    el.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
</svg>`}
  }else{
 elem('body').classList.remove('darkmode')
  isDarkMode=false
  if(el){
  el.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
</svg>`
    
  }}
}

//automatically setting darkmode if system in darkmode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    tgdarkmode(elem("#darkmodet2"))
    elem('#darkmodet').innerHTML=elem('#darkmodet2').innerHTML
    
}

//slide show setup
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop:true,


  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
autoplay: {
    delay: 3000,
  },
  slidesPerGroup:1,
  slidesPerView:1
})
  
