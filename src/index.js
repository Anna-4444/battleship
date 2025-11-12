import "./styles.css";
import { renderLandingPage } from "./user-interface/render-landing-page.js";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faArrowsUpDown, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons"
library.add(faArrowsLeftRight, faArrowsUpDown)
dom.watch()


renderLandingPage();