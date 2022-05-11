-- Consumer Table Queries
CREATE TABLE IF NOT EXISTS consumer (
	id SERIAL PRIMARY KEY,
	name VARCHAR(25) UNIQUE NOT NULL,
	display_name VARCHAR(25) UNIQUE NOT NULL,
	password VARCHAR(40) NOT NULL,
	email VARCHAR(200) UNIQUE NOT NULL,  --TODO: length to 320
	created_on TIMESTAMPTZ NOT NULL
); 

INSERT INTO consumer (name, display_name, password, email, created_on)
VALUES ('albert', 'Albert', 'alb123', 'alb@mail.com', NOW());

-- Post Table Queries
CREATE TABLE IF NOT EXISTS post (
	id VARCHAR(10) NOT NULL UNIQUE,
	consumer_id INT,
	subreddit_id INT,
	title VARCHAR(300) NOT NULL,
	slug VARCHAR(50) NOT NULL,
	description VARCHAR(10000),
	created_on TIMESTAMPTZ NOT NULL,
	updated_on TIMESTAMPTZ,
	CONSTRAINT fk_post_consumer
		FOREIGN KEY(consumer_id)
			REFERENCES consumer(id)
				ON DELETE SET NULL,
	CONSTRAINT fk_post_subreddit
		FOREIGN KEY(subreddit_id)
			REFERENCES subreddit(id)
				ON DELETE SET NULL
);

-- Subreddit Table Queries
CREATE TABLE IF NOT EXISTS subreddit (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL UNIQUE,
	display_name VARCHAR(20) NOT NULL,
	description VARCHAR(1000),
	created_on TIMESTAMPTZ NOT NULL
);

-- Subscription Table Queries
CREATE TABLE IF NOT EXISTS subscription (
	subreddit_id INT,
	consumer_id INT,
	is_moderator BOOL DEFAULT false,
	CONSTRAINT fk_subscription_subreddit
		FOREIGN KEY(subreddit_id)
			REFERENCES subreddit(id)
				ON DELETE CASCADE,
	CONSTRAINT fk_subscription_consumer
		FOREIGN KEY(consumer_id)
			REFERENCES consumer(id)
				ON DELETE CASCADE
);

-- Comment Table Queries
CREATE TABLE IF NOT EXISTS comment (
	id VARCHAR(10) NOT NULL UNIQUE,
	description VARCHAR(2000),
	created_on TIMESTAMPTZ NOT NULL,
	updated_on TIMESTAMPTZ,
	consumer_id INT,
	is_active BOOL DEFAULT false,
	CONSTRAINT fk_comment_consumer
		FOREIGN KEY(consumer_id)
			REFERENCES consumer(id)
				ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS comment_relation (
	parent_comment_id VARCHAR(10),
	comment_id VARCHAR(10),
	post_id VARCHAR(10),
	FOREIGN KEY(post_id)
			REFERENCES post(id)
				ON DELETE CASCADE,
	FOREIGN KEY(comment_id)
		REFERENCES comment(id)
);


-- CREATE TABLE IF NOT EXISTS comments_under_post (
-- 	post_id VARCHAR(10),
-- 	comment_id VARCHAR(10),
-- 	FOREIGN KEY(post_id)
-- 			REFERENCES post(id)
-- 				ON DELETE SET NULL, -- Need to think about this, see what happens to comments if post is deleted.
-- 	FOREIGN KEY(comment_id)
-- 		REFERENCES comment(id)
-- 			ON DELETE CASCADE
-- );
