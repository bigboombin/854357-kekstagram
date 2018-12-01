'use strict';
var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var PHOTOS_COUNTS = 25;
var LAST_IMAGE = 6;
var FIRST_IMAGE = 1;
var MAX_COMMENTS = 2;
var MIN_COMMENTS = 1;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};


var createPhotosDescription = function (description, commentsList, photosCounts) {
  var photosDescription = [];
  var fullComments;
  for (var i = 0; i < photosCounts; i++) {
    if (randomInteger(MIN_COMMENTS, MAX_COMMENTS) === 1) {
      fullComments = commentsList[randomInteger(0, commentsList.length - 1)];
    } else {
      fullComments = [commentsList[randomInteger(0, commentsList.length - 1)], commentsList[randomInteger(0, commentsList.length - 1)]];
    }
    var photosSrc = 'photos/' + (i + 1) + '.jpg';
    photosDescription[i] = {
      url: photosSrc,
      likes: randomInteger(MIN_LIKES, MAX_LIKES),
      comments: fullComments,
      description: description[randomInteger(0, description.length - 1)]
    };
  } return photosDescription;
};


var addAllPhotos = function () {
  var photosDescription = createPhotosDescription(DESCRIPTIONS, COMMENTS_LIST, PHOTOS_COUNTS);
  var template = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var fragmentPictures = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNTS; i++) {
    var element = template.cloneNode(true);
    element.querySelector('img').src = photosDescription[i].url;
    element.querySelector('.picture__likes').TextContent = photosDescription[i].likes;
    element.querySelector('.picture__comments').TextContent = photosDescription[i].comments;
    fragmentPictures.appendChild(element);
  }
  pictures.appendChild(fragmentPictures);
};
addAllPhotos();

var addBigPicture = function () {
  var photosDescription = createPhotosDescription(DESCRIPTIONS, COMMENTS_LIST, PHOTOS_COUNTS);
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
  if (photosDescription[0].comments.length === MAX_COMMENTS) {
    for (var j = 0; j < photosDescription[0].comments.length; j++) {
      imageList[j].src = 'img/avatar-' + randomInteger(FIRST_IMAGE, LAST_IMAGE) + '.svg';
      imageD[j].TextContent = photosDescription[0].comments[j];
    }
  } else {
    imageList[0].src = 'img/avatar-' + randomInteger(FIRST_IMAGE, LAST_IMAGE) + '.svg';
    imageD[0].TextContent = photosDescription[0].comments[0];
  }

  var main = document.querySelector('main');
  main.appendChild(fragmentBigPicture);
};
addBigPicture();

var hideCommentsLoader = function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentLoader = document.querySelector('.comments-loader');
  socialCommentCount.classList.add('visually-hidden');
  commentLoader.classList.add('visually-hidden');
};
hideCommentsLoader();