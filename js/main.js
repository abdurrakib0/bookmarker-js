document.getElementById('myform').addEventListener('submit', savebookmark);

function savebookmark(e) {
    var sitename = document.getElementById('sitename').value;
    var siteurl = document.getElementById('siteurl').value;

    if (!sitename || !siteurl){
        alert('Please input the fields');
        return false;
    }
    var bookmark = {
        name: sitename,
        url: siteurl
    };

    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    book();
    e.preventDefault();

}

function deletebookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url==url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    book();

}

function book() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var Results = document.getElementById('Results');

    Results.innerHTML = '';



    for (var i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        Results.innerHTML += '<div class="mt-2 col-md-12 card card-body bg-light">'+
                             '<h3>'+name+
                             ' <a class="btn btn-secondary" target="_blank" href="'+url+'">visit</a> ' +
                             ' <a onclick="deletebookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                             '</h3>'+
                             '</div>';
    }
}
