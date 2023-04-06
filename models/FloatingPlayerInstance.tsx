export class FloatingPlayerInstance {
  id = '';
  title = '';
  artist = '';
  image = '';
  preview = '';

  constructor(
    id: string,
    title: string,
    artist: string,
    image: string,
    preview: string,
  ) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.image = image;
    this.preview = preview;
  }
}
