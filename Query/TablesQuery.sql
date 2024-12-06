CREATE TABLE
    Roles (
        role_Id INT IDENTITY (1, 1) PRIMARY KEY,
        role_Name NVARCHAR (50) NOT NULL UNIQUE
    );

GO
CREATE TABLE
    Accounts (
        account_Id INT IDENTITY (1, 1) PRIMARY KEY,
        username NVARCHAR (100) NOT NULL UNIQUE,
        firstName NVARCHAR (100) NOT NULL,
        lastName NVARCHAR (100) NOT NULL,
        password NVARCHAR (255) NOT NULL,
        email NVARCHAR (255) NOT NULL UNIQUE,
        createdAt DATETIME DEFAULT GETDATE (),
        updatedAt DATETIME DEFAULT GETDATE (),
        isActive BIT DEFAULT 1 NOT NULL,
        role_Id INT NOT NULL,
        CONSTRAINT FK_Accounts_Role FOREIGN KEY (role_Id) REFERENCES Roles (role_Id)
    );

GO
CREATE TABLE
    Questionnaires (
        questionnaire_Id INT IDENTITY (1, 1) PRIMARY KEY,
        title NVARCHAR (255) NOT NULL,
        description NVARCHAR (1000),
        createdAt DATETIME DEFAULT GETDATE (),
        updatedAt DATETIME DEFAULT GETDATE (),
        admin_Id INT NOT NULL,
        isActive BIT DEFAULT 1 NOT NULL,
        CONSTRAINT FK_Questionnaires_Admin_CreatedBy FOREIGN KEY (admin_Id) REFERENCES Accounts (account_Id)
    );

GO
CREATE TABLE
    Questions (
        question_Id INT IDENTITY (1, 1) PRIMARY KEY,
        questionnaire_Id INT NOT NULL,
        question_Text NVARCHAR (255) NOT NULL,
        question_Type NVARCHAR (50) NOT NULL,
        isRequired BIT DEFAULT 1 NOT NULL,
        CONSTRAINT FK_Question_Questionnaires FOREIGN KEY (questionnaire_Id) REFERENCES Questionnaires (questionnaire_Id)
    );

GO
CREATE TABLE
    Answers (
        answer_Id INT IDENTITY (1, 1) PRIMARY KEY,
        account_Id INT NOT NULL,
        question_Id INT NOT NULL,
        answer_Text NVARCHAR (500) NOT NULL,
        answer_Date DATETIME DEFAULT GETDATE () NOT NULL,
        CONSTRAINT FK_Answer_Question FOREIGN KEY (question_Id) REFERENCES Questions (question_Id),
        CONSTRAINT FK_answer_account FOREIGN KEY (account_Id) REFERENCES Accounts (account_Id)
    );

GO
CREATE TABLE
    Perfumes (
        perfume_Id INT IDENTITY (1, 1) PRIMARY KEY,
        perfume_Name NVARCHAR (255) NOT NULL,
        perfume_Brand NVARCHAR (255) NOT NULL,
        perfume_description NVARCHAR (1000),
        perfume_Link NVARCHAR (255),
        perfume_rating FLOAT NOT NULL,
        CONSTRAINT chk_Rating CHECK (
            perfume_rating >= 1
            AND perfume_rating <= 5
        )
    );

GO
CREATE TABLE
    Recommendations (
        recommendation_Id INT IDENTITY (1, 1) PRIMARY KEY,
        account_Id INT NOT NULL,
        recommended_perfume_id INT NOT NULL,
        recommendation_text NVARCHAR (1000),
        recommendation_rating FLOAT NOT NULL,
        createdAt DATETIME DEFAULT GETDATE (),
        CONSTRAINT chk_Recommendation_Rating CHECK (
            recommendation_rating >= 1
            AND recommendation_rating <= 5
        ),
        CONSTRAINT FK_Recommendation_Account FOREIGN KEY (account_Id) REFERENCES Accounts (account_Id),
        CONSTRAINT FK_Recommendation_Perfume FOREIGN KEY (recommended_perfume_id) REFERENCES Perfumes (perfume_Id)
    );

GO