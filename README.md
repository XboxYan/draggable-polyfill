# draggable-polyfill

🌈a beautiful polyfill for native drag! 

## Feature

* light and beautiful
* native and no dependence
* cross framework
* progressive enhancement and no side effects

## Example

* [native drag](http://xboxyan.codelabo.cn/draggable-polyfill/example/index.html)

* [native drag with draggable-polyfill](http://xboxyan.codelabo.cn/draggable-polyfill/example/index_polyfill.html)

## How to use

Import the library code

* github

```html
<script src="./lib/draggable-polyfill.js"></script>
```

* npm
```
npm install draggable-polyfill
```

then these native draggable elements( `[draggable=true]`,`img` ) will becoming beautiful

```html
<div draggable="true">drag me</div>
<img src="./avator" alt="avator">
```

## How to Custom Style

draggable elements will add props `dragging` under dragging, so you can custom style through CSS

```css
.dragbox[dragging]{
    box-shadow: 5px 5px 15px rgba(0, 0, 0, .2);
}
```

## Browser Supports

* Chrome
* Firefox

Note:This polyfill works on Chrome and Firefox, not for IE( IE is not supports `setDragImage` ), it will keep default effect.

## License

MIT
