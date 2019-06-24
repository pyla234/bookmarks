// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmarks
function saveBookmark(e) {
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	//console.log(siteName);

    if (!ValidationForm(siteName, siteUrl)){
        return false;
    }

	var bookmark={
		name: siteName,
		url: siteUrl
	}
	console.log(bookmark);

	// Local storage test

	/*
	localStorage.setItem('test','hello word!');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	// Test if bookmarks is null

	if (localStorage.getItem('bookmarks') === null) {

		// init arrray
		var bookmarks = [];

		//Add to array

		bookmarks.push(bookmark);
       
		//Set to LocalStorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        
    }
     else {
         
         // Get Bookmarks from localStorage
         var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	 	// Add bookmark to array
		 bookmarks.push(bookmark);
       
         // Re-set back to localStorage
         localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

     }
    // Re set form
    document.getElementById('myForm').reset();

    //Re fetch bookmark
    fetchBookmarks();

    e.preventDefault();
}

// delete bookmark
function deleteBookmark(url){
         // console.log(url);

    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // Loop throught bpplmarks
    for( var i=0; i< bookmarks.length; i++){
        if(bookmarks[i].url === url){
           
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //Re fetch bookmark
    fetchBookmarks();
}

// fetch bookmark
 function fetchBookmarks(){
    
    // Get bookmarks from localStorage
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     
     //Get output id
     var bookmarksReults = document.getElementById('bookmarksReults');
     //Build output
     bookmarksReults.innerHTML = '';

     for(var i=0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
         bookmarksReults.innerHTML += '<div class="well">'+
                                        '<h3>' + name + 
                                        '<a class="btn btn-defalt" target="_blank" href="'+url+'"> Visit </a>'+
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete </a>'+
                                        '</h3>'
                                        + '</div>'

     }
 }

// Validation form
function ValidationForm(siteName, siteUrl){
     if (!siteName || !siteUrl) {
         alert('please fill in the form');
         return false;
     }

     var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/                                    [-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
     var regex = new RegExp(expression);

     if (!siteUrl.match(regex)) {
         alert("Please use valid URL ");
         return false
     }
     return true;
 }