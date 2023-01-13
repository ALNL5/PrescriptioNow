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
            creation_date DATE NOT NULL,
            role_id INTEGER NOT NULL
        );
        """,
        # drop the table
        """
        DROP TABLE users;
        """,
    ],
]
