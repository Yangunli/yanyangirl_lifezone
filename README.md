# ✨✨YANYANGIRL LIFEZONE ✨✨

  <img width="70%" src="https://firebasestorage.googleapis.com/v0/b/yanyangirl-lifezone.appspot.com/o/readme%2FHOME.jpg?alt=media&token=e2d0873d-003f-4cb3-b773-6c1507e56566" >

```
This lovely website is about exhibitions (fine art / scuplture / illustraction / craft).
Provide some information about current or upcoming exhibitions, and some exhibition record.

```

## ✨Built with✨

- webpack5
- React
- Firebase
- Scss

## ✨Feature✨

### Modal Component & Menu Component do not rely on 3rd party liberary.

![圖片](https://firebasestorage.googleapis.com/v0/b/yanyangirl-lifezone.appspot.com/o/readme%2FModal.gif?alt=media&token=5d77f368-e6c6-4fe8-8ca7-c795ae74e466)

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

<img width="70%" src="https://firebasestorage.googleapis.com/v0/b/yanyangirl-lifezone.appspot.com/o/readme%2Frwd.jpg?alt=media&token=8d90ec2b-e980-4f97-9b5f-17a296110ea3">

```
 Responsively designed / Installable / Network independent / Secure / Progressively enhanced

```

#### 🔶Install PWA

- Laptop/Desktop

  1.  On your computer, open Chrome.
  2.  Go to a website you want to install.
  3.  At the top right of the address bar, click Install .
  4.  Follow the onscreen instructions to install the PWA.

- Android
  1. On your Android device, open Chrome Chrome.
  2. Go to a website with a PWA that you want to install.
  3. Tap Install.
  4. Follow the on-screen instructions.

* IOS

  1. On your IOS device, open Safari.
  2. Press the "Share" button and select "Add to Home Screen" from the drawer.

### 👉👉 SEO and Accessibility friendly

<img width="70%" src="https://firebasestorage.googleapis.com/v0/b/yanyangirl-lifezone.appspot.com/o/readme%2Flighthouse.jpg?alt=media&token=416a2799-3c09-4424-890b-a7687db4e733">

- UX tools
  - Color Blind (Figma Plugin): View my designs in the 8 different types of color vision deficiencies.
  * A11y - Color Contrast Checker (Figma Plugin): Check the color contrast ratio of all visible text in a frame.

* Google Lighthouse

  - Run Lighthouse in Chrome DevTools, Lighthouse gives a report on the page. It provides Optimization Score & recommendations.

  - Custom controls have ARIA roles and ARIA labels.

  * Button, link, and menuitem elements have accessible names.

  - [SEO Audits](https://developer.chrome.com/docs/lighthouse/seo/ "游標顯示") / [Accessibility Audits](https://developer.chrome.com/docs/lighthouse/accessibility/ "游標顯示")
