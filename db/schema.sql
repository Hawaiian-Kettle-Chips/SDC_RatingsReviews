DROP DATABASE if exists reviewList;

CREATE DATABASE reviewList;

USE reviewList;

CREATE TABLE reviews (
  review_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
  product_id INTEGER(10) NOT NULL,
  rating INTEGER(1) NOT NULL,
  date DATE NOT NULL,
  summary VARCHAR(60),
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(100) NOT NULL,
  response VARCHAR (1000),
  helpfulness INTEGER(100),
);

CREATE TABLE photos (
  photo_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(1000) NOT NULL,
  INDEX par_ind(review_id),
  FOREIGN KEY (review_id)
    REFERENCES reviews(review_id)
) ENGINE=INNODB;


