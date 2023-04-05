export class FloatingPlayerInstance {
  id = '';
  title = '';
  artist = '';
  image = '';

  constructor(id: string, title: string, artist: string, image: string) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.image = image;
  }
}
