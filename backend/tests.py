import pytest
import sqlite3
from app import app


# **Fixture for test client**
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


# **Utility function to reset the database**
def reset_database():
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    # Clear Books and Members tables
    cursor.execute("DELETE FROM BOOKS")
    cursor.execute("DELETE FROM MEMBERS")
    conn.commit()
    conn.close()


# **1. Test case for Add Book API**
def test_add_book(client):
    reset_database()
    response = client.post('/create-books', json={
        'title': 'Test Book',
        'author': 'Test Author',
        'published_year': 2023,
        'status': 'Available'
    })
    assert response.status_code == 201
    assert response.get_json()['message'] == 'Book added successfully!'


# **2. Test case for Read Books API**
def test_read_books(client):
    reset_database()
    # Add a book to test the read functionality
    client.post('/create-books', json={
        'title': 'Sample Book',
        'author': 'Sample Author',
        'published_year': 2020,
        'status': 'Checked Out'
    })

    response = client.get('/read-books')
    assert response.status_code == 200
    books = response.get_json()['books']
    assert len(books) == 1
    assert books[0][1] == 'Sample Book'  # Validate the title


# **3. Test case for Search Book by Title API**
def test_search_book_by_title(client):
    reset_database()
    # Add a book to test the search functionality
    client.post('/create-books', json={
        'title': 'Search Book',
        'author': 'Some Author',
        'published_year': 2019,
        'status': 'Available'
    })

    response = client.get('/search-books?q=Search Book')
    assert response.status_code == 200
    book = response.get_json()['books']
    assert len(book) > 0  # Ensure that a book is returned
    assert book[0][1] == 'Search Book'  # Validate the title


# **4. Test case for Search Book by Author API**
def test_search_book_by_author(client):
    reset_database()
    # Add books to test the search functionality
    client.post('/create-book', json={
        'title': 'Book by Author',
        'author': 'John Doe',
        'published_year': 2018,
        'status': 'Available'
    })
    client.post('/create-books', json={
        'title': 'Another Book',
        'author': 'John Doe',
        'published_year': 2020,
        'status': 'Checked Out'
    })

    response = client.get('/search-books?q=John Doe')
    assert response.status_code == 200
    book = response.get_json()['books']
    assert len(book) > 0
    assert book[0][2] == 'John Doe'  # Validate the author


# **5. Test case for Delete Book API**
def test_delete_book(client):
    reset_database()
    # Add a book to test the delete functionality
    client.post('/create-books', json={
        'title': 'Book to Delete',
        'author': 'Author',
        'published_year': 2022,
        'status': 'Available'
    })
    # Get the book ID from the database
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM BOOKS WHERE title = 'Book to Delete'")
    book_id = cursor.fetchone()[0]
    conn.close()

    response = client.delete(f'/delete-books/{book_id}')
    assert response.status_code == 200
    assert response.get_json()['message'] == 'Book Deleted Successfully'


# **6. Test case for Update Book API**
def test_update_book(client):
    reset_database()
    # Add a book to test the update functionality
    client.post('/create-books', json={
        'title': 'Old Title',
        'author': 'Old Author',
        'published_year': 2019,
        'status': 'Available'
    })
    # Get the book ID from the database
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM BOOKS WHERE title = 'Old Title'")
    book_id = cursor.fetchone()[0]
    conn.close()

    # Update the book details
    response = client.put(f'/update-books/{book_id}', json={
        'title': 'Updated Title',
        'author': 'Updated Author',
        'published_year': 2023,
        'status': 'Checked Out'
    })
    assert response.status_code == 201
    assert response.get_json()['message'] == 'Book updated successfully'


# **7. Test case for Add Member API**
def test_add_member(client):
    reset_database()
    response = client.post('/create-members', json={
        'name': 'John Doe',
        'email': 'john.doe@example.com',
        'phone': '1234567890',
        'joined_date': '2024-01-01'
    })
    assert response.status_code == 200
    assert response.get_json()['message'] == 'Members added successfully!'


# **8. Test case for Update Member API**
def test_update_member(client):
    reset_database()
    # Add a member to test the update functionality
    client.post('/create-members', json={
        'name': 'Jane Doe',
        'email': 'jane.doe@example.com',
        'phone': '0987654321',
        'joined_date': '2024-01-01'
    })
    # Get the member ID from the database
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM MEMBERS WHERE name = 'Jane Doe'")
    member_id = cursor.fetchone()[0]
    conn.close()

    # Update the member details
    response = client.put(f'/update-members/{member_id}', json={
        'name': 'Jane Updated',
        'email': 'updated@example.com',
        'phone': '1111111111',
        'joined_date': '2024-02-01'
    })
    assert response.status_code == 201
    assert response.get_json()['message'] == 'data updated successfully'


# **9. Test case for Delete Member API**
def test_delete_member(client):
    reset_database()
    # Add a member to test the delete functionality
    client.post('/create-members', json={
        'name': 'Member to Delete',
        'email': 'delete@example.com',
        'phone': '9876543210',
        'joined_date': '2024-01-01'
    })
    # Get the member ID from the database
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM MEMBERS WHERE name = 'Member to Delete'")
    member_id = cursor.fetchone()[0]
    conn.close()

    response = client.delete(f'/delete-members/{member_id}')
    assert response.status_code == 200
    assert response.get_json()['message'] == 'Members Deleted Successfully'


# **10. Test case for Read Members API**
def test_read_members(client):
    reset_database()
    # Add a member to test the read functionality
    client.post('/create-members', json={
        'name': 'Sample Member',
        'email': 'sample@example.com',
        'phone': '1234567890',
        'joined_date': '2024-01-01'
    })

    response = client.get('/read-members')
    assert response.status_code == 200
    members = response.get_json()['members']
    assert len(members) == 1
    assert members[0][1] == 'Sample Member'  # Validate the name
