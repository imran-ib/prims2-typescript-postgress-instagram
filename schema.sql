CREATE TABLE "public"."User" (
    "avatar" text   ,
    "bio" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" text  NOT NULL ,
    "firstName" text   DEFAULT '',
    "fullName" text   ,
    "id" text  NOT NULL ,
    "lastName" text   DEFAULT '',
    "loginSecret" text   ,
    "updatedAt" timestamp(3)  NOT NULL ,
    "username" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Post" (
    "authorId" text  NOT NULL ,
    "caption" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "location" text   ,
    "updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Like" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "postId" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL ,
    "userId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Comment" (
    "authorId" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "postId" text  NOT NULL ,
    "text" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."File" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" text  NOT NULL ,
    "id" text  NOT NULL ,
    "postId" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Room" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Message" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "receiverId" text  NOT NULL ,
    "senderId" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_RoomToUser" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE TABLE "public"."_UserFollows" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE UNIQUE INDEX "User.username" ON "public"."User"("username")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Message_receiverId" ON "public"."Message"("receiverId")

CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON "public"."_RoomToUser"("A","B")

CREATE  INDEX "_RoomToUser_B_index" ON "public"."_RoomToUser"("B")

CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "public"."_UserFollows"("A","B")

CREATE  INDEX "_UserFollows_B_index" ON "public"."_UserFollows"("B")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."File" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Message" ADD FOREIGN KEY ("senderId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Message" ADD FOREIGN KEY ("receiverId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_RoomToUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Room"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_RoomToUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_UserFollows" ADD FOREIGN KEY ("A")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_UserFollows" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
