import randomWords from 'random-words';
import randomSeed from 'random-seed';
import range from 'lodash/range';
import format from 'python-format';
let cache = {};

const minMax = (min, max) => ({min, max});

const dateRange = {
  min: 1491004800000,
  max: 1501209734000,
};

const pictureUrls = [
      '/cdn/images/product.png',
      '/cdn/images/product1.png',
      '/cdn/images/product2.png',
      '/cdn/images/product3.png',
    ];

const defaults = {
  cache: true,
  product: {
    name: minMax(1, 5),
    manufacturer: minMax(1, 3),
    modelNumber: minMax(100000, 999999),
    price: minMax(1, 300),
    pictures: minMax(1, 6),
    tags: minMax(1, 6),
    description: {
      words: minMax(5, 15),
      sentences: minMax(2, 5),
      paragraphs: minMax(1, 3),
    },
    highlights: {
      phrases: minMax(2, 7),
      words: minMax(5, 10),
    },
    related: minMax(0, 7),
    recommended: minMax(0, 7),
    qas: {
      count: minMax(0, 15),
      question: minMax(5, 10),
      //user: minMax(0, 100),
      date: dateRange,
      answers: {
        count: minMax(0, 5),
        answer: {
          words: minMax(5, 15),
          sentences: minMax(1, 3),
        },
        //user: minMax(0, 100),
        date: dateRange,
        usefulness: {
          positive: minMax(0, 100),
          negative: minMax(0, 100),
        },
      },
    },
    reviews: {
      count: minMax(0, 100),
      title: minMax(5, 15),
      //user: minMax(0, 100),
      date: dateRange,
      score: minMax(1, 5),
      review: {
          words: minMax(5, 15),
          sentences: minMax(1, 3),
      },
      usefulness: {
        positive: minMax(0, 100),
        negative: minMax(0, 100),
      },
    }
  }
}

function generateWord(rand) {
  const wordList = randomWords.wordList;
  return wordList[rand.range(wordList.length)];
}

function generateWords(rand, {min, max}) {
  const wordList = randomWords.wordList;
  const end = rand.intBetween(min, max);
  const words = new Array(end);

  for(let ii = 0; ii < end; ++ii) {
    words[ii] = generateWord(rand);
  }

  return words;
}

function generatePhrase(rand, words) {

  const wordList = generateWords(rand, words);

  if(wordList.length == 0) {
    return '';
  }

  wordList[0] = wordList[0][0].toUpperCase() + wordList[0].substr(1)

  return wordList.join(' ');
}

function generatePhrases(rand, {phrases: {min, max}, words}) {
  const end = rand.intBetween(min, max);

  const phrases = new Array(end);
  for(let ii = 0; ii < end; ++ii) {
    phrases[ii] = generatePhrase(rand, words);
  }

  return phrases;
}

function generateSentence(rand, minMax) {
  const phrase = generatePhrase(rand, minMax);

  if(phrase === '') {
    return '';
  }

  return phrase + '.';
}

function generateParagraph(rand, {sentences: phrases, words}) {

  return generatePhrases(rand, {phrases, words}).map(pp => pp + '.').join(' ');

  const end = rand.intBetween(min, max);

  if(end < 1) {
    return '';
  }

  const sentences = new Array(end);
  for(let ii = 0; ii < end; ++ii) {
    sentences[ii] = generateSentence(rand, words);
  }

  return sentences.join(' ');
}

function generateParagraphs(rand, {paragraphs: {min, max}, sentences, words}) {
  const end = rand.intBetween(min, max);

  if(end < 1) {
    return '';
  }

  const paragraphs = new Array(end);
  for(let ii = 0; ii < end; ++ii) {
    paragraphs[ii] = generateParagraph(rand, {sentences, words});
  }

  return paragraphs.join('\n');
}

function randomPictures(rand, {min, max}) {
  const end = rand.intBetween(min, max);

  const pictures = new Array(end);
  for(let ii = 0; ii < end; ++ii) {
    pictures[ii] = pictureUrls[rand(pictureUrls.length)];
  }

  return pictures;
}

function minMaxArgs({min, max}){
  return [min, max];
}

function randomDate(rand, {min, max}, altMin) {
  const date = new Date(rand.intBetween(altMin || min, max));
  return format('{:04}-{:02}-{:02}',
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate());
}

