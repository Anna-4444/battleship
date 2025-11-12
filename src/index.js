import "./styles.css";
import { renderLandingPage } from "./user-interface/render-landing-page.js";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faArrowsUpDown, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons"
library.add(faArrowsLeftRight, faArrowsUpDown)
dom.watch()


renderLandingPage();

// Photo by Misael Consuelos: https://www.pexels.com/photo/warship-in-a-dock-at-sunset-8158676/
// water splash sound effect by universfield from Pixabay
// explostion Sound Effect by DRAGON-STUDIO from Pixabay