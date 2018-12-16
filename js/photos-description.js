'use strict';
(function () {
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
  window.photosDescription = createPhotosDescription(DESCRIPTIONS, COMMENTS_LIST, PHOTOS_COUNTS);
})();
