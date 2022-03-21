module.exports = {
    "scalars": [
        0,
        2,
        4,
        6,
        7,
        9
    ],
    "types": {
        "DateTime": {},
        "Mutation": {
            "createPost": [
                3,
                {
                    "content": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "String": {},
        "Post": {
            "author": [
                8
            ],
            "author_id": [
                2
            ],
            "content": [
                2
            ],
            "created_at": [
                0
            ],
            "id": [
                4
            ],
            "title": [
                2
            ],
            "updated_at": [
                0
            ],
            "__typename": [
                2
            ]
        },
        "Int": {},
        "Query": {
            "posts": [
                3,
                {
                    "sortBy": [
                        7
                    ]
                }
            ],
            "users": [
                8,
                {
                    "sortBy": [
                        7
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Role": {},
        "SortOrder": {},
        "User": {
            "created_at": [
                0
            ],
            "email": [
                2
            ],
            "id": [
                2
            ],
            "image": [
                2
            ],
            "name": [
                2
            ],
            "posts": [
                3
            ],
            "role": [
                6
            ],
            "updated_at": [
                0
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}