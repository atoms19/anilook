//utilities

function elem(qry){
  return document.querySelector(qry)
}

if(localStorage.alerted!='1'){
  
  localStorage.alerted=1

}

currpage=elem('.intro')
//routing functions
function rhome(){
  currpage.classList.add('hide')
  elem('#loader').classList.add('hide')
  elem('#details').classList.add('hide')
  loadSaves()
  elem('#search-form').classList.remove('hide')
  elem('.app').classList.remove('hide')
  elem('#home').classList.remove('hide')
  currpage=elem('#home')
}
function rerror(){
  
  currpage.classList.add('hide')
  elem('#loader').classList.add('hide')
  elem('#error').classList.remove('hide')
  currpage=elem('#error')
}

function rinfo(){
  
 elem('#home').classList.add('hide')
  elem('.app').classList.remove('hide')

  
  currpage.classList.add('hide')
  elem('#search-form').classList.add('hide')
  elem('#details').classList.remove('hide')
  id=new URLSearchParams(location.search).get('id');
  background=new URLSearchParams(location.search).get('background')
  source=new URLSearchParams(location.search).get('source')
 
  elem('#loader').classList.remove('hide')
  if(source!=undefined){
  loadAnimeDetails(id,background,source)
  }else{
loadAnimeDetails(id,background)
  }
  currpage=elem('#details')
  
}
function rsearch(gen=false) {
   elem('.app').classList.remove('hide')
elem('#details').classList.add('hide')
  elem('#loader').classList.add('hide')

    elem('#search-form').classList.remove('hide')
  currpage.classList.add('hide')
    elem('#results').classList.remove('hide')
    q=new URLSearchParams(location.search).get('q');
    pg=new URLSearchParams(location.search).get('pg');
    searchAnime(q,pg,gen)
    currpage=elem('#results')
}
function rwatch(){
currpage.classList.add('hide')
elem('#search-form').classList.add('hide')
    elem('#watch').classList.remove('hide')
    ep=new URLSearchParams(location.search).get('ep');
    watchAnime(ep)
    skipped=false
    elem("#watch-screen").onplay=()=>{
    if(!skipped){
    skip=new URLSearchParams(location.search).get('skip')||0

    elem('#watch-screen').currentTime=skip
    skipped=true
    }

    }
    currpage=elem('#watch')

}
function rintro() {
  currpage.classList.add('hide')
  elem('.app').classList.add('hide')
  elem('.intro').classList.remove('hide')
  currpage=elem('.intro')
}
function rnot(){
  currpage.classList.add('hide')
  elem('#notfound').classList.remove('hide')
  currpage=elem('#notfound')
}





function routeTo(str,callback=()=>{}){

  const newUrl = str;

if(str!=='/error'){
  history.pushState(null,"", newUrl);
  callback()
  routeHandler()
}else{
  history.replaceState(null, '', '/error');
  callback()
  routeHandler()
}

}



function routeHandler(){
  route=window.location.pathname
  if(currpage==elem('#watch')){
    elem('#watch-screen').pause()
  }
  if(route=='/'|| route=='/index.html'){
    rintro()
  }else if(route=='/home'){
    rhome()

  }else if(route=='/info'){
    rinfo()
  }else if(route=='/search'){
    rsearch()
  }else if(route=='/genre'){
    rsearch(1)
  }else if(route=='/watch'){
    rwatch()
  }else if(route=='/error'){
    rerror()
  }else{
    rnot()
  }
//  alert(window.location.pathname)
}

addEventListener('popstate',routeHandler)
addEventListener('load',routeHandler)



//menu function
function openMenu(){
        elem(".sidenav").classList.toggle("active")
    elem(".nav-menu").classList.toggle("active")

    }

/*s RIP wifu viewer you'll be remembered 🥀💐

fetch('https://animechan.xyz/api/random')
    .then(response => response.json())
    .then(quote => console.log(quote))*/
    //https://api.consumet.org/anime/

