from functools import wraps
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Models.OrmModels import db, Accounts
# first Opption


def role_requiredV1(role):
    def decorator(func):
        @wraps(func)
        @jwt_required()
        def wrapper(*args, **kwargs):
            current_user = get_jwt_identity()
            user = db.session.query(Accounts).filter_by(
                account_Id=current_user['id']).first()
            if user and user.role == role:
                return func(*args, **kwargs)
            return jsonify({"message": "Forbidden"}), 403
        return wrapper
    return decorator


def role_requiredV2(role):
    def decorator(func):
        @wraps(func)
        @jwt_required()
        def wrapper(*args, **kwargs):
            current_user = get_jwt_identity()
            if current_user['role'] == role:
                return func(*args, **kwargs)
            return jsonify({"message": "Forbidden"}), 403
        return wrapper
    return decorator
