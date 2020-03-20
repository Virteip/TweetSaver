const thoughtsList = document.getElementById('lista-tweets');


//Events

eventListeners();

function eventListeners()
{
    //user pressed submit
    document.querySelector('#formulario').addEventListener('submit', addTweet);
    //user clicked remove
    thoughtsList.addEventListener('click', removeTweet);
    //page loaded and here comes the tweets
    document.addEventListener('DOMContentLoaded',summonLocalStorage);
}

//Functions

function addTweet(e)
{
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;
    
    //create remove button
    const deletes = document.createElement('a');
    deletes.classList = 'delete-tweet';
    deletes.innerText = 'Remove';
    
    //add tweet to list
    const list = document.createElement('li');
    if (tweet != ""){
        list.innerText = `${tweet}`;
        list.appendChild(deletes);
        thoughtsList.appendChild(list);
        //add to local storage
        addToLocalStorage(tweet);
    }

    
}

//Add array to local storage 
function addToLocalStorage(tweet)
{
    let tweets;
    //obtain saved text
    tweets = obtainFromLocalStorage();
    //add it at the end of the array
    tweets.push(tweet);
    //add to local storage
    localStorage.setItem('tweets', JSON.stringify(tweets)); 
}

//initialize empty array if local storage is null or retrieve JSON from localstorage
function obtainFromLocalStorage()
{
    let tweets;

    if(localStorage.getItem('tweets') === null)
    {
        tweets = [];
    }
    else
    {
        tweets = JSON.parse(localStorage.getItem('tweets')); //parse JSon into array
    }
    return tweets; // return array saved in local storage
}

function removeTweet(e)
{   
    e.preventDefault();
    if(e.target.className === 'delete-tweet')
    {
        e.target.parentElement.remove();
        deleteFromLocalStorage(e.target.parentElement.innerText);
    }
}

function summonLocalStorage()
{
    let tweets = obtainFromLocalStorage();
    
    tweets.forEach(tweet => {
        //create remove button
        const deletes = document.createElement('a');
        deletes.classList = 'delete-tweet';
        deletes.innerText = 'Remove';
        
        //add tweet to list
        const list = document.createElement('li');
        if (tweet != "")
        {
            list.innerText = `${tweet}`;
            list.appendChild(deletes);
            thoughtsList.appendChild(list);
        }    
    });
       
}

//delete from local storage
function deleteFromLocalStorage(tweet)
{
    let tweets, deleteTweet;
    //Erase the Remove word from the string
    deleteTweet = tweet.substring(0, tweet.length - 6) 
    
    tweets = obtainFromLocalStorage();

    tweets.forEach(function (tweet,index) {
        if (tweet === deleteTweet)
        {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}