//anime providers 


let burl='https://anigojoapi.vercel.app/anime/gogoanime/'
let murl= "https://anigojoapi.vercel.app/meta/anilist/"

let old = new URLSearchParams(location.search).get('old');

if(old){
  url=burl
}else{
  url=murl
}

if(url==burl){
 elem('#genres').innerHTML=`  <div class="genre-tile shadow rose rounded" onclick="loadGenre('romance')">romance</div>
    <div class="genre-tile shadow steel rounded" onclick="loadGenre('action')">action</div>
         <div class="genre-tile shadow salmon rounded" onclick="loadGenre('shounen')">shounen<small>full action</small></div>
 <div class="genre-tile shadow blue rounded" onclick="loadGenre('fantasy')">fantasy</div>
      <div class="genre-tile shadow amber rounded" onclick="loadGenre('slice-of-life')">wholesome</div>
  <div class="genre-tile shadow apple rounded" onclick="loadGenre('ecchi')">ecchi<small><br>sus cam angles</small></div>
   <div class="genre-tile shadow pink rounded" onclick="loadGenre('shoujo')">shoujo
   <small>lovey dovey bfs</small></div>
    <div class="genre-tile shadow purple rounded" onclick="loadGenre('harem')">harem<br><small>lots of girls</small></div>

     <div class="genre-tile shadow indigo rounded" onclick="loadGenre('sports')">sports</div>
          <div class="genre-tile shadow blue rounded" onclick="loadGenre('mecha')">mecha<small>robots</small></div>
               <div class="genre-tile shadow wood rounded" onclick="loadGenre('mystery')">mystery</div>
                    <div class="genre-tile shadow dark rounded" onclick="loadGenre('horror')">horror</div>

                          <div class="genre-tile shadow maroon rounded" onclick="loadGenre('historical')">historical</div>
                           <div class="genre-tile shadow grey rounded" onclick="loadGenre('seinen')">seinen<small>4mature men</small></div>
                     <div class="genre-tile shadow light  rounded" onclick="loadGenre('josei')">josei<small>4mature women</small></div>  
                      <div class="genre-tile shadow teal  rounded" onclick="loadGenre('school')">school</div>
                           <div class="genre-tile shadow olive rounded" onclick="loadGenre('isekai')">isekai<small>another world</small></div>`
}




qualityOption=0

animesChoosen=[]
//saving anime
function addAnime(id,obj){
  animesChoosen.unshift(obj)
  localStorage.setItem('animesaves',JSON.stringify(animesChoosen))
}


function saveAnime(id,ep){
  for (anime of animesChoosen){
    if(anime.animeId==id){
      anime.episode=ep

      localStorage.setItem('animesaves',JSON.stringify(animesChoosen))
    }
  }

}

function saveAnimeTime(id,time){
  for (anime of animesChoosen){
    if(anime.episode==id){
      anime.time=time

      localStorage.setItem('animesaves',JSON.stringify(animesChoosen))
    }
  }

}


function loadSaves(){
 Array.from(elem("#continue-watching").children).forEach(c=>c.remove())


animesChoosen=[]
animesChoosen=JSON.parse(localStorage.getItem('animesaves'))||[]

animesChoosen.filter((obj, index, arr) => {
  return index==arr.findIndex(item => item.animeID === obj.animeID);

});

if(animesChoosen.length>7){
  console.log('limit reached')
  animesChoosen.pop()
  localStorage.setItem('animesaves',JSON.stringify(animesChoosen))
}
if(animesChoosen.length==0){
  elem('#continue').classList.add('hide')
}else{
elem('#continue').classList.remove('hide')
}
animesChoosen.forEach((anime,index)=>{
  anitile=createAnimeTile({title:anime.name,image:anime.image},"#continue-watching",0,true)
  anitile.addEventListener('click',()=>{
elem('#loader').classList.remove('hide')
urlinfo=anime.urlType||url
routeTo('/info?id='+anime.animeId+'&background=1&source='+urlinfo)

setTimeout(()=>{routeTo(`/watch?ep=${anime.episode}&skip=${anime.time}`)
},2000)

  })
})
}

