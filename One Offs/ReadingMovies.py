import json

movies = ""

with open("movies.json") as file:
    movies = json.load(file)

for movie in movies['Search']:
    print(f"\nTitle: {movie['Title']} - Year: {movie['Year']} - Type: {movie['Type']} \nimdbID: {movie['imdbID']} - Poster: {movie['Poster']}")