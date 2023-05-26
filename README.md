# FilterConverter
CSS has a ```filter``` property that allows to tweak HTML elements' graphical subproperties, such as their brightness and saturation. This CSS feature can be applied to images, making it possible to alter single-color PNGs or SVGs to suit the programmers' needs.
## How does it work?
If you have a collection of images (such as logos that can be used in a website's footer), each with varying colors, you can first prepend ```brightness(0) saturate(100%)``` to turn all the images into black, and then apply the different subproperties by inputting your desired target color as an RGB or Hex Value. For example, let's say we have these logos down below:

<img src="assets/before-filter.png" alt="Before Filter" width="200">

If we wanted to take all our logos and give it a value of ```rgb(77, 77, 77)```, we could go input it and we would get a bunch of subproperties that would convert a black color into our target color. Now if we were to apply the ```filter``` property on our logos, like so...
```filter: brightness(0) saturate(100%) invert(54%) sepia(9%) saturate(19%) hue-rotate(346deg) brightness(86%) contrast(91%);```

The result would be this:

<img src="assets/after-filter.png" alt="Before Filter" width="200">

My implementation of the Filter Converter yields accurate results because it iterates through the algorithm multiple times, toning down loss values. It also supports both RGB and HEX values for the target color.

### Credits go to [Barret Sonntag]("https://codepen.io/sosuke/pen/Pjoqqp"), for implementing the solution on Codepen, and [MultiplyByZer0]("https://stackoverflow.com/a/43960991"), for providing the original solution over at StackOverflow.