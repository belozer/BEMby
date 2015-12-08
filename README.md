# Мини js-фреймворк BEMby
Данный фреймворк является надстройкой над jQuery.
Создан для пректов, в которых нет возможможности использовать замечательный фреймворк i-bem.
Предназначен для работы с методологией БЭМ в технологии JS.

_Для работы BEMby необходим js-фреймворк jQuery._

## API
Объявление блока
```js
var Page = new BEMby('page');
// jQuery: var Page = $('.page');
```

Объявление блока внутри определённого селектора
```js
var Player = new BEMby('page', $('.page'));
```

Установка модификтора .setMod()
```js
Page.setMod('loading', 'display');
// jQuery: Page.addClass('page__loading_display');
```

Удаление модификатора .delMod()
```js
Page.delMod('loading');
// jQuery: Page.removeClass('page__loading_display');
```

### Работа с элементами

Доступ к элементу
```js
Page.elem('content');
// jQuery: Page.find('.page__content');
```

Если необходимо, то можно уточнять поиск элемента (для вложенных элементов).  Данный подход не рекомендуется использовать без необходимости.
```js
Player.elem('wrapper).elem('audio');
// jQuery: Player.find('.player__wrapper').find('.player__audio');
```

Установка модификтора на элементе .setMod()
```js
Player.elem('audio').setMod('playing');
// jQuery: Player.find('.player__audio').addClass('player__audio_playing');
```

Удаление модификатора на элементе .delMod()
```js
Player.elem('audio').delMod('playing');
// jQuery: Player.find('.player__audio').removeClass('player__audio_playing');
```

### Работа с событиями .on()
Для удобтва обработки событий типа jQuery 'click', 'mouseenter' и т.д. был создан специальный метод .on().
Данный метод позволяет использовать привычные jQuery события с BEMby.

```js
Player
.on('mouseenter', function() {
    this.setMod('hovered'); // this - ссылается на экземпляр блока player
})
.on('mouseleave', function() {
    this.delMod('hovered');
});

Player.elem('audio').on('mouseenter', function() {
    this.setMod('hovered'); // this - ссылается на экземпляр элемента audio
});
```

jQuery вариант вышеописанного кода
```js
Player
.on('mouseenter', function() {
    $(this).addClass('player__hovered');
})
.on('mouseleave', function() {
    $(this).removeClass('player__hovered');
});

Player.find('.player__audio').on('mouseenter', function() {
    $(this).addClass('player__audio_hovered'); // this - ссылается на экземпляр элемента audio
});
```

### Переход в режим jQuery .$
Каждый экземпляр блока или элемента имеет свойство ```.$```, которое является экземапляром селектора jQuery.
Данное решение позволяет использовать все преимущества jQuery, при этом разделяя логику кода.

```js
Player.$.html('Hello jQuery from BEMby');
Player.elem('audio-title').$.html('Cool Boom Boom');
```
