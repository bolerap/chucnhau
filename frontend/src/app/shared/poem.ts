export class Poem {
  title: string;
  body: string[];
  author: string;

  constructor(title?: string , body?: string[], author?: string) {
    this.title = title || 'Chúc Tết';
    this.body = body || ['Lẳng lặng mà nghe nó chúc nhau.',
        'Chúc nhau trăm tuổi bạc đầu râu.',
        'Phen này ông quyết đi buôn cối.',
        'Thiên hạ bao nhiêu đứa giã trầu.'];
    this.author = author || 'Tú Xương';
  }
}
