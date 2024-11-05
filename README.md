Minesweeper oop with react and express.
the main objective of the project is to revise my skills on react and express to further enter to more complex areas such as websocket.

Task Tracker:
Pending:

1. UI rework

Closed:

1. tailwind static build process: some elements have dynamic class names, which set after fetching data, during the build process these class names wont be include, so eventually it wont be include in the css files too. To ensure these class names to be available, we need to add them into the whitelist of tailwind's config.

2. Implement revealing cells process: the adjacent cells around the cell that got no bomb around needed to be revealed too, so we need to do a recursive process with cache around it to make it efficiently.
