from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from Models.OrmModels import db, Accounts, Perfumes, Questionnaires, Recommendations, Questions, Answers, Roles
from Models.RoleDecorator import role_requiredV1, role_requiredV2
from sqlalchemy import text
from datetime import timedelta
import config
import re

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'a5e5173eda6e532e03b460f37e63d7817213aad85e34975ba8e4660dd74dacb6'

db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.route('/database/test', methods=['GET'])
@role_requiredV2('User')
def test_db_connection():
    try:
        result = db.session.execute(text('SELECT 1')).scalar()
        if result == 1:
            return jsonify({"message": "Database connection successful"}), 200
        else:
            return jsonify({"message": "Database connection failed"}), 500
    except Exception as e:
        return jsonify({"message": f"Database connection error: {str(e)}"}), 500


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = str(data.get('username','')).strip()
    email = str(data.get('email','')).strip()
    password = str(data.get('password','')).strip()
    firstName = str(data.get('firstName','')).strip()
    lastName =  str(data.get('lastName','')).strip()

    if username=='' or email=='' or password=='' or firstName=='' or lastName=='':
        return jsonify({"message": "Invalid inputs"}), 400
    
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if re.match(email_pattern, email) is  None:
        return jsonify({"message": "Invalid email"}), 400
    
    password_pattern = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"\'<>,.?/-])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"\'<>,.?/-]{8,}$'
    if re.match(password_pattern, password) is None:
        return jsonify({"message": "Invalid password"}), 400


    if Accounts.query.filter((Accounts.username == username) | (Accounts.email == email)).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = Accounts(username=username, email=email,
                        password=hashed_password,role_Id=1,firstName=firstName,lastName=lastName)
  
    db.session.add(new_user)
    db.session.commit()


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    account = Accounts.query.filter_by(email=email).first()
    if not account or not bcrypt.check_password_hash(account.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    role = Roles.query.filter_by(role_Id=account.role_Id).first()

    expires_in = timedelta(hours=12)
    access_token = create_access_token(identity={
                                       "id": account.account_Id, "username": account.username, "role": role.role_Name}, expires_delta=expires_in)
    return jsonify({"message": "Login successful", "access_token": access_token}), 200


if __name__ == '__main__':
    app.run(debug=True)
