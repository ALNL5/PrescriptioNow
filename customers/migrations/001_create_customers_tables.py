steps = [
    [
        # create the table
        """
        CREATE TABLE customers (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            dob DATE NOT NULL,
            phone VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            address_1 VARCHAR(255) NOT NULL,
            address_2 VARCHAR(255) NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            user_id INTEGER NOT NULL
        );
        """,
        # drop the table
        """
        DROP TABLE customers;
        """,
    ]
]
