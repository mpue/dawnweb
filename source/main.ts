

import * as $ from "jquery";
import { Dawn } from "./ImageScroller";


$(document).ready(() => {
    let scroller = new Dawn.ImageScroller();
    scroller.addImage("img/dawn_p1.jpg");
    scroller.addImage("img/dawn_p2.jpg");
    scroller.animate();
});


