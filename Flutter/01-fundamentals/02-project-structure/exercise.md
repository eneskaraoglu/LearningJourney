# Exercise - Flutter Project Structure and Code Organization

## Part A - Core Implementation
Take a small Flutter screen or starter project and reorganize it into folders for features, shared widgets, models, and services.

## Part B - Validation and Error Cases
Identify files that currently mix too many concerns and document why that structure is risky.

## Part C - Reliability and Refactor
Refactor imports, naming, and file placement so another developer can navigate the project quickly.

## Constraints
- Keep structure simple enough for the current app size.
- Avoid one giant `screens` or `utils` dumping folder.
- Make file names intention-revealing.

## Acceptance Criteria
- Files have clearer ownership.
- UI, state, and service concerns are more distinct.
- The project is easier to navigate after the refactor.

## Bonus Challenge
Add an `app/` layer for shared routing or theme bootstrapping.

## Reflection Prompts
- Which folder boundary felt the most natural?
- What structure would have caused problems in a larger app?
