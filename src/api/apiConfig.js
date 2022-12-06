const apiConfig ={
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    //originalImage:'https://image.tmdb.org/t/p/original/${imgPath}',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

console.log(process.env.REACT_APP_API_KEY, "butter");

// console.log("https://api.themoviedb.org/3/movie/550?api_key=d5199020aac77d6859c71466db7228e1");


export default apiConfig;   