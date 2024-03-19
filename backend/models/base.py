import sqlite3
from uuid import uuid4


class BaseModel:
    def __init__(self, db_name, table_name, fields):
        self.db_name = db_name
        self.table_name = table_name
        self.fields = fields

    @staticmethod
    def connect(db_name):
        return sqlite3.connect(db_name)

    def save_to_db(self):
        conn = self.connect(self.db_name)
        cursor = conn.cursor()

        # Prepare the column names and placeholders for the query
        columns = ", ".join(self.fields.keys())
        placeholders = ", ".join(["?" for _ in self.fields])

        # Insert the data into the database
        query = f"INSERT INTO {self.table_name} ({columns}) VALUES ({placeholders})"
        cursor.execute(query, tuple(self.fields.values()))

        conn.commit()
        conn.close()

    @staticmethod
    def get_by_fields(db_name, table_name, fields):
        conn = BaseModel.connect(db_name)
        cursor = conn.cursor()

        # Build the SQL query dynamically based on the provided fields
        query = f"SELECT * FROM {table_name}"
        if len(dict.keys(fields)) > 0:
            query += " WHERE "
            conditions = [f"{key} = ?" for key in fields]
            query += " AND ".join(conditions)

        # Retrieve data from the database by specified fields
        cursor.execute(query, tuple(fields.values()))
        data = cursor.fetchall()

        conn.close()

        if data:
            if len(data) > 0:
                # Create an instance of the model and set the field values
                model_instances = [BaseModel(db_name,
                                             table_name, dict(zip((i[0] for i in cursor.description), j))) for j in data]
                return model_instances
            else:
                return None
        else:
            return None

    def update(self, id_field, update_fields):
        conn = BaseModel.connect(self.db_name)
        cursor = conn.cursor()

        # Build the SQL query for updating the fields
        set_clause = ", ".join([f"{key} = ?" for key in update_fields])
        query = f"UPDATE {self.table_name} SET {set_clause} WHERE {id_field[0]} = ?"

        # Execute the update query
        cursor.execute(query, tuple(update_fields.values()) + (id_field[1],))

        conn.commit()
        conn.close()

    def delete(self, id_field):
        conn = BaseModel.connect(self.db_name)
        cursor = conn.cursor()

        # Delete the record from the database
        cursor.execute(
            f"DELETE FROM {self.table_name} WHERE {id_field[0]}=?", (id_field[1],))

        conn.commit()
        conn.close()
