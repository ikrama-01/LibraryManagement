# Library Management System

## Features
### Books Module:
- Add new books to the library.
- View all books with details such as title, author, published year, and status.
- Update book details.
- Delete books from the library.
- Search Books with Title or Author name.

### Members Module:
- Add new members.
- View all members with details such as name, email, phone number, and joined date.
- Update member information.
- Delete members.

---

## Technologies Used
- **Backend:** Flask, SQLite
- **Frontend:** React, CSS
- **Tools:** Postman (API testing)

---

## Setup Instructions

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Navigate to the backend folder (if applicable):
   ```bash
   cd backend
   ```

3. Set up a virtual environment (optional but recommended):
   - **On Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **On macOS/Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

4. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend server will run at `http://127.0.0.1:5000`.

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The React application will run at `http://localhost:3000`.

---

## API Endpoints

### Books
- **Add a Book:**
  - `POST /add-book`
  - Request Body:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "published_year": 2023,
      "status": "Available"
    }
    ```

- **View Books:**
  - `GET /read-books`

- **Update a Book:**
  - `PUT /update-books/<book_id>`
  - Request Body:
    ```json
    {
      "title": "Updated Title",
      "author": "Updated Author",
      "published_year": 2022,
      "status": "Unavailable"
    }
    ```

- **Delete a Book:**
  - `DELETE /delete-books/<book_id>`

### Members
- **Add a Member:**
  - `POST /add-member`
  - Request Body:
    ```json
    {
      "name": "Member Name",
      "email": "member@example.com",
      "phone": "1234567890",
      "joined_date": "2023-12-19"
    }
    ```

- **View Members:**
  - `GET /read-members`

- **Update a Member:**
  - `PUT /update-members/<member_id>`
  - Request Body:
    ```json
    {
      "name": "Updated Name",
      "email": "updated@example.com",
      "phone": "0987654321",
      "joined_date": "2023-12-19"
    }
    ```

- **Delete a Member:**
  - `DELETE /delete-members/<member_id>`

---

## Design Choices
- **Backend:**
  - Flask was chosen for its simplicity and quick setup for small-scale projects.
  - SQLite is used as the database for easy management without requiring additional setup.

- **Frontend:**
  - React was selected for its component-based structure and ease of creating dynamic user interfaces.

- **API Testing:**
  - Postman was used to ensure all endpoints function correctly before integrating with the frontend.

---

## Assumptions and Limitations
### Assumptions:
- The library only tracks basic information for books and members.
- The SQLite database file (`library.db`) is included in the project.
- The application runs locally and is not deployed.

### Limitations:
- No authentication or authorization mechanisms are implemented.
- The database schema is basic and may not support advanced use cases.
- The application does not handle concurrent users or scaling.



