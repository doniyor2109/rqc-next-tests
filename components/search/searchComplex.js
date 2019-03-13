// на входе у нас есть сложный объект, в котором нужно искать.
// объект может состоять из массивов или других объектов
// например
// data = {
//     description: [
//                     {
//                     spans: []
//                     text: "Группа была основана в июле 2013 года. Основные направления исследования включают в себя экспериментальное и теоретическое изучение магнитоплазмоники, активной плазмоники, сверхбыстрого оптического управления спином и генерации магнонов. Наиболее важные и перспективные области нашей работы: генерация магнонов при помощи импульса фемтосекундного лазера, магнитоплазмонные структуры и наноантенны для управления светом, а также магнитооптика гетероструктур на основе двумерных (2D) электронных материалов, топологических изоляторов и магнитных пленок. В лаборатории проводятся исследования различных фундаментальных проблем в данных областях и ведется поиск практического применения сверхчувствительной магнитометрии, биосенсоров, обработки данных на основе магнонов, а также управления фотонами с помощью магнитного поля."
//                     type: "paragraph"
//                     }
//                 ],
//     group_leader: {
//         data: {name: Array(1), position: Array(1)}
//         id: "W3M8oCQAACQAa1vC"
//         isBroken: false
//         lang: "ru"
//         link_type: "Document"
//         slug: "%D0%B2%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80-%D0%B1%D0%B5%D0%BB%D0%BE%D1%82%D0%B5%D0%BB%D0%BE%D0%B2"
//         tags: []
//         type: "scientist"
//         uid: "владимир-белотелов"
//     }
// }

// добавляем библиотку natural
import natural from 'natural';

const natOptions = {
  search: true,
  // insertion_cost: 5,
  // deletion_cost: 5,
  substitution_cost: 1,
};

const natOptions2 = {
  search: true,
};

export const simpleSearch = (data, searchText, dots) => {
  // функция четкого поиска по заданной строке
  // ищет точные совпадения c помощью indexOf()
  // параметр dots возвращает

  const pos = data.text.toLowerCase().indexOf(searchText.toLowerCase());
  const CHARS_INCLUDED = 100;
  const leftBoundary = pos - CHARS_INCLUDED;
  const rightBoundary = pos + CHARS_INCLUDED;

  if (pos !== -1) {
    const str = data.text.slice(pos, pos + searchText.length);
    const textBeforesearch = data.text.slice(leftBoundary < 0 ? 0 : (data.text.indexOf(' ', leftBoundary)) + 1, pos);
    const textAftersearch = data.text.slice(pos + searchText.length, data.text.lastIndexOf(' ', rightBoundary));

    if (dots) {
      return [leftBoundary < 0 ? textBeforesearch : (`...${textBeforesearch}`), str, (`${textAftersearch}...`)];
    }
    return [textBeforesearch, str, textAftersearch];
  }
  return false;
};


const fuzzysearch = (data, searchText, requiredDistance, quality, options) => {
  // нечеткий поиск с помощью библиотеки natural по коэфф. Левенштейна
  // quality — это число, с помощью которого можно регулировать точность поиска,
  // чем меньше quality, тем строже требования к совпадению запроса и результата
  // quality - это количество букв в первом слове запроса и результата, которые могут отличаться
  // изначально хотелось, чтобы могли отличаться только окончания,
  // например "квантовая" = "квантовые"
  // но возможно нужно дать алгоритму возможность искать и что-то вроде "научный" = "науки"

  // инициализируем tokenizer, функцию, которая разбивает поисковый запрос на слова
  const tokenizer = new natural.WordTokenizer();

  // разбиваем запрос на слова
  const searchArray = tokenizer.tokenize(searchText.toLowerCase());

  // функция нечеткого поиска
  const fuzzy = natural.LevenshteinDistance(searchText.toLowerCase(), data.text.toLowerCase(), options);

  // определяем первые буквы в искомом слоове, которые должны совпадать с найденным поиском
  const firstLetters = searchArray[0].length - quality;

  // Если первый буквы совпали - условие для последующего if
  const isFirstLetterMatch = searchArray[0].slice(0, firstLetters) === fuzzy.substring.toLowerCase().slice(0, firstLetters);

  if (fuzzy.distance <= requiredDistance && isFirstLetterMatch) {
    const pos = data.text.toLowerCase().indexOf(fuzzy.substring.toLowerCase());
    const CHARS_INCLUDED = 100;
    const leftBoundary = pos - CHARS_INCLUDED;
    const rightBoundary = pos + CHARS_INCLUDED;
    const str = data.text.slice(pos, pos + searchText.length);
    const textBeforesearch = data.text.slice(leftBoundary < 0 ? 0 : (data.text.indexOf(' ', leftBoundary)) + 1, pos);
    const textAftersearch = data.text.slice(pos + searchText.length, data.text.lastIndexOf(' ', rightBoundary));

    return [(leftBoundary < 0) ? textBeforesearch : (`...${textBeforesearch}`), str, (`${textAftersearch}...`)];
  }

  return false;
};

const searchComplex = (result, data, searchText) => {
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].map((element) => {
        if (element.text) {
          result.push({
            key,
            highlight: simpleSearch(element, searchText, true),
            rank: 0,
          });
          result.push({
            key,
            highlight: fuzzysearch(element, searchText, 4, 2, natOptions),
            rank: 1,
          });
          result.push({
            key,
            highlight: fuzzysearch(element, searchText, 5, 4, natOptions2),
            rank: 2,
          });
        } else {
          searchComplex(result, element, searchText);
        }
      });
    } else if ((typeof data[key] === 'object') && data[key] !== null) {
      searchComplex(result, data[key], searchText);
    }
  });
  return result.filter(e => e.highlight !== false)
    .sort((a, b) => {
      if (a.rank < b.rank) return -1;
    });
};

export default searchComplex;
