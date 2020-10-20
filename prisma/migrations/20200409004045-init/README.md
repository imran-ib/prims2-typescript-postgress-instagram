# Migration `20200409004045-init`

This migration has been generated by Imran Irshad at 4/9/2020, 12:40:45 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Message" DROP CONSTRAINT IF EXiSTS "Message_RoomId_fkey",
DROP COLUMN "RoomId";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200409004045-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,104 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id    String  @id @default(cuid())
+  avatar          String?
+  username        String    @unique
+  email           String    @unique
+  firstName       String?   @default("")
+  lastName        String?   @default("")
+  fullName        String?
+  bio             String
+  loginSecret     String?
+  posts           Post[]    @relation("WrittenPosts")
+  likes           Like[]
+  comments        Comment[]
+  rooms           Room[]      @relation(references: [id])
+  followedBy      User[]      @relation("UserFollows", references: [id])
+  following       User[]      @relation("UserFollows", references: [id])
+  messegesSent     Message[]  @relation("Sender")
+  messegesReceived Message[]   @relation("Receiver")
+  createdAt       DateTime    @default(now())
+  updatedAt       DateTime    @updatedAt
+  
+}
+
+model Post {
+  id              String  @id @default(cuid())
+  location        String?
+  caption         String
+  author          User    @relation("WrittenPosts", fields: [authorId], references: [id])
+  authorId        String
+  files           File[]
+  likes           Like[]
+  comments        Comment[]
+  createdAt       DateTime @default(now())
+  updatedAt       DateTime @updatedAt
+}
+
+
+model Like {
+ id    String  @id @default(cuid())
+  user            User    @relation(fields: [userId], references: [id])
+  userId          String
+  post            Post @relation(fields: [postId], references: [id])
+  postId          String
+ createdAt        DateTime @default(now())
+  updatedAt       DateTime @updatedAt
+}
+
+
+model Comment {
+   id    String  @id @default(cuid())
+  text              String
+  author            User     @relation(fields: [authorId], references: [id])
+  authorId          String
+  post              Post      @relation(fields: [postId], references: [id])
+  postId            String
+  createdAt         DateTime @default(now())
+  updatedAt         DateTime @updatedAt
+}
+
+
+model File {
+   id    String  @id @default(cuid())
+  file      String
+  post Post @relation(fields: [postId], references: [id])
+  postId String
+  createdAt       DateTime @default(now())
+  updatedAt       DateTime @updatedAt
+}
+
+
+model Room {
+  id              String  @id @default(cuid())
+  participants    User[]   @relation(references: [id])
+  messeges        Message[] @relation(references:[id])
+  createdAt       DateTime @default(now())
+  updatedAt       DateTime @updatedAt
+}
+
+
+model Message {
+  id              String  @id @default(cuid())
+  room            Room    @relation(references: [id])
+  sender          User    @relation("Sender", fields: [senderId], references: [id])
+  receiver        User    @relation(name: "Receiver", fields: [receiverId], references: [id])
+  senderId        String
+  receiverId      String
+  text            String
+  createdAt       DateTime @default(now())
+  updatedAt       DateTime @updatedAt
+}
+
+ 
```