loadSaves()
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
  atitle.innerText=anime.title.english||anime.title.romaji||anime.title

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
    routeTo('/info?id='+anime.id)

     })
}
currentEp=1
//details about anime
function loadAnimeDetails(id, background=0,source=url){
  window.scrollTo(0, 0);
  fetch(source+'info/'+id).then((r)=>{
    return r.json()
  }).then(data=>{
    //hiding results screen
    elem('#results').classList.add('hide')
    if(!background){
    elem('#details').classList.remove('hide')
}
    //setting details back button
    elem('#details-back').onclick=()=>{
      elem('#details').classList.add('hide')
      history.back()
    }



   //loading anime details into elements 
    elem('#details-img').setAttribute('src',data.image)
elem('#details-blured-img').setAttribute('src',data.image)
    elem('#details-title').innerText=data.title.english||data.title.romaji||data.title
    if(data.description.length<250){
    elem('#details-info').innerHTML=data.description
    }else{
      information=data.description
      elem('#details-info').innerHTML=data.description.slice(0,250)+`<span class='text-read pack' onclick='elem("#details-info").innerHTML=information'>read more</span>`

    }
    elem('#details-episodes').innerText=data.totalEpisodes
    elem('#details-sub').innerText=data.subOrDub
    elem('#details-rating').innerText=(data.rating||'not available-')+'%'
    elem('#details-status').innerText=data.status
    elem('#details-type').innerText=data.type
    elem('#details-genre').innerText=data.genres

    elem('#details-othername').innerText=data.otherName||data.synonyms


    qualityOption=0 //default quality 360p

    //clearing episodes if any from previous call to be removed 
    elem('#watch-episodes').innerHTML=''

    //loading episodes as buttons
    epBtnChosen=undefined
    data.episodes.forEach((episode,index)=>{
    ep=document.createElement('button')
    ep.classList.add('btn')
    ep.classList.add('violet')
    ep.classList.add('opacity')
    ep.innerText=episode.number
    ep.addEventListener('click',(e)=>{
      watchAnime(episode.id,qualityOption)
      currentEp=index+1
      saveAnime(id,episode.id)
      e.target.classList.remove('opacity')
      if(epBtnChosen!=undefined){
        epBtnChosen.classList.add('opacity')
      }
      epBtnChosen=e.target

      //changing current episode 

    })

    elem('#watch-episodes').appendChild(ep)
    })
  //watch button loads the first episode by default 
  


  
  if(data.type=='MANGA'){
    elem('#watch-btn').innerText='read'
    //elem('#watch-btn').setAttribute('disabled','')
    elem('#watch-btn').style.background='var(--orange)'
    elem('#watch-btn').onclick=()=>{
      window.open('https://mangafire.to/filter?keyword='+data.title.english||data.title.romaji,'_blank');
      
    }

  }else{
elem('#watch-btn').innerText='watch'
//elem('#watch-btn').removeAttribute('disabled')
    elem('#watch-btn').style.background='var(--violet)'
    elem('#watch-btn').onclick = () => {
      currentEp = 1 
      addAnime(id, { episode: data.episodes[0].id, name: data.title, image: data.image, animeId: id, time: 0,urlType:url})
      
      //highlighting the first episode 
       elem('#watch-episodes').children[0].classList.remove('opacity')
       epBtnChosen=elem('#watch-episodes').children[0]
       
       
      routeTo('/watch?ep=' + data.episodes[0].id)
      
    }
    
  }

  //share btn setup
  elem('#share-btn').onclick=()=>{

        if (navigator.share) {
            navigator.share({
                title: 'watch '+data.title.english,
                text:'watch ' +(data.title.english||data.title)+' on gojotv',
                url:window.location.href
            })
            .then(() => {
                console.log('Successfully shared');
            })
            .catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            console.log('Web Share API not supported');

            var tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value =window.location.href;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
alert('share link copied to clipboard')

            // Provide a fallback or alternative sharing solution here
        }
  }


  if(source==murl){
  elem('#recommendations').innerHTML=''
  data.recommendations.forEach(r=>{

    createAnimeTile(r,'#recommendations',0)
  })


elem('#related').innerHTML=''
  data.relations.forEach(r=>{

    createAnimeTile(r,'#related',0)
  })
 
  enddate=data.startDate.year+'--now'
  if(data.status!='Ongoing'){
    enddate=data.startDate.year+'--'+data.endDate.day+'/'+data.endDate.month+'/'+data.endDate.year
  }
  elem('#details-release').innerText=data.startDate.day+'/'+data.startDate.month+'/'+enddate
  loadCharacters(data.characters)
  }
  
    if(data.relations==undefined || data.relations.length==0){
      
    elem('#relate').classList.add('hide')
      
    }else{
      elem('#relate').classList.remove('hide')
      
  }
  if(data.recommendations==undefined||data.relations.length==0){
    elem('#recommend').classList.add('hide')
  }else{
elem('#recommend').classList.remove('hide')
  }
  if(data.characters==undefined || data.characters.length==0){
    elem('#xray-box').classList.add('hide')
  }else{
    elem('#xray-box').classList.remove('hide')
  }
  
  if(!background){
  elem('#loader').classList.add('hide')
  }//loading finished




  }).catch(err=>{

  routeTo('/error')
   
   // elem('#loader').classList.add('hide') 
  })
}
//function to load next episode uses currentEp variable to keep track 
 function nextEp(){
   try{
     
   elem('#watch-episodes').children[currentEp].click()
  
   }catch{
     console.log('last episode reached')
   }
 }

