import sqlite3

def setup_database():
    conn = sqlite3.connect('library.db')
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS BOOKS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        published_year INTEGER NOT NULL,
        status TEXT NOT NULL
        
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS MEMBERS(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        joined_date TEXT NOT NULL
    )
    """)

    conn.commit()
    conn.close()