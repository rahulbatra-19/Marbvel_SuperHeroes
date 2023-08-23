var currentPage = window.location.pathname;;
var page =currentPage.split('/');
// console.log(typeof(page[page.length-1]));



if(page[page.length-1]==='index.html'){
const ts = Date.now();
const privateKey ="0df952292a7695c26ee87c33612c574d333f26fc";
const publicKey ="35576825b842256ec7f677422e9e79e8";
const hash = CryptoJS.MD5(ts+privateKey+publicKey);

var displayList = document.getElementById('displayCharacters'); 
const apiUrl = 'https://gateway.marvel.com/v1/public/characters?limit=40&offset=50';

var favs = document.querySelectorAll('.fav_icon');
var favu ;
var favourite = [];
if(localStorage.getItem('favs')){
favu = JSON.parse(localStorage.getItem('favs'));
favourite = favu;
}
console.log(favourite);
var dataCharacters = [];

  const fetchApi = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
      // const data = await response.json();
      console.log("data", data);
      dataCharacters = data.data.results;
      localStorage.setItem("data", JSON.stringify(dataCharacters));
      var displayScreenCharcters = dataCharacters.slice(1, 20);

      displayScreenCharcters.forEach((character) => {
        let color;

        if (favourite.includes(character.id.toString())) {
          color = "red";
        } else color = "";
        let li = document.createElement("li");
        li.innerHTML = ` <img src="${
          character.thumbnail.path + "." + character.thumbnail.extension
        }" alt="No pic Available" id="charpic">

      <p id="dispname">
      ${character.name}
      </p>

      <span class="material-symbols-outlined fav_icon ${color}" id=${
          character.id
        }>
        favorite
      </span>`;
        li.addEventListener("click", function () {
          localStorage.setItem("description", JSON.stringify(character));
          window.location.assign("description.html");
        });

        displayList.appendChild(li);
      });
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  fetchApi();


  // console.log(dataCharacters);

// Implementation of the dropdown list where u search
const dropdown = document.getElementById('dropdownlist');
const searchinput = document.getElementById('searchinput');
searchinput.addEventListener('input',function(event)
{

    const options = dataCharacters.filter(element => 
      element.name.toLowerCase().startsWith(searchinput.value.toLowerCase()));

      dropdown.innerHTML ="";

      options.forEach(option=>{

        let li = document.createElement('li');

        li.innerHTML=`${option.name} 
         <span class="material-symbols-outlined fav_icon right"  id=${option.id}>
        favorite
      </span> `
        li.addEventListener('click', ()=> {
          
        localStorage.setItem('description',JSON.stringify(option));
        window.location.assign('description.html');

          dropdown.style.display="none";
        });
      
        dropdown.appendChild(li);
      });
      var right = document.querySelectorAll('.right');
      
      heart();
      right.forEach(ele=>{
        if(favourite.includes(ele.id.toString()))
        {
          ele.style.color="red";
        }
      });

      if (searchinput.value === "") {
        dropdown.style.display = "none";
      } else {
        dropdown.style.display = "block";
      }

});


// for the heart favourite 
function heart()
{
favs = document.querySelectorAll('.fav_icon');
console.log(favs);
favs.forEach(item=>{
item.addEventListener('click',(event)=>{
     event.stopPropagation(); 
  if(!favourite.includes(item.id.toString())){
    item.style.color="red";
    // console.log(item.id);
    favourite.push(item.id);
    // console.log(favourite);
    localStorage.setItem('favs',JSON.stringify(favourite));
    }
    else {
  console.log(item);
      item.style.color="white";
      var index = favourite.indexOf(item.id);
      favourite.splice(index,1);
    localStorage.setItem('favs',JSON.stringify(favourite));
    }

});
});
}
setTimeout(heart
,3000);

var marvelAni = document.getElementById('marvel-logo');
console.log(marvelAni);
marvelAni.addEventListener('click', ()=>{
  document.getElementById('entry').style.display="block";
  setTimeout(()=>{
    document.getElementById('entry').style.display="none";
      document.getElementById('afterEntry').style.display="block";
    },3700);
});

//  for marvel animagtion
window.addEventListener('load', function() {
  if(localStorage.getItem('hasrun')!='true'){
  document.getElementById('entry').style.display="block";
  localStorage.setItem('hasrun','true');

  setTimeout(()=>{
  document.getElementById('entry').style.display="none";
    document.getElementById('afterEntry').style.display="block";
  },3700);
}
  
});

}
// for favourite.html 
else if(page[page.length-1]==='favourites.html')
{
  var currentPage = window.location.pathname;
// console.log(currentPage);
var favs = JSON.parse(localStorage.getItem('favs'));
var data = JSON.parse(localStorage.getItem('data'));
var disFav = document.getElementById('displayFavouriteCharacters');

// console.log(data);

// for the favourite 
function renderList(){
favs.forEach(fav=>{
    data.forEach(character=>{
        if(character.id==fav)
        {
            console.log(character);
            let li = document.createElement('li');
            li.id = character.id;

            li.innerHTML=`<img src="${character.thumbnail.path +'.'+ character.thumbnail.extension}" alt="No pic Available" id="charpic">
            <p id="dispname">
            ${character.name}
            </p>


            <span class="material-symbols-outlined fav_icon" style="color:red" id=${character.id}>
                favorite
                </span>`;

            li.addEventListener('click',()=>{
                localStorage.setItem('description',JSON.stringify(character));
                window.location.assign('description.html');
            });
            
            disFav.appendChild(li);
        }

    })

});
}
renderList();


// for removing favourite charcaters
let hearts = document.querySelectorAll('.fav_icon');
console.log(hearts);
hearts.forEach(heart=>{
    heart.addEventListener('click',function(event){
        event.stopPropagation();
        var index = favs.indexOf(heart.id);
        favs.splice(index,1);
        localStorage.setItem('favs', JSON.stringify(favs));
        console.log(favs);
        disFav.removeChild(document.getElementById(heart.id));
        // renderList();
    });
});

}
else if(page[page.length-1]==='description.html')   // for description.html page
{

var descrpition = JSON.parse(localStorage.getItem('description'));     // for description.html 
// console.log(descrpition);

let img =document.getElementById('DesImg');
img.src= descrpition.thumbnail.path +'.' + descrpition.thumbnail.extension;



let pname = document.getElementById('name');
pname.innerText = descrpition.name;


let content = document.getElementById('cont');
content.innerText = descrpition.description;

let comicsCh = document.getElementById('comics');
//  for description of the comics 

let comics =[];
descrpition.comics.items.forEach(element => {
    comics.push(element.name);
});;


if(comics.length>0){
comicsCh.innerText ="Comics: \n" + comics.join('\n');
}
}