//going back to r
function loadCharacters(charlist){
  elem('#xray').innerHTML=''
  charlist.forEach((c)=>{createChar(c)})
}




function createChar(c){
 charcard=document.createElement('div')
 charcard.classList=['character-tile']
 cimg=document.createElement('img')
 cimg.classList=['character-img']
 cimg.src=c.image
 charcard.appendChild(cimg)
 cdiv=document.createElement('div')
 ch=document.createElement('h3')
 ch.classList=['character-name']
 ch.innerText=c.name.full
 cva=document.createElement('p')
 cva.classList=['character-va']
 cva.innerText=c.role
 cdiv.appendChild(ch)
 cdiv.appendChild(cva)
 charcard.appendChild(cdiv)

  elem('#xray').appendChild(charcard)
}

//anime streaming links

function watchAnime(id,srcno=0){


  elem('#loader').classList.remove('hide')

 elem('#watch-title').innerText=id

  fetch(url+'watch/'+id).then(r=>{
    return r.json()
  }).then((data)=>{

    if(Hls.isSupported()){
      hls=new Hls()
      hls.loadSource(data.sources[srcno].url)
      hls.attachMedia(elem('#watch-screen'))
      console.log('hls supported')
    }else if(Hls.canPlayType('applications/apple.vnd.mpegurl')){


    elem('#watch-data').setAttribute('src',data.sources[srcno].url)
    elem('#watch-screen').setAttribute('src',data.sources[srcno].url)

    }else{
      alert('your browser doesnt support gojo')
    }
 //removing loader when video starts
        elem("#watch-screen").addEventListener('loadstart', () => {
          elem('#loader').classList.add('hide')
        })
       
        
  //watch timer setup
  elem('#watch-screen').onpause=(e)=>{
    saveAnimeTime(id,e.target.currentTime)
   //saves anime time when paused
  }


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



  }).catch((err)=>{
    routeTo('/error')
  })

}
//ambient mode setup
function ambient(){
  //not done yet
}



