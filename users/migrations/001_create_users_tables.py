steps = [
    [
        # create the table
        """
        CREATE TABLE roles (
            id SERIAL PRIMARY KEY NOT NULL,
            role VARCHAR(255) NOT NULL
        );
        """,
        # drop the table
        """
        DROP TABLE roles;
        """,
    ],
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role_id INTEGER DEFAULT 0
        );
        """,
        # drop the table
        """
        DROP TABLE users;
        """,
    ],
]
