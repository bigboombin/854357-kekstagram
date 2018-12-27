'use strict';
(function () {
  var ESC = 27;
  var ENTER = 13;
  var COMMENTS_COUNT = 5;
  var NEW_PHOTOS_COUNT = 10;
  var bigPicture = document.querySelector('.big-picture');
  var mixArray = function (arr) {
    var j; var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var addAllPhotos = function (photosDescription) {
    var deletePhoto = document.querySelectorAll('.picture');
    deletePhoto.forEach(function (photo) {
      photo.remove();
    });
    var template = document.querySelector('#picture').content;
    var pictures = document.querySelector('.pictures');
    var fragmentPictures = document.createDocumentFragment();

    for (var i = 0; i < photosDescription.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('img').src = photosDescription[i].url;
      element.querySelector('.picture__likes').textContent = String(photosDescription[i].likes);
      element.querySelector('.picture__comments').textContent = String(photosDescription[i].comments.length);
      fragmentPictures.appendChild(element);
    }
    pictures.appendChild(fragmentPictures);
  };

  var addBigPicture = function (photoDescription) {

    var buttonClose = document.querySelector('#picture-cancel');
    var fragmentBigPicture = document.createDocumentFragment();
    fragmentBigPicture.appendChild(bigPicture);
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoDescription.url;
    bigPicture.querySelector('.likes-count').textContent = photoDescription.likes;
    bigPicture.querySelector('.comments-count').textContent = photoDescription.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photoDescription.description;
    var onDocumentKeydown = function (evt) {
      if (evt.keyCode === ESC) {
        bigPicture.classList.add('hidden');
      }
      document.removeEventListener('keydown', onDocumentKeydown);
    };
    document.addEventListener('keydown', onDocumentKeydown);

    buttonClose.addEventListener('click', function () {
      bigPicture.classList.add('hidden');
    });

    var main = document.querySelector('main');
    main.appendChild(fragmentBigPicture);
    var commentCreate = function (comments) {
      var socialComments = document.querySelector('.social__comments');
      var socialComment = document.querySelector('.social__comment');
      var socialCommentsAll = document.querySelectorAll('.social__comment');
      for (var i = 0; i < socialCommentsAll.length; i++) {
        socialCommentsAll[i].remove();
      }
      for (var k = 0; k < comments.length; k++) {
        var socialCommentClone = socialComment.cloneNode(true);
        socialComments.appendChild(socialCommentClone);
        socialCommentClone.querySelector('.social__picture').src = comments[k].avatar;
        socialCommentClone.querySelector('.social__text').textContent = comments[k].message;
      }
    };
    commentCreate(photoDescription.comments.slice(0, COMMENTS_COUNT));
    var commentsCount = document.querySelectorAll('.social__comment').length;
    bigPicture.querySelector('.social__comment-count').childNodes[0].textContent = Math.min(COMMENTS_COUNT, commentsCount) + ' из ';


  };
  var openBigPhoto = function (photosDescription) {
    var allPhotos = document.querySelectorAll('.picture__img');
    var onPhotoClick = function (photoDescription) {
      return function () {
        addBigPicture(photoDescription);
      };
    };
    var onPhotoEnter = function (photoDescription) {
      return function (evt) {
        if (evt.keyCode === ENTER) {
          addBigPicture(photoDescription);
        }
        var onDocumentKeydown = function () {
          if (evt.keyCode === ESC) {
            bigPicture.classList.add('hidden');
          }
          document.removeEventListener('keydown', onDocumentKeydown);
        };
        document.addEventListener('keydown', onDocumentKeydown);
      };
    };
    for (var i = 0; i < photosDescription.length; i++) {
      allPhotos[i].addEventListener('click', onPhotoClick(photosDescription[i]));
      allPhotos[i].setAttribute('tabindex', 0);
      allPhotos[i].addEventListener('keydown', onPhotoEnter(photosDescription[i]));
    }
  };

  var onLoad = function (photosDescription) {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');


    var filterPopularButton = document.querySelector('#filter-popular');
    var filterNewButton = document.querySelector('#filter-new');
    var filterDiscussedButton = document.querySelector('#filter-discussed');
    var photoDescription = photosDescription;
    filterPopularButton.tabindex = '0';
    filterNewButton.tabindex = '0';
    filterDiscussedButton.tabindex = '0';
    var removeButtonClasses = function () {
      filterNewButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.remove('img-filters__button--active');
      filterPopularButton.classList.remove('img-filters__button--active');
    };
    var filterPopularClickHandler = function () {
      removeButtonClasses();
      filterPopularButton.classList.add('img-filters__button--active');
    };
    var filterNewClickHandler = function () {
      removeButtonClasses();
      filterNewButton.classList.add('img-filters__button--active');
    };
    var filterDiscussedClickHandler = function () {
      removeButtonClasses();
      filterDiscussedButton.classList.add('img-filters__button--active');
    };
    var newAllFilterHandler = window.debounce(function (evt) {
      if (evt.target === filterPopularButton) {
        var onFilterPopularClick = function () {
          var photoDescriptionNew = photosDescription.slice();
          addAllPhotos(photoDescriptionNew);
          openBigPhoto(photoDescriptionNew);
        };
        onFilterPopularClick();
      }
      if (evt.target === filterNewButton) {
        var onFilterNewClick = function () {
          var photoDescriptionNew = photosDescription.slice();
          var photoDescriptionRandom = mixArray(photoDescriptionNew).slice(0, NEW_PHOTOS_COUNT);
          addAllPhotos(photoDescriptionRandom);
          openBigPhoto(photoDescriptionRandom);
        };
        onFilterNewClick();
      }
      if (evt.target === filterDiscussedButton) {
        var onFilterDiscussedClick = function () {
          var photoDescriptionNew = photosDescription.slice();
          photoDescriptionNew.sort(function (first, second) {
            if (first.comments.length > second.comments.length) {
              return -1;
            } else if (first.comments.length < second.comments.length) {
              return 1;
            } else {
              return 0;
            }
          });
          addAllPhotos(photoDescriptionNew);
          openBigPhoto(photoDescriptionNew);
        };
        onFilterDiscussedClick();
      }
    }
    );

    filterPopularButton.addEventListener('click', newAllFilterHandler);
    filterNewButton.addEventListener('click', newAllFilterHandler);
    filterDiscussedButton.addEventListener('click', newAllFilterHandler);
    filterPopularButton.addEventListener('click', filterPopularClickHandler);
    filterNewButton.addEventListener('click', filterNewClickHandler);
    filterDiscussedButton.addEventListener('click', filterDiscussedClickHandler);

    addAllPhotos(photoDescription);
    openBigPhoto(photoDescription);


  };
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(onLoad, onError);
})();
