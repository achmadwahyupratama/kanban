# kanban-server
Kanban API
**Achmad Wahyu pratama**
*Hacktiv8 RMT-011*

## POST /register
* Request Header
   
    None

* Request Body 

    ```
    { 
        "username": "<body.username>", //string
        "email": "<body.email>", //string
        "password": "<body.password>" //string
    }
    ```

* Success Response:

    * Code: 201
    * Content:
        ```
        { 
            "id": "<User.id>", //integer
            "username": "<User.username>", //string
            "email": "<User.email>" //string
        }
        ```
    
* Error Responses:

    Code:400 EMAIL UNIQUE CONSTRAINT ERROR
    * Content:
        ```
        { "errors": [ { "message": "This email already exist" } ] }
        ```

    Code:400 USERNAME UNIQUE CONSTRAINT ERROR
    * Content:
        ```
        { "errors": [ { "message": "Username already Exist" } ] }
        ```


    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "<key> can not be blank" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```


## POST /login
* Request Header
   
    None

* Request Body 

    ```
    { 
        "email": "<body.email>", //string
        "password": "<body.password>" //string
    }
    ```

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            acces_token: "<user.token...>" //string
        }
        ```
    
* Error Responses:

    Code:404 NOT FOUND ERROR (change status to 400:VALIDATION ERROR for security reason)
    * Content:
        ```
        { "errors":  { "message": "invalid email and password" }  }
        ```

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "invalid email and password" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```


## POST /googlelogin
* Request Header
   
    None

* Request Body 

    ```
    { 
        "googleIdToken": "<body.idToken>"
    }
    ```

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            acces_token: "<user.token...>"
        }
        ```
    
* Error Responses:

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```



## POST /categories
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>" //string
    }
    ```

* Request Body 

    ```
    { 
        "categoryName": <body.categoryName>, //string
    }
    ```

* Success Response:

    * Code: 201
    * Content:
        ```
        { 
            "id": 1, //integer
            "categoryName": "done" //string
        }
        ```
    
* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "<key> required" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```


## DELETE /categories/:id
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>" //string
    }
    ```


* Request Params 

   * categoryId : integer


* Request Body 

    None


* Success Response:

    * Code: 200
    * Content:
        ```
        { "message" : 'deleted category with id <categoryId>' }
        ```


* Error Responses:

    Code:404 NOT FOUND ERROR
    * Content:
        ```
        { "errors":  { "message": "Category with id <categoryId> not found" }  }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```



## POST /tasks
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * none

* Request Body 

    ```
    { 
        "title": "<req.body.title>", //string
        "status": "<req.body.status>", //string
        "description": "<req.body.description> " , //string
        "CategoryId": "<req.body.CategoryId>" //integer
    }
    ```
   

* Success Response:

    * Code: 201
    * Content:
        ```
        { 
            "title": "created title", //string
            "status": "created status", //string
            "description": "created desc" , //string
            "CategoryId": "number(selected CategoryId)" //integer
        }
        ```

* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```




## GET /tasks/:categoryId/:taskId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>" //string
    }
    ```

* Request Param
   * categoryId //integer
   * taskId //integer


* Request Body 
    
    None

* Success Response:

    * Code: 200
    * Content:
        ```
            {
                "id": 1,
                "title": "Kanban",
                "status": "continue",
                "description": "creating server",
                "UserId": 3,
                "CategoryId": 1,
                "createdAt": "2021-05-04T23:07:01.158Z",
                "updatedAt": "2021-05-04T23:07:01.158Z",
                "Category": {
                    "id": 1,
                    "categoryName": "Backlog",
                    "createdAt": "2021-05-04T22:16:15.258Z",
                    "updatedAt": "2021-05-04T22:16:15.258Z"
                }
            }
        ```

* Error Responses:

    Code:404 NOT FOUND ERROR
    * Content:
        ```
        { "errors":  { "message": "Data with id <taskId> not found" }  }
        ```


    Code:500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```



## GET /tasks/
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>" //string
    }
    ```

* Request Param
   * none

* Request Body

    None

