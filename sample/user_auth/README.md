# User auth

 Version: 0.9.2

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2024/04/27

 update :

***

user auth,  Turso sample

***
### Setup
* .env
* TURSO_AUTH_TOKEN, TURSO_URL set

```
VITE_APP_NAME="express_44"
TURSO_AUTH_TOKEN=""
TURSO_URL="libsql://"
```

* user table
```
DROP TABLE IF EXISTS User;
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```
***

