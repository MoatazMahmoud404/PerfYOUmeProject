INSERT INTO
    Perfumes (
        perfume_Name,
        perfume_Brand,
        perfume_description,
        perfume_rating,
        perfume_Link
    )
VALUES
    (
        'Chanel No. 5',
        'Chanel',
        'A timeless floral fragrance with notes of jasmine, rose, and sandalwood. Perfect for any occasion.',
        4.8,
        'https://chanel.com/no5'
    ),
    (
        'Dior Sauvage',
        'Dior',
        'A fresh, spicy fragrance with notes of Calabrian bergamot, Sichuan pepper, and Ambroxan. Bold and masculine.',
        4.5,
        'https://dior.com/sauvage'
    ),
    (
        'Gucci Bloom',
        'Gucci',
        'A floral, feminine scent with notes of jasmine, tuberose, and Rangoon creeper. A fragrance for the modern woman.',
        4.6,
        'https://gucci.com/bloom'
    ),
    (
        'Tom Ford Black Orchid',
        'Tom Ford',
        'A rich and luxurious fragrance with dark floral notes, including black orchid and spice. Ideal for evening wear.',
        4.7,
        'https://tomford.com/black-orchid'
    ),
    (
        'Yves Saint Laurent Black Opium',
        'Yves Saint Laurent',
        'A sweet, warm fragrance with coffee, vanilla, and white flowers. The perfect balance of energizing and seductive.',
        4.4,
        'https://ysl.com/black-opium'
    ),
    (
        'Creed Aventus',
        'Creed',
        'A sophisticated fragrance with notes of pineapple, birch, and musk. A signature scent for success and elegance.',
        4.9,
        'https://creed.com/aventus'
    ),
    (
        'Viktor & Rolf Flowerbomb',
        'Viktor & Rolf',
        'A floral explosion of jasmine, orange flower, and patchouli. A fragrance for those who love bold, feminine scents.',
        4.5,
        'https://viktor-rolf.com/flowerbomb'
    ),
    (
        'Jo Malone London Peony & Blush Suede',
        'Jo Malone London',
        'A fresh and elegant floral fragrance with peony, red apple, and suede notes. Delicate and luxurious.',
        4.6,
        'https://jomalone.com/peony-blush-suede'
    ),
    (
        'Bleu de Chanel',
        'Chanel',
        'A fresh and woody fragrance with citrus, sandalwood, and cedar notes. A sophisticated scent for the modern man.',
        4.7,
        'https://chanel.com/bleu-de-chanel'
    ),
    (
        'Armani Code',
        'Armani',
        'A warm, spicy fragrance with notes of bergamot, tonka bean, and leather. The ideal scent for evening events.',
        4.3,
        'https://armani.com/code'
    ),
    (
        'Lancôme La Vie Est Belle',
        'Lancôme',
        'A sweet and elegant fragrance with notes of iris, patchouli, and gourmand. Perfect for making an impression.',
        4.6,
        'https://lancome.com/la-vie-est-belle'
    ),
    (
        'Dolce & Gabbana Light Blue',
        'Dolce & Gabbana',
        'A fresh, fruity fragrance with notes of Sicilian lemon, apple, and cedarwood. A perfect summer scent.',
        4.4,
        'https://dolcegabbana.com/light-blue'
    ),
    (
        'Bvlgari Omnia Crystalline',
        'Bvlgari',
        'A fresh and floral fragrance with notes of bamboo, lotus flower, and tea. A fragrance of purity and elegance.',
        4.5,
        'https://bvlgari.com/omnia-crystalline'
    ),
    (
        'Paco Rabanne 1 Million',
        'Paco Rabanne',
        'A bold, spicy fragrance with notes of blood orange, cinnamon, and leather. A fragrance for the confident man.',
        4.2,
        'https://pacorabanne.com/1-million'
    ),
    (
        'Hermès Terre d’Hermès',
        'Hermès',
        'A woody and citrusy fragrance with notes of orange, vetiver, and cedar. A fragrance for the sophisticated and adventurous.',
        4.8,
        'https://hermes.com/terre-d-hermes'
    ),
    (
        'Chloé Eau de Parfum',
        'Chloé',
        'A fresh and floral fragrance with notes of peony, rose, and amber. A classic and romantic scent.',
        4.7,
        'https://chloe.com/eau-de-parfum'
    );

------------
INSERT INTO
    Roles (role_Name)
VALUES
    ('Admin'),
    ('User'),
    ('Guest');

------------
-- Inserting Fake Accounts
INSERT INTO
    Accounts (
        username,
        firstName,
        lastName,
        password,
        email,
        role_Id
    )
VALUES
    (
        'john_doe',
        'John',
        'Doe',
        'password123',
        'john.doe@example.com',
        1
    ),
    (
        'jane_smith',
        'Jane',
        'Smith',
        'password456',
        'jane.smith@example.com',
        2
    ),
    (
        'emily_jones',
        'Emily',
        'Jones',
        'password789',
        'emily.jones@example.com',
        3
    ),
    (
        'michael_brown',
        'Michael',
        'Brown',
        'password101',
        'michael.brown@example.com',
        2
    ),
    (
        'olivia_davis',
        'Olivia',
        'Davis',
        'password102',
        'olivia.davis@example.com',
        1
    );

-- Inserting Fake Questionnaires
INSERT INTO
    Questionnaires (title, description, admin_Id)
VALUES
    (
        'Fragrance Preferences Survey',
        'A questionnaire to help us understand your fragrance preferences and lifestyle for the perfect perfume match.',
        1
    ),
    (
        'Personality Scent Match',
        'Discover which fragrance matches your personality traits by answering a few questions.',
        2
    );

-- Inserting Fake Questions for the Fragrance Preferences Survey
INSERT INTO
    Questions (questionnaire_Id, question_Text, question_Type)
VALUES
    (
        1,
        'What is your favorite fragrance family?',
        'Multiple Choice'
    ),
    (
        1,
        'Do you prefer floral or woody scents?',
        'Multiple Choice'
    ),
    (
        1,
        'What is your primary purpose for buying a fragrance?',
        'Text'
    ),
    (
        1,
        'How would you describe your personality?',
        'Text'
    );

-- Inserting Fake Questions for the Personality Scent Match Questionnaire
INSERT INTO
    Questions (questionnaire_Id, question_Text, question_Type)
VALUES
    (
        2,
        'How do you feel about citrus scents?',
        'Multiple Choice'
    ),
    (
        2,
        'Are you more drawn to fresh or deep fragrances?',
        'Multiple Choice'
    ),
    (
        2,
        'What is your favorite time of the day to wear perfume?',
        'Text'
    ),
    (
        2,
        'How adventurous are you with trying new scents?',
        'Text'
    );