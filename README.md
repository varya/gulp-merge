gulp-merge
====
> Merge multiple streams into one stream in sequence or parallel.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## It is a wrap of [merge2](https://github.com/teambition/merge2)

## Install

Install with [npm](https://npmjs.org/package/gulp-merge)

```
npm install gulp-merge
```

## Usage

```js
var gulp = require('gulp'),
  merge = require('gulp-merge'),
  concat = require('gulp-concat'),
  minifyHtml = require('gulp-minify-html'),
  ngtemplate = require('gulp-ngtemplate');

gulp.task('app-js', function () {
  return merge(
      gulp.src('static/src/tpl/*.html')
        .pipe(minifyHtml({empty: true}))
        .pipe(ngtemplate({
          module: 'genTemplates',
          standalone: true
        })
      ), gulp.src([
        'static/src/js/app.js',
        'static/src/js/locale_zh-cn.js',
        'static/src/js/router.js',
        'static/src/js/tools.js',
        'static/src/js/services.js',
        'static/src/js/filters.js',
        'static/src/js/directives.js',
        'static/src/js/controllers.js'
      ])
    )
    .pipe(concat('app.js'))
    .pipe(gulp.dest('static/dist/js/'));
});
```

```js
var stream = merge([stream1, stream2], stream3, {end: false})
//...
stream.add(stream4, stream5);
//..
stream.end();
```

```js
// equal to merge([stream1, stream2], stream3)
var stream = merge();
stream.add([stream1, stream2]);
stream.add(stream3);
```

```js
// merge order:
//   1. merge `stream1`;
//   2. merge `stream2` and `stream3` in parallel after `stream1` merged;
//   3. merge 'stream4' after `stream2` and `stream3` merged;
var stream = merge(stream1, [stream2, stream3], stream4);

// merge order:
//   1. merge `stream5` and `stream6` in parallel after `stream4` merged;
//   2. merge 'stream7' after `stream5` and `stream6` merged;
stream.add([stream5, stream6], stream7);
```

```js
// nest merge
// equal to merge2(stream1, stream2, stream6, stream3, [stream4, stream5]);
var streamA = merge(stream1, stream2);
var streamB = merge(stream3, [stream4, stream5]);
var stream = merge(streamA, streamB);
streamA.add(stream6);
```

## API

```js
var merge = require('gulp-merge');
```

### merge()
### merge(options)
### merge(stream1, stream2, ..., streamN)
### merge(stream1, stream2, ..., streamN, options)
### merge(stream1, [stream2, stream3, ...], streamN, options)
return a duplex stream (mergedStream). streams in array will be merged in parallel.

### mergedStream.add(stream)
### mergedStream.add(stream1, [stream2, stream3, ...], ...)
return the mergedStream.

### mergedStream.on('queueDrain', function() {})
It will emit 'queueDrain' when all streams merged. If you set `end === false` in options, this event give you a notice that should add more streams to merge or end the mergedStream.

#### stream

*option*

Type: `Readable` or `Duplex` or `Transform` stream.

#### options

*option*

Type: `Object`.

* **end** - `Boolean` - if `end === false` then mergedStream will not be auto ended, you should end by yourself. **Default:** `undefined`

* **objectMode** - `Boolean` . **Default:** `true`

`objectMode` and other options(`highWaterMark`, `defaultEncoding` ...) is same as Node.js `Stream`.

## License

MIT © [Teambition](http://teambition.com)

[npm-url]: https://npmjs.org/package/gulp-merge
[npm-image]: http://img.shields.io/npm/v/gulp-merge.svg

[travis-url]: https://travis-ci.org/teambition/merge2
[travis-image]: http://img.shields.io/travis/teambition/merge2.svg
