import { MediaItem } from '@rntp/player';

export const playListData: MediaItem[] = [
  {
    mediaId: '1', // Fixed: String format required
    title: 'Maan Meri Jaan',
    artist: 'King',
    albumTitle: 'Champagne Talk',
    artworkUrl:
      'https://c.saavncdn.com/734/Champagne-Talk-Hindi-2022-20221008011951-500x500.jpg',
    url: require('./assets/audio/one.mp3') as string, // Fixed: Cast asset reference for TS
  },
  {
    mediaId: '2',
    title: 'Raataan Lambiyan',
    artist: 'Tanishk Bagchi, Asees Kaur',
    albumTitle: 'Shershaah',
    artworkUrl:
      'https://c.saavncdn.com/238/Shershaah-Original-Motion-Picture-Soundtrack--Hindi-2021-20210815181610-500x500.jpg',
    url: require('./assets/audio/two.mp3') as string,
  },
  {
    mediaId: '3',
    title: 'Kesariya',
    artist: 'Arijit Singh, Amitabh Bhattacharya',
    albumTitle: 'Brahmastra',
    artworkUrl:
      'https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg',
    url: require('./assets/audio/three.mp3') as string,
  },
  {
    mediaId: '4',
    title: 'Title Track',
    artist: 'Arijit Singh, Parampara Tandon',
    albumTitle: 'Pal Pal Dil Ke Paas',
    artworkUrl:
      'https://c.saavncdn.com/328/Pal-Pal-Dil-Ke-Paas-Hindi-2019-20200420150444-500x500.jpg',
    url: require('./assets/audio/four.mp3') as string,
  },
  {
    mediaId: '5',
    title: 'Besharam Rang',
    artist: 'Vishal & Shekhar, Shilpa Rao',
    albumTitle: 'Pathaan',
    artworkUrl:
      'https://c.saavncdn.com/807/Pathaan-Hindi-2022-20221222104158-500x500.jpg',
    url: require('./assets/audio/five.mp3') as string,
  },
];