function randomUser(rand) {
  return generateWord(rand) + rand.intBetween(0, 100);
}

function generateQas(rand, config) {
  const {count} = config;
}

function generateQa(rand, config) {
  const qdate = randomDate(rand, config.date);
  const minDate = new Date(qdate).getTime();
  const aConfig = config.answers;
  const answersCount = rand.intBetween(...minMaxArgs(aConfig.count));
  const qa = {
    question: generatePhrase(rand, config.question) + '?',
    date: qdate,
    user: randomUser(rand),
    answers: []
  };

  for(let ii = 0; ii < answersCount; ++ii) {
    qa.answers.push({
      answer: generateParagraph(rand, aConfig.answer),
      date: randomDate(rand, aConfig.date, minDate),
      user: randomUser(rand),
      usefulness: {
        positive: rand.intBetween(...minMaxArgs(aConfig.usefulness.positive)),
        negative: rand.intBetween(...minMaxArgs(aConfig.usefulness.negative)),
      }
    });
  }

  return qa;
}

function generateReview(rand, config) {

  return {
      title: generatePhrase(rand, config.title),
      user: randomUser(rand),
      date: randomDate(rand, config.date),
      review: generateParagraph(rand, config.review),
      score: rand.intBetween(...minMaxArgs(config.score)),
      usefulness: {
        positive: rand.intBetween(...minMaxArgs(config.usefulness.positive)),
        negative: rand.intBetween(...minMaxArgs(config.usefulness.negative)),
      },
    };
}

function generateIds(rand, {min, max}, original) {
  const end = rand.intBetween(min, max);

  const ids = new Set();
  for(; ids.size < end;) {
    let num = rand(Math.pow(2, 32) - 1);
    if(num !== original) {
      ids.add(num);
    }
  }

  return ids;
}

function generatePartialProduct(rand, id, pConfig) {
  const product = {
    id,
    name: generatePhrase(rand, pConfig.name),
    manufacturer: generatePhrase(rand, pConfig.manufacturer),
    modelNumber: rand.intBetween(...minMaxArgs(pConfig.modelNumber)),
    price: rand.floatBetween(...minMaxArgs(pConfig.price))
                .toLocaleString(
                  'en-US', {
                    minimumFractionDigits:2,
                    maximumFractionDigits:2 }),
    pictures: randomPictures(rand, pConfig.pictures),
    description: generateParagraphs(rand, pConfig.description),
    highlights: generatePhrases(rand, pConfig.highlights),
    tags: generateWords(rand, pConfig.tags),
    recommended: [],
    related: [],
    qas: [],
    reviews: [],
    rating: {
      score: 3.0,
      numberOfReviews: 0,
      breakdown: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    }
  };

  for(let ii = 0; ii < rand.intBetween(...minMaxArgs(pConfig.qas.count)); ++ii) {
    product.qas.push(generateQa(rand, pConfig.qas));
  }

  for(let ii = 0; ii < rand.intBetween(...minMaxArgs(pConfig.reviews.count)); ++ii) {
    product.reviews.push(generateReview(rand, pConfig.reviews));
  }

  if(product.reviews.length > 0) {
    const {rating, reviews} = product;
    rating.numberOfReviews = reviews.length
    rating.score = reviews.reduce((sum, rr) => sum + rr.score, 0) / reviews.length;
    for(let rr of reviews) {
      ++ rating.breakdown[rr.score];
    }
  }

  return product;
}


export function generateProduct(id, prodConfig={}) {

  const config = Object.assign({}, defaults, prodConfig);

  if(cache[id] && config.cache) {
    return cache[id];
  }

  const pConfig = config.product;

  const rand = randomSeed.create(id);

  const product = generatePartialProduct(rand, id, pConfig);

  for(let ii of generateIds(rand, pConfig.recommended, id)) {
    const rand2 = randomSeed.create(ii);
    product.recommended.push(
        generatePartialProduct(rand2, ii, pConfig)
      );
    rand2.done();
  }

  for(let ii of generateIds(rand, pConfig.related, id)) {
    const rand2 = randomSeed.create(ii);
    product.related.push(
        generatePartialProduct(rand2, ii, pConfig)
      );
    rand2.done();
  }

  rand.done();

  if(config.cache) {
    cache[id] = product;
  }

  return product;

}
