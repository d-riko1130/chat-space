# DB設計

## usersテーブル

|column|type|options|
|------|----|-------|
|name|varchar(255)|null: false, unique: true, index: true|
|email|varchar(255)|null: false, unique: true|

### association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## groupsテーブル

|column|type|options|
|------|----|-------|
|name|varchar(255)|null: false|

### association
- has_many :members
- has_many :users, through: :members
- has_many :messages

## membersテーブル

|column|type|options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|column|type|options|
|------|----|-------|
|body|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### association
- belongs_to :user
- belongs_to :group
