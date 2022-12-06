# adapt-footer

**Footer** can be configured at menu and page level.

## Settings overview

**Footer** attributes include a textarea and image container for adding content and a class field for providing custom theme styles.

## Attributes

### _footer (object):
The footer object that defines the content to render. It contains the following settings:

### _isEnabled (boolean):
Turns on and off the **Footer** extension. Can be set in *course.json*, and *contentObjects.json* to enable **Footer** where required.

### _footerContent (string):
This is the main text for the footer.

### _classes (string):
CSS class name(s) to be applied to the footer. Classes available by default are:
* `footer-color black` (Sets the background color of the footer element to black and changes the font color to white.)
* `footer-color background` (Sets the background color of the footer element to use the variable `@background` (default is black) and changes the font color to use the variable `@background-inverted` (default is white). These variables can be changed in the `_colors.less` file in the Framework or through the Theme Picker in the Authoring Tool.)
* `footer-color transparent-light` (Sets the background color of the footer element to transparent and changes the font color to black. Useful for displaying text over a light background image.)
* `footer-color transparent-dark` (Sets the background color of the footer element to transparent and changes the font color to white. Useful for displaying text over a dark background image.)

The first class of two is required to apply a solid background color to the footer element. Combine with one of the chain classes to apply the respective background color e.g. `footer-color black` or `footer-color background`. Note: the chain class must be a predefined variable.

The `footer-color` mixin can be extended to include custom colors by adding another entry [here](https://github.com/cgkineo/adapt-footer/blob/master/less/footer.less#L51).

### _horizontalAlignment (string):
Defines the horizontal alignment for the footer content. Values available utilise the CSS property [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) and by default are:
* `start` (Aligns the content with the natural page direction. In a left-to-right course this is left by default.)
* `center` (Aligns the content to the center of the container.)
* `end` (Aligns the content to the opposite side of the natural page direction. In a left-to-right course this is right by default.)
* `space-around` (Adds space either side of the rendered content.)
* `space-between` (Adds space between the rendered elements.)

### _verticalAlignment (string):
Defines the vertical alignment for the footer content. Values available utilise the CSS property [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) and by default are:
* `start` (Aligns the content to the top of the container.)
* `center` (Aligns the content to the center of the container vertically.)
* `end` (Aligns the content to the bottom of the container.)

### _graphic (object):
The graphic object that defines the image which is rendered. The assumed use case for this image is to display a client's logo. It contains the following settings:

#### src (string):
File name (including path) of the image. Path should be relative to the `src` folder (e.g. `"course/en/images/origami-menu-two.jpg"`).

#### alt (string):
The alternative text for this image. Assign [alt text](https://github.com/adaptlearning/adapt_framework/wiki/Providing-good-alt-text) to images that convey course content only.

#### _orientation (string):
Defines the orientation of the image. It contains the following settings:
* `horizontal` (Sets the width of the image container to 10rem to simulate a horizontal image.)
* `vertical` (Sets the width of the image container to 5rem to simulate a vertical image.)

----------------------------
**Version number:** 2.0.0 <br>
**Framework versions:** 5.8+ <br>
**Author / maintainer:** CGKineo <br>
**Accessibility support:** WAI AA <br>
**RTL support:** Yes <br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 14 for macOS/iOS/iPadOS, Opera <br>
