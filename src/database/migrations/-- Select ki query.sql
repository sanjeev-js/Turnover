-- Select ki query
-- userid pass from backend

SET @paramUserId = userId

CREATE TEMPORARY TABLE temp_users (
    userId INT,
    categoryId INT
);

DELETE from temp_users;

INSERT into temp_users (userId, categoryId) 

SELECT userIntrests.userId, jsontable.categoryIds
FROM userIntrests
CROSS JOIN JSON_TABLE(CONCAT('["', REPLACE(categoryIds, ',', '","'), '"]'),
                      '$[*]' COLUMNS (categoryIds TEXT PATH '$')) jsontable 

where userId = @paramUserId;

SELECT c.categoryId, c.categoryName, tu.categoryId, 

CASE WHEN tu.categoryId is NULL THEN FALSE ELSE true END as userSelected

from categories as c 
LEFT JOIN temp_users as tu on tu.categoryId = c.categoryId;





-- update ki query
SET @paramUserId = 1;
set @paramCategoryId = '3,2,46,43,23';

UPDATE userIntrests 
set categoryIds = @paramCategoryId
WHERE userId = @paramUserId;

select * from userIntrests WHERE userId = @paramUserId;