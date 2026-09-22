DROP TABLE users;



CREATE TABLE users (
	user_id bigint,
	admin_level integer,
	is_sentinel bool,
	msg_sent bigint,
	hours_in_vc bigint,
	xp bigint,	
	usrlevel bigint,
	CONSTRAINT user_key PRIMARY KEY(user_id)
);





SELECT * FROM users;




--INSERT INTO users(user_id, admin_level, is_sentinel, msg_sent, hours_in_vc) VALUES(22, 0, FALSE, 0, 0);
--INSERT INTO levels(user_id, xp, level) VALUES(1,0,0);
