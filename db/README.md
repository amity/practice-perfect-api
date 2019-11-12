# Tables

### Songs
Each table entry is one song, with the following fields:

| Field        | Type        | Constraints | Description |
| ------------ | ----------- | ----------- | ----------- |
| ID           | Integer     | Not Nullable, Unique, Primary Key | Auto-generated ID in table |
| Title        | String      | Not Nullable | The name of the song.
| Artist       | String      | | The composer or artist of the song.
| Resource URL | String      | Not Nullable | URL of song's XML file in the GCloud bucket. Will start with "https://storage.googleapis.com/practiceperfect-songs/".
| Year         | Integer     | | The year the song was released, if known.
| Level        | Integer     | | Loosely correlated with difficulty, determines the order players unlock the songs in.
| Top Score    | Integer     | | The highest possible score for the song.
| Deleted      | Boolean     | Not Nullable, Default: False | True if the song should be inaccessible by users (entry remains in DB on deletion).

### Users
Each table entry is one user, with the following fields:

| Field       | Type        | Constraints | Description |
| ----------- | ----------- | ----------- | ----------- |
| ID          | Integer     | Not Nullable, Unique, Primary Key | Auto-generated ID in table |
| Username    | String      | Not Nullable, Unique | The username displayed and used to log in.
| Email       | String      | Unique | The contact email for the user. Can also be used to log in.
| Password    | String      | Not Nullable | The password used to log in. This should probably be hashed.
| Name        | String      | | The real name of the user.
| Join Date   | Date        | | The date the user signed up for PracticePerfect.
| Level       | Integer     | | The level of songs the user has unlocked.
| Deleted     | Boolean     | Not Nullable, Default: False | True if the user has deleted their account (entry remains in DB on deletion).

Indices on username and on email, for login purposes. Username is not used as primary key, as they could be alterable.

### Scores
Each table entry is one user, with the following fields:

| Field       | Type        | Constraints | Description |
| ----------- | ----------- | ----------- | ----------- |
| ID          | Integer     | Not Nullable, Unique, Primary Key | ID in table, equals the User ID appended with the Song ID and the mode ID. |
| User        | Integer     | Not Nullable, Foreign Key: Users->ID | The ID of the user who set the score.
| Song        | Integer     | Not Nullable, Foreign Key: Songs->ID | The ID of the song that the score is for.
| Score       | Integer     | Not Nullable | The highest score for a given user and song.
| Mode        | Integer     | Not Nullable, Default: 0 | The ID of the mode. Currently only one mode, 0. Exists in case we add a different practice mode or difficulty.
| Date        | Date        | | The date that the score was set.

Compound index on Username -> SongID, for displaying high scores on the song select and results pages. The primary use case is fetching all high scores for a user, followed by fetching the high scores for a user on a specific song. If we want global leaderboards, we can add another index on just SongID.