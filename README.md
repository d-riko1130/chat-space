# DB設計

## usersテーブル

|column|type|options|
|------|----|-------|
|name|varchar(255)|null: false, unique: true|
|email|varchar(255)|null: false, unique: true|

### association
- has_many :groups
- has_many :members
- has_many :messages

## groupsテーブル

|column|type|options|
|------|----|-------|
|name|varchar(255)|null: false|

### association
- has_many :users
- has_many :members
- has_many :messages

## membersテーブル

|column|type|options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### association
- belongs_to :group
- belongs_to :user
- has_many :messages

## messagesテーブル

|column|type|options|
|------|----|-------|
|body|text||
|image|varchar(255)||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### association
- belongs_to :user
- belongs_to :group
- belongs_to :member
