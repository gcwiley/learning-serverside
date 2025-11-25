import { Album } from './album.js';
import { Artist } from './artist.js';

// associations
Artist.hasMany(Album, { foreignKey: 'artistId', as: 'albums' });
Album.belongsTo(Artist, { foreignKey: 'artistId', as: 'artist' });

export { Artist, Album };
