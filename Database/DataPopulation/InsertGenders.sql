/*
=============================================================================
=============================================================================
FileName:  InsertGenders.sql
CreatedBy:  AA (aa07729@st.habib.edu.pk)
CreatedOn:  12-March-2024 02:24 PM
Reason:    To insert predefined geneders rows to Gender table for dropdown etc

============================= Update History ================================

-------------------------------
UpdatedBy:  XYZ
UpdatedOn:  09-March-2024 09:15 AM
Reason:    Lorem Ipsum
-------------------------------

=============================================================================
=============================================================================
*/
-- Enable explicit value insertion for the Gender table
SET IDENTITY_INSERT gender ON;

-- Insert Male with ID 1
INSERT INTO Gender
            (GenderId,
             NAME,
             SortOrder,
             UpdateOn,
             UpdatedBy,
             CreatedOn,
             CreatedBy,
             IsActive)
SELECT 1,
       'Male',
       1,
       NULL,
       NULL,
       Getdate(),
       NULL,
       1
WHERE  NOT EXISTS (SELECT 1
                   FROM   Gender
                   WHERE  GenderId = 1);

-- Insert Female with ID 2
INSERT INTO Gender
            (GenderId,
             NAME,
             SortOrder,
             UpdateOn,
             UpdatedBy,
             CreatedOn,
             CreatedBy,
             IsActive)
SELECT 2,
       'Female',
       2,
       NULL,
       NULL,
       Getdate(),
       NULL,
       1
WHERE  NOT EXISTS (SELECT 1
                   FROM   Gender
                   WHERE  GenderId = 2);

-- Insert Other with ID 3
INSERT INTO Gender
            (GenderId,
             NAME,
             SortOrder,
             UpdateOn,
             UpdatedBy,
             CreatedOn,
             CreatedBy,
             IsActive)
SELECT 3,
       'Other',
       3,
       NULL,
       NULL,
       Getdate(),
       NULL,
       1
WHERE  NOT EXISTS (SELECT 1
                   FROM   Gender
                   WHERE  GenderId = 3);

-- Disable explicit value insertion for the Gender table
SET IDENTITY_INSERT gender OFF; 