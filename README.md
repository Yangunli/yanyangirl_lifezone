# ✨✨YANYANGIRL LIFEZONE ✨✨

  <img width="100%" src="https://firebasestorage.googleapis.com/v0/b/yanyangirl-lifezone.appspot.com/o/readme%2FHOME.jpg?alt=media&token=e2d0873d-003f-4cb3-b773-6c1507e56566" >

```
This lovely website is about exhibitions (fine art / scuplture / illustraction / craft). Provide some information about current or upcoming exhibitions, and some exhibition record.

```

## ✨Built with✨

- Webpack 5
- React
- Firebase v9
- Scss

## ✨Feature✨

### Create the custom exit animations for Modal & Menu.

<img width="80%" src="./asset/Modal_p.gif">

- Do not rely on 3rd party library.
- Use hooks (useRef/useState) to store content and toggle state.
- Before component exit (click event), use setTimeout() methods to trigger exit animation.

```cpp

  const modalContainerRef = useRef();
  const modalRef = useRef();
  function modalMoveOut() {
    modalRef.current.style =
      "animation:modalMoveOut 0.2s ease-in-out forwards;transform-origin:  bottom left ;";
    modalContainerRef.current.style = "opacity:0;";
  }

 // modalContainerRef//
  onClick={() => {
        modalMoveOut();
        setTimeout(() => {
          changeContent();
        }, 200);
      }}
```

### 👉👉PWA

<img width="100%" src="https://firebasestorage.googleapis.com/v0/b/yanyangirl-lifezone.appspot.com/o/readme%2Frwd.jpg?alt=media&token=8d90ec2b-e980-4f97-9b5f-17a296110ea3">

👉 Use **service workers**, **manifests**, and other features in combination with progressive enhancement to give users an experience on par with native apps.

#### 🔶Install PWA

- Laptop/Desktop

  1. After open Chrome, go to a website you want to install.
  2. At the top right of the address bar, click Install .
  3. Follow the onscreen instructions to install the PWA.

- Android

  <img width="100%" src="./asset/android.png">

* IOS

  <img width="100%" src="./asset/iphone12.png">

### 👉👉 SEO and Accessibility friendly

<img width="100%" src="https://firebasestorage.googleapis.com/v0/b/yanyangirl-lifezone.appspot.com/o/readme%2Flighthouse.jpg?alt=media&token=416a2799-3c09-4424-890b-a7687db4e733">

- UX tools

  - Color Blind+ (Figma Plugin)
    - View my designs in the 8 different types of color vision deficiencies.

  * A11y - Color Contrast Checker (Figma Plugin)
    - Check the color contrast ratio of all visible text in a frame.
  * Google Lighthouse (Chrome DevTools)

    - Custom controls have ARIA roles and ARIA labels.

    - Button, link, and menuitem elements have accessible names.

  - [SEO Audits](https://developer.chrome.com/docs/lighthouse/seo/ "游標顯示") / [Accessibility Audits](https://developer.chrome.com/docs/lighthouse/accessibility/ "游標顯示")
