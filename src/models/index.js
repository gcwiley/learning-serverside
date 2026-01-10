import { Album } from './album.js';
import { Artist } from './artist.js';
import { Hero } from './hero.js';
import { Image } from './image.js';

// define relationships
Artist.hasMany(Album, { foreignKey: 'artistId', as: 'albums' });
Album.belongsTo(Artist, { foreignKey: 'artistId', as: 'artist' });

export { Album, Artist, Hero, Image };