//search box functionality

elem('#search-btn').addEventListener('click',()=>{
  searchval=elem('#search-inp').value

  if(searchval!=''){
    routeTo('/search?q='+searchval+'&pg='+searchpgcount)
    searchpgcount=1

    elem('#search-inp').value=''

  }
})
elem('#searchbox').addEventListener('keypress',(e)=>{
  if(e.key=='Enter'){
    e.preventDefault()
    elem('#search-btn').click()
  }
})


searchpgcount=1
//search function
function searchAnime(aname,pg=1,isGenre=false){
  results='results'
  if(isGenre){
    results='genre'

  }else{

  }
  //shitty code-writing html from js for the bavk button and result title
elem('#results-container').innerHTML=`  <button class="btn violet" onclick="routeTo('/home')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg></button>
    
<h2 class='font-2' >${results}: ${aname}</h2>`
genreIndicator=''
genreIndicator2='?'
if(isGenre){
  if(url==burl){
  genreIndicator='genre/'
  console.log('still old')
  }else{
    genreIndicator='genre?genres=["'
    aname=aname.charAt(0).toUpperCase()+aname.slice(1)
    genreIndicator2='"]&'
  }
}

fetch(url+genreIndicator+aname+genreIndicator2+'page='+pg).then((r)=>{
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
      if(isGenre){
        searchAnime(aname,searchpgcount,true)
      }else{
      searchAnime(aname,searchpgcount+1)
      }
      searchpgcount++
      nextBtn.remove()
    })
  }

})
}

function loadGenre(t){
  
  
  routeTo('/genre?q='+t)
  
}


pgCount=2





function createAnimeTile(anime,location, position,notdefault=false)
{
  tile=document.createElement('div')
  tile.classList.add('anime-tile')
  tile.classList.add('shadow')
  tile.classList.add('card')
  if(anime.type=='MANGA'){
    tile.classList.add('manga-tile')
  }
  tile.classList.add('anime-fade')
  if(position!=0){
  tile.setAttribute('pos', position)
  }
  tile.style.background='url("'+anime.image+'")'
  tilename=document.createElement('span')
  tilename.innerText=anime.title.english||anime.title.romaji||anime.title
  tile.appendChild(tilename)
  elem(location).appendChild(tile)
  if(!notdefault){
  tile.addEventListener('click',()=>{
    elem('#loader').classList.remove('hide')
    routeTo('/info?id='+anime.id)

  })}
  return tile
}

//我必须吃屎才能做到这一点

function loadHome(pageno=1, location='#top-airing',slides=true,ranking=1){

  if(url==burl){
    home='top-airing'
  }else{
    home='trending'
  }
  fetch(url+`${home}?page=`+pageno).then((r)=>{
  return r.json()
}).then((data)=>{
  setTimeout(()=>{
  data.results.forEach((anime,index)=>{
    if(ranking){
    createAnimeTile(anime,location,index+1)
    }else{
createAnimeTile(anime,location,0)
    }
    //the code below is disgusting (its for the slides)
    if(slides){
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
    h.innerText=anime.title.english||anime.title.romaji||anime.title

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

  }

}  )},1)

})
}
function loadPopular(){
  if(url==murl){
    fetch(url+'popular').then(dat=>{return dat.json()}).then(r=>{
      r.results.forEach((anime)=>{
        createAnimeTile(anime,'#goated',0)
      })
    })
  }else{
    elem('#popular').classList.add('hide')
  }
}
loadPopular()




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






loadHome(2,'#popular-airing',false,0)
loadHome(3,'#mores',false,0)

//automatically setting darkmode if system in darkmode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    tgdarkmode(elem("#darkmodet2"))
    elem('#darkmodet').innerHTML=elem('#darkmodet2').innerHTML

}

//slide show setup
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',



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

//current page
currpage=elem('.intro')