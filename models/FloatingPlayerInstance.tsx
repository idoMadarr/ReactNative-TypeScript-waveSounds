export class FloatingPlayerInstance {
  id;
  title;
  artist;
  image;
  url;

  constructor(
    id: string,
    title: string,
    artist: string,
    image: string,
    url: string,
  ) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.image = image;
    this.url = url;
  }
}
