from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from Models.OrmModels import db, Accounts, Perfumes, Questionnaires, Recommendations, Questions, Answers, Roles
from Models.RoleDecorator import role_requiredV1, role_requiredV2
from sqlalchemy import text
from datetime import timedelta
from werkzeug.exceptions import NotFound, Unauthorized




import  config

import re
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)



CORS(app)  # Enables CORS for all routes and origins


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
    username = str(data.get('username', '')).strip()
    email = str(data.get('email', '')).strip()
    password = str(data.get('password', '')).strip()
    firstName = str(data.get('firstName', '')).strip()
    lastName = str(data.get('lastName', '')).strip()

    if username == '' or email == '' or password == '' or firstName == '' or lastName == '':
        return jsonify({"message": "Invalid inputs"}), 400

    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if re.match(email_pattern, email) is None:
        return jsonify({"message": "Invalid email"}), 400

    password_pattern = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"\'<>,.?/-])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"\'<>,.?/-]{8,}$'
    if re.match(password_pattern, password) is None:
        return jsonify({"message": "Invalid password"}), 400

    if Accounts.query.filter((Accounts.username == username) | (Accounts.email == email)).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = Accounts(username=username, email=email,
                        password=hashed_password, role_Id=2, firstName=firstName, lastName=lastName)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Account created successful"}), 201

# BY 0xMoataz


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        # Validate input
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({"message": "Email and password are required"}), 400

        # Fetch account
        account = Accounts.query.filter_by(email=email).first()
        if not account or not bcrypt.check_password_hash(account.password, password):
            return jsonify({"message": "Invalid email or password"}), 401

        # Fetch role
        role = Roles.query.filter_by(role_Id=account.role_Id).first()
        if not role:
            return jsonify({"message": "Role not found"}), 500

        # Generate token
        expires_in = timedelta(hours=12)
        access_token = create_access_token(
            identity={
                "id": account.account_Id,
                "username": account.username,
                "role": role.role_Name
            },
            expires_delta=expires_in
        )

        return jsonify({"message": "Login successful", "access_token": access_token}), 201
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

# BY Ahmed Farahat


@app.route('/Account/reset-password', methods=['PUT'])
@jwt_required()
def resetpaswword():
    current_user = get_jwt_identity()
    id = current_user['id']
    if id is None:
        return jsonify({"message": "Invalid user"}), 401
    account = Accounts.query.filter_by(account_Id=id).first()
    data = request.get_json()
    oldPassword = str(data.get('oldPassword')).strip()
    newPassword = str(data.get('newPassword')).strip()

    if (oldPassword == newPassword):
        return jsonify({"message": "THAT IS THE SAME PASSWORD"}), 400

    if not account or not bcrypt.check_password_hash(account.password, oldPassword):
        return jsonify({"message": "Invalid password"}), 401

    data = request.get_json()
    password_pattern = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"\'<>,.?/-])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"\'<>,.?/-]{8,}$'
    if re.match(password_pattern, newPassword) is None:
        return jsonify({"message": "Invalid password please enter following pattern  Password must be at least 8 characters long, include at least one letter, one number, and one special character."}), 400
    account.password = bcrypt.generate_password_hash(
        newPassword).decode('utf-8')
    db.session.commit()
    return jsonify({"message": "Password updated successfully"}), 200


@app.route('/Account/change-username', methods=['PUT'])
@jwt_required()
def change_username():
    current_user_id = get_jwt_identity()['id']
    data = request.get_json()

    new_username = str(data.get('newUsername', '')).strip()

    if new_username == '':
        return jsonify({"message": "Username cannot be empty"}), 400

    existing_user = Accounts.query.filter_by(username=new_username).first()
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    user = Accounts.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    updatedAt = user.updatedAt
    if not updatedAt:
        return jsonify({"message": "Registration date not found"}), 400

    current_date = datetime.utcnow()
    days_since_registration = (current_date - updatedAt).days

    if days_since_registration < 60:
        return jsonify({"message": "You must be registered for at least 60 days to change your username"}), 400
    user.username = new_username
    user.updatedAt = current_date
    db.session.commit()
    return jsonify({"message": "Username changed successfully"}), 200


@app.route('/questionaire', methods=['POST'])
@role_requiredV2('Admin')
def AddQuestionnaire():
    try:  
        data = request.get_json()
        title = str(data.get('title','')).strip()
        description = str(data.get('description',None)).strip()
        current_user = get_jwt_identity()
        admin_Id = int(current_user['id'])
        if(title==''):
            return jsonify({"message": "Ttile must be specefied"}), 400
        
        if(description!=None):
            newQuestionaire = Questionnaires(title=title,description=description,admin_Id=admin_Id)
        else:
            newQuestionaire = Questionnaires(title=title,admin_Id=admin_Id)
               
        db.session.add(newQuestionaire)
        db.session.commit()
        return jsonify({"message": "Questionnaire added successsfully"}), 201
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

