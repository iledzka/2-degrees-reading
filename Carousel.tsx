import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

type Book = {
  image: any;
  title: string;
  author: string;
  rating: number;
};
const books: Book[] = [
  {
    image: require('./assets/images/Iconicon.png'),
    title: 'Iconicon',
    author: 'John Grindrod',
    rating: 5,
  },
  {
    image: require('./assets/images/Re-Sisters.png'),
    title: 'Re-Sisters',
    author: 'Cosey Fanni Tutti',
    rating: 4.8,
  },
  {
    image: require('./assets/images/Lord-of-the-Flies.png'),
    title: 'Lord of the Flies',
    author: 'William Golding',
    rating: 4.9,
  },
  {
    image: require('./assets/images/Dance.png'),
    title: 'Dance',
    author: 'Emma Warren',
    rating: 5,
  },
];

function CarouselItem({ image, title, author, rating }: Book) {
  return (
    <View style={styles.carouselItem}>
      <Image source={image} style={styles.imageSmall} />
      <View style={styles.bookInfo}>
        <View>
          <Text style={styles.titleText}>{title} </Text>
          <Text style={styles.authorText}>{author}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Ionicons
            name="star"
            size={14}
            color="black"
            style={{ color: 'orange', marginRight: 4 }}
          />
          <Text style={{ fontWeight: 'bold' }}>{rating}</Text>
        </View>
      </View>
    </View>
  );
}
export default function Carousel() {
  return (
    <View style={styles.carousel}>
      {books.map(({ image, title, author, rating }, i) => {
        if (i % 2 === 0) {
          return (
            <View key={i}>
              <CarouselItem
                key={title}
                image={image}
                title={title}
                author={author}
                rating={rating}
              />
              <CarouselItem
                key={books[i + 1].title}
                image={books[i + 1].image}
                title={books[i + 1].title}
                author={books[i + 1].author}
                rating={books[i + 1].rating}
              />
            </View>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: { flex: 1, flexDirection: 'row' },
  imageSmall: { resizeMode: 'contain', width: 60, height: 94 },
  carouselItem: {
    width: SCREEN_WIDTH * 0.7,
    marginBottom: 10,
    flexDirection: 'row',
  },
  bookInfo: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  authorText: {
    color: 'gray',
    paddingTop: 6,
  },
  titleText: {
    fontWeight: 'bold',
    paddingVertical: 4,
    fontSize: 15,
  },
});
