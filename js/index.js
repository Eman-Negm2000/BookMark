
var SiteNameInput = document.getElementById('SiteName');
var SiteURLInput = document.getElementById('SiteURL');
var alertNameInput=document.getElementById('alertNameInput')
var saveBookmark;

if (localStorage.getItem('bookMarkers' ) !=null )  {

  saveBookmark= JSON.parse( localStorage.getItem('bookMarkers') );
  displayBookmark();

}
else{
  saveBookmark=[];
}







function add(){

  
   var addBookmark=
   {
   Name: SiteNameInput.value ,
   URL: SiteURLInput.value
   }

   if(!validateForm()){
     return false;
   }
   saveBookmark.push(addBookmark);
   localStorage.setItem ('bookMarkers' , JSON.stringify(saveBookmark)) ;
   displayBookmark();
}




function displayBookmark()
{
var cartona = '';

for( var i=0 ; i<saveBookmark.length; i++){
  cartona += 
 `
 <div class=" my-3  ">
 <tr>
   <td ">${saveBookmark[i].Name}</td>
   <td> <button class="btn btn-primary" onclick="visit(${i})">visit</button></td>
   <td> <button class=" btn btn-danger " onclick="deleteBookmark(${i});" >delete</button></td>
 </tr>
 </div>
`
}

document.getElementById('tableRow').innerHTML=cartona;

}

function deleteBookmark(index){
  saveBookmark.splice(index,1)
  localStorage.setItem ('bookMarkers' , JSON.stringify(saveBookmark)) ;
  displayBookmark();

}

function validateForm(){
  if(!SiteNameInput.value || !SiteURLInput.value){
    alert('please fill thr form');
     return false ;
   }  
var experission =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

var regex= new RegExp(experission);

if(!SiteURLInput.value.match(regex)){
  // alert('please use a valid URL');
  SiteURLInput.classList.add('is-invalid')
  alertNameInput.classList.remove('d-none')
  SiteURLInput.classList.remove('is-valid')

  return false ;
}

else{

  SiteURLInput.classList.add('is-valid')
  alertNameInput.classList.add('d-none')
  SiteURLInput.classList.remove('is-invalid')

  return true ;


}
}

SiteURLInput.addEventListener('blur' , validateForm)

function visit(index){
  // window.location.assign(saveBookmark[index].URL)
  window.open(saveBookmark[index].URL)
}