/*
=============================================================================
=============================================================================
FileName:	usp_AcceptCompanionInvite.sql
CreatedBy:  AA (aa07729@st.habib.edu.pk)
CreatedOn:  14-March-2024 02:23 PM
Reason:		This SP runs when a user accepts a companion invite. It assumes
			that it is verified that the user belongs to that GUID

============================= Update History ================================

-------------------------------
UpdatedBy:  XYZ
UpdatedOn:  09-March-2024 09:15 AM
Reason:    Lorem Ipsum
-------------------------------

=============================================================================
=============================================================================
*/
DROP PROCEDURE IF EXISTS usp_acceptcompanioninvite;
GO

-- Creating a stored procedure to accept a companion invite
CREATE PROCEDURE usp_AcceptCompanionInvite
  @InviteLinkId UNIQUEIDENTIFIER
AS
BEGIN
    -- Declarations
    DECLARE @AcceptingUserId INT,
            @SenderUserId INT,
            @ReceiverEmail NVARCHAR(100),
            @CompanionId INT;

    -- Retrieving sender details from CompanionInvites table
    SELECT @SenderUserId =  SenderId,
           @ReceiverEmail = ReceiverEmail
    FROM   [CompanionInvites]
    WHERE  InviteLink = @InviteLinkId;

    -- Retrieving accepting user's ID from User table using email
    SELECT @AcceptingUserId = UserId
    FROM   [User]
    WHERE  Email = @ReceiverEmail;

    -- Updating CompanionInvites to mark the invite as accepted
    UPDATE [CompanionInvites]
    SET    IsAccepted = 1,
           UpdatedBy = @AcceptingUserId,
           UpdateOn = CURRENT_TIMESTAMP
	WHERE  InviteLink = @InviteLinkId;

    -- Inserting a record into Companion table
    INSERT INTO [Companion] VALUES
                (
                    @AcceptingUserId,
                    @SenderUserId,
                    NULL,
                    NULL,
                    CURRENT_TIMESTAMP,
                    @AcceptingUserId,
                    1
                );

    -- Retrieving CompanionId for the inserted record
    SELECT @CompanionId = CompanionId
    FROM   [Companion]
    WHERE  CompanionAId = @AcceptingUserId
    AND    CompanionBId = @SenderUserId;

    -- Inserting default settings for the companion into CompanionSetting table
    INSERT INTO [CompanionSetting] VALUES
                (
                    @CompanionId,
                    '12:00 AM', -- Default Time
                    NULL,
                    NULL,
                    CURRENT_TIMESTAMP,
                    @AcceptingUserId,
                    1
                );

    -- Inserting placeholder entries into Khat table
    INSERT INTO [Khat] VALUES
                (
                    @CompanionId,
                    @AcceptingUserId,
                    @SenderUserId,
                    NULL,
                    NULL,
                    CURRENT_TIMESTAMP,
                    @AcceptingUserId,
                    1
                )
                ,
                (
                    @CompanionId,
                    @SenderUserId,
                    @AcceptingUserId,
                    NULL,
                    NULL,
                    CURRENT_TIMESTAMP,
                    @AcceptingUserId,
                    1
                );
END
GO



