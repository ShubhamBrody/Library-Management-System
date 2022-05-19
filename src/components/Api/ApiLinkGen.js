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
    // return 'http://localhost:8080/' + work;
    return 'https://lms-shubham-backend.herokuapp.com/' + work;
    // return 'https://lms-shubham-backend.herokuapp.com/'
}
export {Nytimes, Openlibrary, IsBookPresent, MyBackend};