@app.route('/questionaire/<int:questionnaire_Id>/questions', methods=['POST'])
@role_requiredV2('Admin')
def AddQuestions(questionnaire_Id):
    try:  
        data = request.get_json()
        # questionnaire_Id = int(data.get('questionnaire_Id',0))
        questions = data.get('questions',None)
        
        if(questionnaire_Id==0):
            return jsonify({"message": "Questionnaire ID must be specefied"}), 400

        questionnaire = Questionnaires.query.filter_by(questionnaire_Id=questionnaire_Id).first()
        if(questionnaire == None):
            return jsonify({"message": "Questionnaire does not exist"}), 404
        
        if not isinstance(questions, list) or len(questions)==0 :
            return jsonify({"message": "Questions must be an array and at least one question should be added"}), 400
                
        question_objects = []
        for question in questions:
            question_text = question.get('questionText')
            question_type = question.get('questionType')
            is_required = question.get('isRequired', True)

            if not question_text or not question_type:
                return jsonify({"message": "Each question must have text and type"}), 400

            question_obj = Questions(
                questionnaire_Id=questionnaire_Id,
                question_Text=question_text,
                question_Type=question_type,
                isRequired=is_required
            )
            question_objects.append(question_obj)
        
        db.session.bulk_save_objects(question_objects)
        db.session.commit()
        return jsonify({"message": "Questions added successsfully"}), 201
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500    

@app.route('/questionaire', methods=['GET'])
def GetAvailabeQuestionnaires():
    try:       
        take = request.args.get('take',10,type=int)
        skip = request.args.get('skip',0,type=int)
        if take<=0 or skip < 0:
            return jsonify({"message": "Take and skip must be greater than 0"}), 400

        questionnaires = Questionnaires.query.order_by(Questionnaires.questionnaire_Id.asc()).offset(skip).limit(take).all()
        if len(questionnaires) == 0:
            jsonify({"message": "No questionnaries found"}), 404

        result = []
        for q in questionnaires:
            result.append({
                'questionnaire_Id': q.questionnaire_Id,
                'title': q.title,
                'description': q.description,
                'createdAt': q.createdAt
            })
        return jsonify({"questionnaires": result}), 200       
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500   

@app.route('/questionaire/<int:questionnaire_Id>/questions', methods=['GET'])
@jwt_required()
def getQuestions(questionnaire_Id):
    try:
        if(questionnaire_Id<=0):
            return jsonify({"message": "questionnarie id must be more than 0"}), 400
        questions = Questions.query.filter_by(questionnaire_Id=questionnaire_Id).all()
        if len(questions) == 0:
            return jsonify({"message": "No questions found"}), 404
        result =[]
        for q in questions:
            result.append({
                'question_Id':q.question_Id,
                'question_Text':q.question_Text,
                'question_Type':q.question_Type,
                'isRequired':q.isRequired
            })
        return jsonify({"questions": result}), 200       
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500   
@app.route('/account/info', methods=['GET'])
@jwt_required()
def get_account_info():
    try:
        current_user = get_jwt_identity()
        if not current_user or ("id" not in current_user and "username" not in current_user):
            raise Unauthorized("Unauthorized or invalid token")
        account = None
        if "id" in current_user:
            account = Accounts.query.filter_by(account_Id=current_user['id']).first()
        elif "username" in current_user:
            account = Accounts.query.filter_by(username=current_user['username']).first()
        if not account:
            raise NotFound("Account not found")
        account_info = {
            "account_Id": account.account_Id,
            "username": account.username,
            "email": account.email,
            "firstName": account.firstName,
            "lastName": account.lastName,
            "role_Id": account.role_Id,
            "createdAt": account.createdAt,
            "updatedAt": account.updatedAt
        }
        return jsonify({"account": account_info}), 200
    except Unauthorized as e:
        return jsonify({"message": str(e)}), 401
    except NotFound as e:
        return jsonify({"message": str(e)}), 404
    except Exception as e:
        return jsonify({"message": "An unexpected error occurred", "error": str(e)}), 500

@app.route('/questionnaires/answered')
@jwt_required()
def get_answered_questionnaires():
    current_user = get_jwt_identity()
    account_id  = current_user['id']

    answered_questionnaires = (
        db.session.query(Questionnaires)
        .join(Questions, Questions.questionnaire_Id == Questionnaires.questionnaire_Id)
        .join(Answers, Answers.question_Id == Questions.question_Id)
        .filter(Answers.account_Id == account_id)
        .distinct() 
        .all()
    )

    questionnaires = [
    {
        'questionnaire_Id': q.questionnaire_Id,
        'title': q.title,
        'description': q.description,
        'createdAt': q.createdAt.strftime('%Y-%m-%d %H:%M:%S') if q.createdAt else None,
        'isActive':q.isActive
    }
    for q in answered_questionnaires
]

    if len(questionnaires) == 0:
        return jsonify({"message": "No answered questionnaires found"}), 404
    
    return jsonify({"questionnaires": questionnaires}), 200    

if __name__ == '__main__':
    app.run(debug=True)