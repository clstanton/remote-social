// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save movie data for a logged in user
  export const saveMovie = (movieData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieData),
    });
  };
  
  // remove saved movie data for a logged in user
  export const deleteMovie = (movieId, token) => {
    return fetch(`/api/users/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  // make a search to utelly api
  // https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=dark+knight&country=us
  // export const searchUtelly = (query) => {
  //   return fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${query}`, {
  //       "method": "GET",
  //       "headers": {
  //           "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
  //           "x-rapidapi-key": "9309dd3a49msh8d5ab074c47721ap1cdb7ajsne9778b043bb9"
  //       }
  //   });
  // };

// Can we incorporate a second API for more info?
  export const searchTMDB = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=24015e7692b811d33d1c989cbd42b043&query=${query}`)
  };