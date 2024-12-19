from flask import Flask, request, jsonify
import sqlite3
from flask import Blueprint


app = Blueprint('app', __name__)

# APIs for Books
@app.route('/create-books', methods=['POST'] )
def add_book():
    data = request.json
    title = data['title']
    author = data['author']
    published_year = data['published_year']
    status = data['status']
    
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO BOOKS(title,author,published_year,status)
        VALUES (?,?,?,?)
    """, (title,author,published_year,status))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'book added successfully!'}),200

@app.route('/read-books', methods=['GET'] )
def read_book():
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM BOOKS")
    books = cursor.fetchall()
    conn.close()
    
    return jsonify({'books': books}),200
    


@app.route('/update-books/<int:book_id>', methods=['PUT'] )
def update_book(book_id):
    data = request.json
    title = data['title']
    author = data['author']
    published_year = data['published_year']
    status = data['status']
    print("received data",data)
    try:
        conn = sqlite3.connect('library.db')
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE BOOKS
            SET title = ?, author = ?, published_year = ?, status = ?
            WHERE id = ?
        """, (title,author,published_year,status,book_id))
        conn.commit()
        conn.close()
        
        return jsonify({'message':'data updated successfully'}),201
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500
    
    
    
    
@app.route('/delete-books/<int:book_id>', methods=['DELETE'] )
def delete_book(book_id):
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM BOOKS WHERE ID = ?", (book_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message':'Book Deleted Successfully'}),200
    
    
    
@app.route('/search-books', methods=['GET'] )
def search_book():
    query = request.args.get('q')
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM BOOKS WHERE title LIKE ? OR author LIKE ? 
    """, (f'%{query}', f'%{query}'))
    results = cursor.fetchall()
    conn.close()
    
    return jsonify({'books':results}),200


# APIs for Members
@app.route('/create-members', methods=['POST'] )
def add_member():
    data = request.json
    name = data['name']
    email = data['email']
    phone = data['phone']
    joined_date = data['joined_date']
    
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO MEMBERS(name,email,phone,joined_date)
        VALUES (?,?,?,?)
    """, (name,email,phone,joined_date))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Members added successfully!'}),200

@app.route('/read-members', methods=['GET'] )
def read_member():
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM MEMBERS")
    members = cursor.fetchall()
    conn.close()
    
    return jsonify({'members': members}),200
    


@app.route('/update-members/<int:member_id>', methods=['PUT'] )
def update_member(member_id):
    data = request.json
    name = data['name']
    email = data['email']
    phone = data['phone']
    joined_date = data['joined_date']
    print("received data",data)
    try:
        conn = sqlite3.connect('library.db')
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE MEMBERS
            SET name = ?, email = ?, phone = ?, joined_date = ?
            WHERE id = ?
        """, (name,email,phone,joined_date,member_id))
        conn.commit()
        conn.close()
        
        return jsonify({'message':'data updated successfully'}),201
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500
    
    
    
    
@app.route('/delete-members/<int:member_id>', methods=['DELETE'] )
def delete_member(member_id):
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM MEMBERS WHERE ID = ?", (member_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message':'Members Deleted Successfully'}),200

