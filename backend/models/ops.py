from .constants import MAIN_DB, RBAC_DB
from .models import Users, Features, Roles


def create_user(email: str, password: str):
    user = Users(email, password)
    try:
        user.save_to_db()
        return True
    except:
        return False


def get_all_users():
    users = Users.get_by_fields(MAIN_DB, "users", {})
    return [user.fields for user in users]


def get_user_by_email(email: str):
    user = Users.get_by_fields(MAIN_DB, "users", {"email": email})
    return user


def update_user(email: str, data: dict):
    user = get_user_by_email(email)
    if user:
        try:
            user[0].update(["email", email], data)
            return True
        except:
            return False
    return False


def delete_user(email: str):
    user = get_user_by_email(email)
    if user:
        Users.delete(["email", email])


def create_role(name: str):
    role = Roles(name.strip())
    try:
        role.save_to_db()
        return True
    except:
        return False


def get_all_roles():
    roles = Roles.get_by_fields(RBAC_DB, "roles", {})
    if roles:
        return [role.fields for role in roles]
    return []


def get_role_by_id(id: str):
    role = Roles.get_by_fields(RBAC_DB, "roles", {"id": id})
    return role


def update_role_features(id: str, features: []):
    role = get_role_by_id(id)
    if role:
        try:
            role_features = role[0].fields.get("features", "").split(',')
            print(role_features)
            for feature in features:
                if feature in role_features:
                    role_features.remove(feature)
                else:
                    role_features.append(feature)
            role_features = ','.join(role_features)
            role[0].update(["id", id], {"features": role_features})
            return True
        except Exception as e:
            print(e)
            return False


def delete_role(id: str):
    role = get_role_by_id(id)
    if role:
        try:
            role[0].delete(["id", id])
            return True
        except:
            return False
    return False


def create_feature(name: str, description: str):
    feature = Features(name.strip(), description)
    try:
        feature.save_to_db()
        return True
    except:
        return False


def get_all_features():
    features = Features.get_by_fields(RBAC_DB, "features", {})
    if features:
        return [feature.fields for feature in features]
    return []


def get_feature_by_id(id: str):
    feature = Features.get_by_fields(RBAC_DB, "features", {"id": id})
    return feature


def update_feature(id: str, data: dict):
    feature = get_feature_by_id(id)
    if feature:
        try:
            feature[0].update(
                ["id", id], data)
            return True
        except:
            return False
    return False


def delete_feature(id: str):
    feature = get_feature_by_id(id)
    if feature:
        try:
            feature[0].delete(["id", id])
            return True
        except:
            return False
    return False
