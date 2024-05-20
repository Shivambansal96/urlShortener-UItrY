# URL Shortener Service

This project is a URL shortener service built with Node.js and Express. It allows users to shorten long URLs and later redirect to the original URLs using the shortened versions. The service also includes error handling and basic logging functionality.

## Features

- Shorten a given URL and generate a unique short URL.
- Redirect to the original URL when the short URL is accessed.
- Validate the input URL to ensure it is properly formatted.
- Log each access and any errors that occur.

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (v6 or later recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivambansal96/urlShortener-UItrY.git
   cd urlShortener-UItrY
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `urls.json` file in the root directory to store the URL mappings:
   ```json
   {}
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. The server will be running at `http://localhost:8008`.

### API Endpoints

#### GET `/`

Serves the homepage.

#### POST `/url-shortener`

Shortens a given URL.

- **Request Body**:
  ```json
  {
    "url": "https://example.com"
  }
  ```

- **Response**:
  ```json
  {
    "status": true,
    "data": "http://localhost:8008/shortURL"
  }
  ```

#### GET `/:shortURL`

Redirects to the original URL associated with the `shortURL`.

### Error Handling

- Errors are logged to `Errors.log`.
- Custom error messages are returned for invalid requests or when no corresponding URL is found.

## Code Overview

### Dependencies

- `express`: Web framework for Node.js.
- `nanoid`: Library to generate unique IDs.
- `fs`: File system module to read and write files.
- `path`: Utility module to handle and transform file paths.
- `url`: Utility module to parse and validate URLs.

### Structure

- `index.html`: The homepage file.
- `urls.json`: Stores URL mappings.
- `data.log`: Logs each access to a short URL.
- `Errors.log`: Logs errors.

### Key Files

- `server.js`: Main server file containing route handlers and middleware.

### Route Handlers

- **GET `/`**: Serves the homepage.
- **POST `/url-shortener`**: Validates the URL, generates a short URL, saves the mapping, and returns the short URL.
- **GET `/:shortURL`**: Redirects to the original URL based on the short URL.

### Middleware

- `errorHandlingMiddleware`: Logs errors and returns a custom error response.

## Example Usage

1. Navigate to `http://localhost:8008` to see the homepage.
2. Use a tool like Postman to send a POST request to `http://localhost:8008/url-shortener` with a JSON body containing a URL.
3. Access the short URL returned in the response to be redirected to the original URL.

## Author

This project was created by Shivam Bansal. You can find more of my work on [GitHub](https://github.com/Shivambansal96).

Feel free to reach out for any questions or further assistance. Happy coding!