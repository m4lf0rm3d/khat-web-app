/*
=============================================================================
=============================================================================
FileName:  CreateDB.sql
CreatedBy:  AA (aa07729@st.habib.edu.pk)
CreatedOn:  07-March-2024 04:50 PM
Reason:    To created required tables for Khat project and add corresponding
      foreign and primary keys

============================= Update History ================================

-------------------------------
UpdatedBy:  XYZ
UpdatedOn:  09-March-2024 09:15 AM
Reason:    Lorem Ipsum
-------------------------------

=============================================================================
=============================================================================
*/

/*
==========================================
Create Table Scripts
==========================================
*/

CREATE TABLE [User]
  (
     [UserId]    INT NOT NULL IDENTITY(1, 1) UNIQUE,
     [Email]     NVARCHAR(100) NOT NULL UNIQUE,
     [Password]  VARCHAR(64) NOT NULL,
     [FirstName] NVARCHAR(25) NOT NULL,
     [LastName]  NVARCHAR(25),
     [GenderId]  INT NOT NULL,
     [UpdateOn]  DATETIME,
     [UpdatedBy]  INT,
     [CreatedOn] DATETIME NOT NULL,
     [CreatedBy] INT NOT NULL,
     [IsBlocked] BIT NOT NULL DEFAULT 0,
     [IsActive]  BIT NOT NULL DEFAULT 1,
     PRIMARY KEY ([UserId])
  );

CREATE TABLE [Companion]
  (
     [CompanionId]  INT NOT NULL IDENTITY(1, 1) UNIQUE,
     [CompanionAId] INT NOT NULL,
     [CompanionBId] INT NOT NULL,
     [UpdateOn]     DATETIME,
     [UpdatedBy]     INT,
     [CreatedOn]    DATETIME NOT NULL,
     [CreatedBy]    INT NOT NULL,
     [IsActive]     BIT NOT NULL DEFAULT 1,
     PRIMARY KEY ([CompanionId])
  );

CREATE TABLE [CompanionInvites]
  (
     [InviteId]      INT NOT NULL IDENTITY(1, 1) UNIQUE,
     [InviteLink]    UNIQUEIDENTIFIER NOT NULL UNIQUE,
     [SenderId]      INT NOT NULL,
     [ReceiverEmail] NVARCHAR(100) NOT NULL,
     [UpdateOn]      DATETIME,
     [UpdatedBy]      INT,
     [CreatedOn]     DATETIME NOT NULL,
     [CreatedBy]     INT NOT NULL,
     [IsAccepted]    BIT NOT NULL DEFAULT 0,
     [IsActive]      BIT NOT NULL DEFAULT 1,
     PRIMARY KEY ([InviteId])
  );

CREATE TABLE [CompanionSetting]
  (
     [CompanionSettingId] INT NOT NULL IDENTITY(1, 1) UNIQUE,
     [CompanionId]        INT NOT NULL,
     [KhatExchangeTime]   CHAR(8) NOT NULL,
     [UpdateOn]           DATETIME,
     [UpdatedBy]           INT,
     [CreatedOn]          DATETIME NOT NULL,
     [CreatedBy]          INT NOT NULL,
     [IsActive]           BIT NOT NULL DEFAULT 1,
     PRIMARY KEY ([CompanionSettingId])
  );

CREATE TABLE [Khat]
  (
     [KhatId]      INT NOT NULL IDENTITY(1, 1) UNIQUE,
     [CompanionId] INT NOT NULL,
     [SenderId]    INT NOT NULL,
     [ReceiverId]  INT NOT NULL,
     [UpdateOn]    DATETIME,
     [UpdatedBy]    INT,
     [CreatedOn]   DATETIME NOT NULL,
     [CreatedBy]   INT NOT NULL,
     [IsActive]    BIT NOT NULL DEFAULT 1,
     PRIMARY KEY ([KhatId])
  );

CREATE TABLE [KhatContent]
  (
     [KhatContentId]   INT NOT NULL IDENTITY(1, 1) UNIQUE,
     [KhatId]          INT NOT NULL,
     [KhatSectionText] NVARCHAR(4000) NOT NULL,
     [UpdateOn]        DATETIME,
     [UpdatedBy]        INT,
     [CreatedOn]       DATETIME NOT NULL,
     [CreatedBy]       INT NOT NULL,
     [IsActive]        BIT NOT NULL DEFAULT 1,
     PRIMARY KEY ([KhatContentId])
  );

CREATE TABLE [Gender]
  (
     [GenderId]  INT NOT NULL IDENTITY(1, 1) UNIQUE,
     [Name]      NVARCHAR(100) NOT NULL,
     [SortOrder] INT NOT NULL,
     [UpdateOn]  DATETIME,
     [UpdatedBy]  INT,
     [CreatedOn] DATETIME,
     [CreatedBy] INT,
     [IsActive]  BIT NOT NULL DEFAULT 1,
     PRIMARY KEY ([GenderId])
  );

/*
==========================================
Foreign Keys Relationships
==========================================
*/

