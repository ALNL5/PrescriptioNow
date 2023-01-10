steps = [
    [
        ## create the table
        """
        CREATE TABLE deliveries (
            id SERIAL PRIMARY KEY NOT NULL,
            prescription_id INTEGER NOT NULL,
            employee_id INTEGER NOT NULL,
            customer_id INTEGER NOT NULL
        );
        """,
        ## drop the table
        """
        DROP TABLE deliveries;
        """
    ]
]
