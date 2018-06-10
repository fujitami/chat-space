# DB設計

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|

### Associasion
- has_many :members
- has_many :users, through: :member
- has_many :messages

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :members
- has_many :groups, through: :member
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text| |
|image|string| |

### Association
- belongs_to :group
- belongs_to :user
