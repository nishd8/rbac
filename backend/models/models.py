from uuid import uuid4
from .base import BaseModel
from .constants import MAIN_DB, RBAC_DB


class Users(BaseModel):
    def __init__(self, email: str, password: str):
        fields = {
            "email": email,
            "password": password,
            "r_id": ''
        }
        super().__init__(MAIN_DB, self.__class__.__name__.lower(), fields)


class Features(BaseModel):
    def __init__(self, name, description):
        fields = {
            "id": f"feat-{str(uuid4())}",
            "name": name,
            "description": description
        }
        super().__init__(RBAC_DB, self.__class__.__name__.lower(), fields)


class Roles(BaseModel):
    def __init__(self, name: str):
        fields = {
            "id": f"role-{str(uuid4())}",
            "name": name,
            "features": ""
        }
        super().__init__(RBAC_DB, self.__class__.__name__.lower(), fields)


if __name__ == '__main__':
    # 1. Create a user and save to the database
    #new_user = Users(email="example@example.com", password="password123")
    # new_user.save_to_db()

    # 2. Retrieve a user by email
    fields_to_search = {"email": "example@example.com"}
    retrieved_user = BaseModel.get_by_fields(
        "main.db", "users", fields_to_search)
    if retrieved_user:
        print(retrieved_user.fields)
    # 3. Update user information
    # update_fields = {"password": "newpassword"}
    # retrieved_user.update(update_fields)

    # 4. Delete user
    retrieved_user.delete()
