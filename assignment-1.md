# Hotel Management system
## Assignment 1
Implement an API for a hotel management system.

### API specification
Authentication
  - ✅ `GET /users`–list all user IDs
  - ✅ `GET /users/{:uid}`–view user data
  - ✅ `POST /user`–create user
  - ✅ `POST /login`–issue JWT token

Rooms
  - ❌ `GET /rooms`–list all rooms. Accessible for roles `manager`, `clerk`, and `guest`. It should be possible to filter based on availability
  - ✅ `GET /rooms/{:uid}`–view room details. Accessible for roles `manager`, `clerk`, amd `guest`
  - ✅ `POST /rooms/{:uid}`–create room. Accessible for roles `manager`
  - ✅ `PATCH /rooms/{:uid}`–modify room. Accessible for roles `manager`, `clerk`
  - ✅ `DELETE /rooms/{:uid}`–delete room. Accessible for roles `manager`

Reservations
  - ✅ `GET /reservations`–list all reservation. Accessible for roles `manager` and `clerk`. It should be possible to filter based dates (from, to and from-to)
  - ✅ `GET /reservations/{:uid}`-view reservation details. Accessible for roles `manager`, `clerk`, and `guest` (if created by `guest`)
  - ✅ `POST /reservations/{:uid}`–create reservation. Accessible for roles `manager`, `clerk`, and `guest` 
  - ✅ `PATCH /reservations/{:uid}`—modify reservation. Accessible for roles `manager`, `clerk`, and `guest` (if created by `guest`) 
  - ✅ `DELETE /reservations/{:uid}`–delete reservation. Accessible for roles `manager`, `clerk`

### Requirements
The system must fulfill the following functional requirements:
  - ❌ `R1` A room can only be reserved once within a given time period
  - ✅ `R2` The must be implemented using Node.js
  - ✅ `R3` All reservations, users, and reservations must be persisted in a MongoDB
  - ❌ `R4` An asymmetric algorithm must be used to sign tokens
  - ✅ `R5` All endpoints must verify received tokens to ensure it has not been tampered with
  - ❌ `R6` A user shall have an email associated with their account
  - ✅ `R7` User emails should be system-wide unique
  - ✅ `R8` All sensitive information shall not be persisted as plaintext

## Submission
Before submitting your solution, do the following:
1. Delete the `node_modules` folder in the workspace root folder
2. Add a file `participants.txt` and insert a new line for each participant with the AUID and full name of each member separated by a whitespace
3. Add `participants.txt` to the root folder of your application
4. Archive and compress the folder using one the following formats: `zip`, or `gzip/tar`. All other formats (`rar`, `7z`, etc.) will result in a request for resubmission
5. The filename should be named `<AUID_PARTICIPANT_1>-<AUID_PARTICIPANT_2>-<AUID_PARTICIPANT_3>.<ARCHIVE_COMPRESS_FORMAT>` _Example: Alice Alison with AUID `au01248` and Bob Bobson with AUID `au84210` creates a compressed archive named `au01248-au84210.tar.gz` and uploads that to Brightspace_

A `participants.txt` example:
```
au01248 Alice Alison
au84210 Bob Bobson
```