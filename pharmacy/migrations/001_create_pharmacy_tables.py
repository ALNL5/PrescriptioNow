steps = [
    [
        ## create the table
        """
        CREATE TABLE employees (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            user_id INTEGER NOT NULL
        );

        """,
        ## drop the table
        """
        DROP TABLE employees;
        """
    ],
    [
        """
        CREATE TABLE prescriptions (
            id SERIAL PRIMARY KEY NOT NULL,
            rx_number VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            refills_as_written INTEGER NOT NULL,
            date_refills_expire DATE NOT NULL,
            date_requested DATE NULL,
            date_filled DATE NULL,
            date_delivered DATE NULL,
            employee_id INTEGER NOT NULL,
            customer_id INTEGER NOT NULL
        );

        """,
        ## drop the table
        """
        DROP TABLE prescriptions;
        """
    ]
]
