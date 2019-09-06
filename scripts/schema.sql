CREATE TABLE "album" (
	"id" Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"url" Text NOT NULL,
	"title" Text NOT NULL,
    "imageUrl" Text,
    "artist" Text,
    "releaseDate" Text,
    "data" Text
);

CREATE UNIQUE INDEX "album_url" ON "album" ( "url" );