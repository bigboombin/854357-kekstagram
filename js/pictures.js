'use strict';
var photosDescription = [];
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
var commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var fullComments;
for (var i = 0; i < 25; i++) {
  if (randomInteger(1, 2) === 1) {
    fullComments = commentsList[randomInteger(0, commentsList.length)];
  } else {
    fullComments = [commentsList[randomInteger(0, commentsList.length)], commentsList[randomInteger(0, commentsList.length)]];
  }
  var photosSrc = 'photos/' + (i + 1) + '.jpg';
  photosDescription[i] = {
    url: photosSrc,
    likes: randomInteger(15, 200),
    comments: fullComments,
    description: descriptions[randomInteger(0, descriptions.length)]
  };
}

var template = document.querySelector('#picture').content;
var pictures = document.querySelector('.pictures');
var fragmentPictures = document.createDocumentFragment();

for (i = 0; i < 25; i++) {
  var element = template.cloneNode(true);
  element.querySelector('img').src = photosDescription[i].url;
  element.querySelector('.picture__likes').TextContent = photosDescription[i].likes;
  element.querySelector('.picture__comments').TextContent = photosDescription[i].comments;
  fragmentPictures.appendChild(element);
}
pictures.appendChild(fragmentPictures);


var bigPicture = document.querySelector('.big-picture');
var fragmentBigPicture = document.createDocumentFragment();
fragmentBigPicture.appendChild(bigPicture);
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img').querySelector('img').src = photosDescription[0].url;
bigPicture.querySelector('.likes-count').TextContent = photosDescription[0].likes;
bigPicture.querySelector('.comments-count').TextContent = photosDescription[0].comments.length;
bigPicture.querySelector('.social__caption').TextContent = photosDescription[0].description;


var imageList = bigPicture.querySelectorAll('.social__picture');
var imageD = bigPicture.querySelectorAll('.social__text');
if (photosDescription[0].comments.length === 2) {
  for (var j = 0; j < photosDescription[0].comments.length; j++) {
    imageList[j].src = 'img/avatar-' + randomInteger(1, 6) + '.svg';
    imageD[j].TextContent = photosDescription[0].comments[j];
  }
} else {
  imageList[0].src = 'img/avatar-' + randomInteger(1, 6) + '.svg';
  imageD[0].TextContent = photosDescription[0].comments[0];
}

var main = document.querySelector('main');
main.appendChild(fragmentBigPicture);


var socialCommentCount = document.querySelector('.social__comment-count');
var commentLoader = document.querySelector('.comments-loader');
socialCommentCount.classList.add('visually-hidden');
commentLoader.classList.add('visually-hidden');