-- User table
ALTER TABLE [User]
ADD CONSTRAINT [fk1_User_Gender_GenderId] 
FOREIGN KEY ([GenderId]) 
REFERENCES [Gender]([GenderId]);

ALTER TABLE [User]
ADD CONSTRAINT [fk2_User_UpdatedBy] 
FOREIGN KEY ([UpdatedBy]) 
REFERENCES [User]([UserId]);

ALTER TABLE [User]
ADD CONSTRAINT [fk3_User_CreatedBy] 
FOREIGN KEY ([CreatedBy]) 
REFERENCES [User]([UserId]);

-- Companion table
ALTER TABLE [Companion]
ADD CONSTRAINT [fk1_Companion_User_CompanionAId] 
FOREIGN KEY ([CompanionAId]) 
REFERENCES [User]([UserId]);

ALTER TABLE [Companion]
ADD CONSTRAINT [fk2_Companion_User_CompanionBId] 
FOREIGN KEY ([CompanionBId]) 
REFERENCES [User]([UserId]);

ALTER TABLE [Companion]
ADD CONSTRAINT [fk3_Companion_User_UpdatedBy] 
FOREIGN KEY ([UpdatedBy]) 
REFERENCES [User]([UserId]);

ALTER TABLE [Companion]
ADD CONSTRAINT [fk4_Companion_User_CreatedBy] 
FOREIGN KEY ([CreatedBy]) 
REFERENCES [User]([UserId]);

-- CompanionInvites table
ALTER TABLE [CompanionInvites]
ADD CONSTRAINT [fk1_CompanionInvites_User_SenderId] 
FOREIGN KEY ([SenderId]) 
REFERENCES [User]([UserId]);

ALTER TABLE [CompanionInvites]
ADD CONSTRAINT [fk2_CompanionInvites_User_UpdatedBy] 
FOREIGN KEY ([UpdatedBy]) 
REFERENCES [User]([UserId]);

ALTER TABLE [CompanionInvites]
ADD CONSTRAINT [fk3_CompanionInvites_User_CreatedBy] 
FOREIGN KEY ([CreatedBy]) 
REFERENCES [User]([UserId]);

-- CompanionSetting table
ALTER TABLE [CompanionSetting]
ADD CONSTRAINT [fk1_CompanionSetting_Companion_CompanionId] 
FOREIGN KEY ([CompanionId]) 
REFERENCES [Companion]([CompanionId]);

ALTER TABLE [CompanionSetting]
ADD CONSTRAINT [fk2_CompanionSetting_User_UpdatedBy] 
FOREIGN KEY ([UpdatedBy]) 
REFERENCES [User]([UserId]);

ALTER TABLE [CompanionSetting]
ADD CONSTRAINT [fk3_CompanionSetting_User_CreatedBy] 
FOREIGN KEY ([CreatedBy]) 
REFERENCES [User]([UserId]);

-- Khat table
ALTER TABLE [Khat]
ADD CONSTRAINT [fk1_Khat_Companion_CompanionId] 
FOREIGN KEY ([CompanionId]) 
REFERENCES [Companion]([CompanionId]);

ALTER TABLE [Khat]
ADD CONSTRAINT [fk2_Khat_User_SenderId] 
FOREIGN KEY ([SenderId]) 
REFERENCES [User]([UserId]);

ALTER TABLE [Khat]
ADD CONSTRAINT [fk3_Khat_User_ReceiverId] 
FOREIGN KEY ([ReceiverId]) 
REFERENCES [User]([UserId]);

ALTER TABLE [Khat]
ADD CONSTRAINT [fk4_Khat_User_UpdatedBy] 
FOREIGN KEY ([UpdatedBy]) 
REFERENCES [User]([UserId]);

ALTER TABLE [Khat]
ADD CONSTRAINT [fk5_Khat_User_CreatedBy] 
FOREIGN KEY ([CreatedBy]) 
REFERENCES [User]([UserId]);

-- KhatContent table
ALTER TABLE [KhatContent]
ADD CONSTRAINT [fk1_KhatContent_Khat_KhatId] 
FOREIGN KEY ([KhatId]) 
REFERENCES [Khat]([KhatId]);

ALTER TABLE [KhatContent]
ADD CONSTRAINT [fk2_KhatContent_User_UpdatedBy] 
FOREIGN KEY ([UpdatedBy]) 
REFERENCES [User]([UserId]);

ALTER TABLE [KhatContent]
ADD CONSTRAINT [fk3_KhatContent_User_CreatedBy] 
FOREIGN KEY ([CreatedBy]) 
REFERENCES [User]([UserId]);

-- Gender table
ALTER TABLE [Gender]
ADD CONSTRAINT [fk1_Gender_User_UpdatedBy] 
FOREIGN KEY ([UpdatedBy]) 
REFERENCES [User]([UserId]);

ALTER TABLE [Gender]
ADD CONSTRAINT [fk2_Gender_User_CreatedBy] 
FOREIGN KEY ([CreatedBy]) 
REFERENCES [User]([UserId]);
