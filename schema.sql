CREATE TABLE Tasks (
    'id' int NOT NULL PRIMARY KEY,
    'group' VARCHAR(50),
    'task' VARCHAR(100),
    'dependencyIDs' int references Dependencies(id),
    'completedAt' VARCHAR(10)
)

CREATE TABLE Dependencies {
    'id' int NOT NULL PRIMARY KEY,
    'd1' int,
    'd2' int,
    'd3' int
}