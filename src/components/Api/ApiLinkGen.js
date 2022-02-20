function Nytimes()
{
    return 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=UWw9qZ0TIpiVxDQfdcqs6Ueg9DgH3qGn';
}


function Openlibrary({isbn})
{
    return 'https://covers.openlibrary.org/b/isbn/' + toString(isbn) + '-M.jpg';
}

function IsBookPresent({isbn})
{
    return 'https://openlibrary.org/isbn/' + toString(isbn) + '.json';
}

function MyBackend({work})
{
    console.log("work", work);
    return 'http://192.168.0.115:5000/' + work;
}
export {Nytimes, Openlibrary, IsBookPresent, MyBackend};