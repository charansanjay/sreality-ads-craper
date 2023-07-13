# Project: sreality-ads-scraper

### <u>Run the project - </u>

1. Clone the repository
2. Run the command <b>"docker-compose up"</b> in the root folder of the project/repository.
3. Now you can visit http://localhost:5000/api/sreality to check the JSON data(scraped items from sreality.cz) sent from the server.
4. <mark><b>To see the frontend visit http://localhost:3000 or http://localhost:8080. Both 3000 and 8080 ports are exposed in the Dockerfile. EITHER ONE OF THE PORTS SHOULD WORK.</b></mark>

### Project files
- The project has frontend web app files in the "frontend" folder. And the server code in "backend" folder. 
- The frontend is writen using React and typescript. The UI is responsive (used sass pre-processor for styling). 
- Backend uses node.js and Express framework to scrap the ads from the sreality.cz website.


### <u>Work flow(Necessary comments are in the code)</u>
#### Frontend:
1. The end point for fetching the ads is scraped using developer tools and analysing the response from sreality.cz website.
2. When the component is mounted, the UseEffect hook sends a GET request to fetch the ads. And displays the result in the frontend.
3. Pagination is used to display all 500 results having 25 ads per page.

#### Backend:
1. The backend server accepts the request from the frontend.
2. it uses the endpoint with necessary query parameters to scrap the first 500 ads.
3. Then it saves into the postgreSQL database.
4. after successfull inserting the ads into the database, the server will send the scraped items to the frontend as response. 
5. The error handling functionality is also implemented using try catch block and if else condition using the response status code.

#### Docker
1. Finally the entire application is Composed into a docker file for both frontend and backend.
2. docker-compose.yaml file has all the configurations to connect the frontend , backend and the database.
