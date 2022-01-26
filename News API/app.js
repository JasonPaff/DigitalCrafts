const newsFeed = document.getElementById("news");
const sourcesDropDown = document.getElementById("sourcesDropDown");
const showAllButton = document.getElementById("showAllButton");

function DisplayNewsArticles(articles){
    newsFeed.innerHTML = articles.map(article => 
        `<div class='news_feed'>
        <img src='${article.urlToImage}' class='news_image'></img>
        <h2>${article.title}</h2>    
        <h3>by ${article.author}</h4>
        <h4>published: ${article.publishedAt}</h4>
        <a href='${article.url}'>Link to news</a>
        <p>${article.description}</p>
        <br>
        </div>`).join('')
}

function BuildSourcesDropDownList() {
    return sources.sources.map(function(source){
        if (news.articles.filter(article => article.source.name == source.name).length > 0) 
            return `<option>${source.name}</option>`})

    /* same as above but more spread out
    let filteredSources = sources.sources.map(function(source) {
        let filteredArticles = news.articles.filter(article => article.source.name == source.name)

        if (filteredArticles.length > 0)
            return `<option>${source.name}</option>`             
        }) 

    return filteredSources; */    
}

sourcesDropDown.innerHTML = BuildSourcesDropDownList()

showAllButton.addEventListener("click", () => DisplayNewsArticles(news.articles))
sourcesDropDown.addEventListener("change", () => DisplayNewsArticles(news.articles.filter(article => article.source.name == sourcesDropDown.value)))

DisplayNewsArticles(news.articles)