* Success Response:

    * Code: 200 //returning all categories include their tasks
    * Content:
        ```
        [
            {
                "id": 1,
                "categoryName": "Backlog",
                "createdAt": "2021-05-04T22:16:15.258Z",
                "updatedAt": "2021-05-04T22:16:15.258Z",
                "Tasks": [
                    {
                        "id": 17,
                        "title": "Kanban",
                        "status": "continue",
                        "description": "creating server",
                        "UserId": 3,
                        "CategoryId": 1,
                        "createdAt": "2021-05-08T08:01:37.419Z",
                        "updatedAt": "2021-05-08T08:01:37.419Z"
                    }, ...
                ]
            },
            {
                "id": 2,
                "categoryName": "Product",
                "createdAt": "2021-05-04T22:18:17.697Z",
                "updatedAt": "2021-05-04T22:18:17.697Z",
                "Tasks": [
                    {
                        "id": 11,
                        "title": "Kanban",
                        "status": "pending",
                        "description": "deploying Kanban to heroku and firebase",
                        "UserId": 3,
                        "CategoryId": 2,
                        "createdAt": "2021-05-08T07:32:36.884Z",
                        "updatedAt": "2021-05-08T07:32:36.884Z"
                    }
                ]
            },...
        ]
        ```

* Error Responses:

    Code:500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```



## GET /tasks/:categoryId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"
    }
    ```

* Request Param
   * categoryId // integer

* Request Body

    None

* Success Response:

    * Code: 200 //returning all tasks with specified category
    * Content:
        ```
        [
            {
                "id": 1,
                "title": "Kanban",
                "status": "continue",
                "description": "Creating server",
                "UserId": 3,
                "CategoryId": 1,
                "createdAt": "2021-05-04T23:07:01.158Z",
                "updatedAt": "2021-05-04T23:44:23.938Z",
                "Category": {
                    "id": 1,
                    "categoryName": "Backlog",
                    "createdAt": "2021-05-04T22:18:25.775Z",
                    "updatedAt": "2021-05-04T22:18:25.775Z"
                }
            },...
        ]
        ```

* Error Responses:

    Code:500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```



## PUT /tasks/:taskId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"
    }
    ```

* Request Param
   * taskId : integer

* Request Body 

    ```
        { 
            "title": "<req.body.title>", //string
            "status": "<req.body.status>", //string
            "description": "<req.body.description> " , //string
            "CategoryId": "<req.body.CategoryId>" //integer
        }
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
            {
                "id": 1,
                "title": "Kanban edited",
                "status": "done",
                "description": "Creating server edited",
                "UserId": 3,
                "CategoryId": 4,
                "createdAt": "2021-05-04T23:07:01.158Z",
                "updatedAt": "2021-05-04T23:44:23.938Z",
                "Category": {
                    "id": 4,
                    "categoryName": "Done",
                    "createdAt": "2021-05-04T22:18:25.775Z",
                    "updatedAt": "2021-05-04T22:18:25.775Z"
                }
            }
        ```

* Error Responses:

    Code:404 NOT FOUND ERROR
    * Content:
        ```
        { "errors":  { "message": "Data with id <taskId> not found" }  }
        ```

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "Invalid input" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```


## PATCH /tasks/:id
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * taskId : integer

* Request Body 
    ```
    { 
        "CategoryId": "<req.body.CategoryId>"//integer
    }
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
       {
            "id": 1,
            "title": "Kanban",
            "status": "continue",
            "description": "creating server",
            "UserId": 3,
            "CategoryId": 3,
            "createdAt": "2021-05-04T23:56:45.678Z",
            "updatedAt": "2021-05-04T23:57:52.428Z"
        }
        ```

* Error Responses:
    Code:404 NOT FOUND ERROR
    * Content:
        ```
        { "errors":  { "message": "Data with id <taskId> not found" }  }
        ```

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "Invalid input" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```




## DELETE /tasks/:id
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>" //string
    }
    ```


* Request Params 

   * taskId : integer


* Request Body 

    None


* Success Response:

    * Code: 200
    * Content:
        ```
        { "message" : 'todo success to delete' }
        ```


* Error Responses:

    Code:404 NOT FOUND ERROR
    * Content:
        ```
        { "errors":  { "message": "Task id: <taskId> success to delete" }  }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```
