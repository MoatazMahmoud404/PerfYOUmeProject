from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Identity, Index, Integer, LargeBinary, Unicode, text
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Identity, Integer, Unicode, text
from sqlalchemy.orm import declarative_base, relationship
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Perfumes(db.Model):
    __tablename__ = 'Perfumes'

    perfume_Id = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    perfume_Name = Column(Unicode(255), nullable=False)
    perfume_Brand = Column(Unicode(255), nullable=False)
    perfume_rating = Column(Float(53), nullable=False)
    perfume_description = Column(Unicode(1000))
    perfume_Link = Column(Unicode(255))

    Recommendations = relationship(
        'Recommendations', back_populates='recommended_perfume')


class Roles(db.Model):
    __tablename__ = 'Roles'

    role_Id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    role_Name = Column(Unicode(50), nullable=False, unique=True)

    Accounts = relationship('Accounts', back_populates='Roles')


class Sysdiagrams(db.Model):
    __tablename__ = 'sysdiagrams'
    __table_args__ = (
        Index('UK_principal_name', 'principal_id', 'name', unique=True),
    )

    name = Column(Unicode(128), nullable=False)
    principal_id = Column(Integer, nullable=False)
    diagram_id = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    version = Column(Integer)
    definition = Column(LargeBinary)


class Accounts(db.Model):
    __tablename__ = 'Accounts'

    account_Id = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    username = Column(Unicode(100), nullable=False, unique=True)
    firstName = Column(Unicode(100), nullable=False)
    lastName = Column(Unicode(100), nullable=False)
    password = Column(Unicode(255), nullable=False)
    email = Column(Unicode(255), nullable=False, unique=True)
    isActive = Column(Boolean, nullable=False, server_default=text('((1))'))
    role_Id = Column(ForeignKey('Roles.role_Id'), nullable=False)
    createdAt = Column(DateTime, server_default=text('(getdate())'))
    updatedAt = Column(DateTime, server_default=text('(getdate())'))

    Roles = relationship('Roles', back_populates='Accounts')
    Questionnaires = relationship('Questionnaires', back_populates='Accounts')
    Recommendations = relationship(
        'Recommendations', back_populates='Accounts')
    Answers = relationship('Answers', back_populates='Accounts')


class Questionnaires(db.Model):
    __tablename__ = 'Questionnaires'

    questionnaire_Id = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    title = Column(Unicode(255), nullable=False)
    admin_Id = Column(ForeignKey('Accounts.account_Id'), nullable=False)
    isActive = Column(Boolean, nullable=False, server_default=text('((1))'))
    description = Column(Unicode(1000))
    createdAt = Column(DateTime, server_default=text('(getdate())'))
    updatedAt = Column(DateTime, server_default=text('(getdate())'))

    Accounts = relationship('Accounts', back_populates='Questionnaires')
    Questions = relationship('Questions', back_populates='Questionnaires')


class Recommendations(db.Model):
    __tablename__ = 'Recommendations'

    recommendation_Id = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    account_Id = Column(ForeignKey('Accounts.account_Id'), nullable=False)
    recommended_perfume_id = Column(ForeignKey(
        'Perfumes.perfume_Id'), nullable=False)
    recommendation_rating = Column(Float(53), nullable=False)
    recommendation_text = Column(Unicode(1000))
    createdAt = Column(DateTime, server_default=text('(getdate())'))

    Accounts = relationship('Accounts', back_populates='Recommendations')
    recommended_perfume = relationship(
        'Perfumes', back_populates='Recommendations')


class Questions(db.Model):
    __tablename__ = 'Questions'

    question_Id = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    questionnaire_Id = Column(ForeignKey(
        'Questionnaires.questionnaire_Id'), nullable=False)
    question_Text = Column(Unicode(255), nullable=False)
    question_Type = Column(Unicode(50), nullable=False)
    isRequired = Column(Boolean, nullable=False, server_default=text('((1))'))

    Questionnaires = relationship('Questionnaires', back_populates='Questions')
    Answers = relationship('Answers', back_populates='Questions')


class Answers(db.Model):
    __tablename__ = 'Answers'

    answer_Id = Column(Integer, Identity(
        start=1, increment=1), primary_key=True)
    account_Id = Column(ForeignKey('Accounts.account_Id'), nullable=False)
    question_Id = Column(ForeignKey('Questions.question_Id'), nullable=False)
    answer_Text = Column(Unicode(500), nullable=False)
    answer_Date = Column(DateTime, nullable=False,
                         server_default=text('(getdate())'))

    Accounts = relationship('Accounts', back_populates='Answers')
    Questions = relationship('Questions', back_populates='Answers')
